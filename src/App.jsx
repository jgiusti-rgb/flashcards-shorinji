import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";

// Parse CSV avec séparateur ; et guillemets RFC 4180
const parseCSV = (text) => {
  const lines = text.trim().split("\n").filter(l => l.trim());
  const cards = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Extraire les cellules en gérant les guillemets
    const cells = [];
    let current = "";
    let inQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '"') {
        if (inQuotes && line[c + 1] === '"') { current += '"'; c++; }
        else inQuotes = !inQuotes;
      } else if (ch === ";" && !inQuotes) {
        cells.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    cells.push(current.trim());

    if (cells.length < 2) continue;
    const front = cells[0];
    const back = cells[1];
    if (!front || !back) continue;

    // Ignorer la ligne d'en-tête
    if (i === 0 && front.toLowerCase().includes("nom") && back.toLowerCase().includes("technique")) continue;

    cards.push({ front, back });
  }
  return cards;
};

export default function FlashcardApp() {
  const [mode, setMode] = useState("create");
  const [csvText, setCsvText] = useState("");
  const [csvError, setCsvError] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      .flip-card { transition: transform 0.6s; transform-style: preserve-3d; }
      .flip-card.flipped { transform: rotateY(180deg); }
      .face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      .face-back { transform: rotateY(180deg); }
      .fade { transition: opacity 0.15s, transform 0.15s; }
      .fade.out { opacity: 0; transform: scale(0.96); }
    `;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const tryRead = (encoding) => new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = (ev) => resolve(ev.target.result);
      r.onerror = reject;
      r.readAsText(file, encoding);
    });

    // Essaie UTF-8, bascule sur Windows-1252 si les accents sont corrompus
    tryRead("UTF-8").then(text => {
      const hasGarbled = /[àâäéèêëîïôùûüç]/i.test(text) === false && /[Ã©Ã¨Ã]/i.test(text);
      if (hasGarbled) return tryRead("windows-1252");
      return text;
    }).then(text => { setCsvText(text); setCsvError(""); })
      .catch(() => setCsvError("Impossible de lire le fichier."));
  };

  const launch = () => {
    const cards = parseCSV(csvText);
    if (cards.length === 0) {
      setCsvError("Aucune carte trouvée. Vérifiez le format : « Nom de la technique;Technique ».");
      return;
    }
    setCsvError("");
    setFlashcards(cards);
    setCurrentIndex(0);
    setFlipped(false);
    setMode("study");
  };

  const shuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const go = (dir) => {
    if (animating) return;
    const next = currentIndex + dir;
    if (next < 0 || next >= flashcards.length) return;
    setAnimating(true);
    setTimeout(() => {
      setFlipped(false);
      setCurrentIndex(next);
      setTimeout(() => setAnimating(false), 50);
    }, 150);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (mode !== "study") return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); setFlipped(f => !f); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, currentIndex, flashcards.length, animating]);

  const reset = () => { setMode("create"); setCsvText(""); setCsvError(""); setFlashcards([]); };

  // ── CREATE ───────────────────────────────────────────────────────────────
  if (mode === "create") return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#6A9BCC" }}>
      <div className="w-full max-w-lg p-8">
        <h1 className="text-white text-4xl font-bold text-center mb-2">Flashcards</h1>
        <p className="text-white/70 text-center mb-8">Shorinji Kempo · 3e Dan</p>

        <div className="bg-white rounded-3xl p-6 shadow-lg flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            Format : <code className="bg-gray-100 px-1 rounded">Nom de la technique;Technique</code><br/>
            La première ligne (en-tête) est ignorée automatiquement.
          </p>

          <button onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 justify-center border-2 border-dashed border-gray-300 rounded-xl py-4 text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
            <Upload size={18} /> Importer un fichier .csv
          </button>
          <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFileUpload} />

          {csvText ? (
            <p className="text-sm text-green-600 font-medium text-center">
              ✓ {parseCSV(csvText).length} technique(s) chargée(s)
            </p>
          ) : (
            <>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <div className="flex-1 h-px bg-gray-200" /> ou collez le CSV <div className="flex-1 h-px bg-gray-200" />
              </div>
              <textarea value={csvText} onChange={e => { setCsvText(e.target.value); setCsvError(""); }}
                placeholder={"Nom de la technique;Technique\nUde juji gatame;A : HC D : HC..."}
                className="w-full h-36 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none font-mono border border-gray-200 rounded-xl p-3" />
            </>
          )}

          {csvText && (
            <button onClick={() => { setCsvText(""); setCsvError(""); fileRef.current.value = ""; }}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors text-center">
              ✕ Effacer et recommencer
            </button>
          )}

          {csvError && <p className="text-red-500 text-sm">{csvError}</p>}
        </div>

        <button onClick={launch} disabled={!csvText.trim()}
          className="w-full mt-6 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors text-lg disabled:opacity-40">
          Lancer les flashcards
        </button>
      </div>
    </div>
  );

  // ── STUDY ────────────────────────────────────────────────────────────────
  const card = flashcards[currentIndex];
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#6A9BCC" }}>
      <div className="w-full max-w-2xl px-8">

        <div className={`fade ${animating ? "out" : ""}`} style={{ perspective: "1200px" }}>
          <div className={`flip-card relative w-full cursor-pointer ${flipped ? "flipped" : ""}`}
            style={{ height: "420px" }} onClick={() => setFlipped(f => !f)}>

            {/* Recto — Nom de la technique */}
            <div className="face absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Nom de la technique</p>
              <h2 className="text-2xl font-semibold text-gray-800 text-center leading-snug">{card.front}</h2>
              <p className="text-gray-400 text-sm mt-auto">Clic ou ↑↓ pour retourner</p>
            </div>

            {/* Verso — Description */}
            <div className="face face-back absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 overflow-y-auto">
              <p className="text-xs uppercase tracking-widest text-blue-400 mb-4">Technique</p>
              <p className="text-base text-gray-700 leading-relaxed text-center whitespace-pre-line">{card.back}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8 gap-6">
          <button onClick={() => go(-1)} disabled={currentIndex === 0}
            className={`p-3 rounded-full transition-all ${currentIndex === 0 ? "bg-white/20 text-white/40 cursor-not-allowed" : "bg-white/20 text-white hover:bg-white/30"}`}>
            <ChevronLeft size={24} />
          </button>
          <span className="text-white text-lg font-medium">{currentIndex + 1} / {flashcards.length}</span>
          <button onClick={() => go(1)} disabled={currentIndex === flashcards.length - 1}
            className={`p-3 rounded-full transition-all ${currentIndex === flashcards.length - 1 ? "bg-white/20 text-white/40 cursor-not-allowed" : "bg-white/20 text-white hover:bg-white/30"}`}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <button onClick={shuffle} className="text-white/70 hover:text-white transition-colors hover:underline underline-offset-2 text-sm">
            🔀 Mélanger
          </button>
          <button onClick={reset} className="text-white/70 hover:text-white transition-colors hover:underline underline-offset-2 text-sm">
            ← Charger un autre CSV
          </button>
        </div>
      </div>
    </div>
  );
}
