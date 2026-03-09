import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DATA = [
  { front: "Ude juji gatame tate gassho gatame", back: "A : HC D : HC - Attaque : Technique shikake Défense : Saisir main droite croisée + déplacement arrière de K ; ude juji (lever coude, baisser en tournant poignet) ; balayage ; tate gassho gatame : saisir la main, bloquer le bras entre les genoux, tirer le poignet + appuyer en tournant sur la main ; kakato geri" },
  { front: "Ryote yori nuki", back: "A : HC D : MC - Attaque : Saisie extérieur des 2 poignets Défense : Yori nuki main gyaku + déplacement vers l'intérieur en changeant de garde to shoken ; yori nuki autre main" },
  { front: "Maki nuki (Ryote)", back: "A : HC D : MC - Attaque : Saisie dessus des 2 poignets Défense : Maki nuki sur main gyaku + déplacement vers l'intérieur en changeant de garde to shoken ; maki nuki ou yori nuki sur l'autre main" },
  { front: "Uchi uke geri (omote/ura)", back: "A : HC D : MC - Attaque : Jodan gyaku tsuki Défense : Esquive jambe avant (poids jambe arrière) + uchi uke + sokuto geri chudan (p120)" },
  { front: "Juji nuki (katate)", back: "A : HC D : MC - Attaque : Saisie même côté du poignet, poing en haut Défense : Descendre le poignet + passer le coude par-dessus le bras + se dégager en faisant levier avec le coude (p202)" },
  { front: "Juji gote (katate)", back: "A : HC D : MC - Attaque : Saisie même côté du poignet, poing en haut Défense : Descendre le poignet + saisir la main de K + passer le coude par-dessus le bras + immobilisation en position maki (p204). Ryote : idem katate" },
  { front: "Ni dan nuki", back: "A : HC D : MC - Attaque : Saisie même côté extérieur poignet — K pousse vers l'intérieur quand U commence yori nuki Défense : Commencer yori nuki ; quand K pousse : main paume vers le haut ? se dégager en amenant la main paume vers le bas (p228)" },
  { front: "Soto oshi uke tsuki / Uchi oshi uke tsuki", back: "A : HC D : HC - Attaque : Gyaku furi tsuki jodan Défense : Sashi kae ashi + hidari soto oshi uke + migi chudan tsuki (même principe que uwa uke tsuki mais attaque furi tsuki)" },
  { front: "Tsuki nuki (ryote)", back: "A : HC D : HC - Attaque : Adaptation tsuki nuki Défense : Ryote : dégagement 2 tsuki nuki. Morote : idem katate" },
  { front: "Tsuki ten ichi", back: "A : HC D : MC - Attaque : Jo chu ni ren tsuki Défense : Jun uwa uke + gyaku shita uke to uchi uke + jun geri (p144)" },
  { front: "Hiji nuki mae tenbim", back: "A : HC D : HC - Attaque : Adaptation de yori nuki : K pousse le bras Défense : Bloquer la main de K + dégager en jouant sur le pouce + bloquer sur ude juji + taisabaki pour amener au sol (p200)" },
  { front: "Gyaku gote ura gaeshi nage / ura gatame", back: "A : HC D : HC - Attaque : Saisie croisée intérieur du poignet Défense : Idem gyaku gote mais avec chute (nage) ou ura gatame" },
  { front: "Juji uke geri", back: "A : HC D : HC - Attaque : Jun mawashi geri chudan Défense : Esquive jambe avant (poids jambe arrière) + juji uke + mawashi ou mae geri presque simultané (p132)" },
  { front: "Gassho nuki", back: "A : HC D : GC - Attaque : Saisie des deux mains pendant gassho gamae Défense : Poids jambe arrière + dégagement en contournant le pouce, paume vers le bas (adaptation de kiri nuki)" },
  { front: "Sankaku nuki", back: "A : HC D : MC - Attaque : Saisie à 2 mains droite puis gauche + pousser comme si on voulait passer derrière Défense : Kagite en accompagnant le mouvement en jun sagari + dégagement en tournant vers le bas" },
  { front: "Ryote juji nuki", back: "A : HC D : MC - Attaque : Saisie même côté du poignet, poing en haut Défense : Descendre le poignet + passer le coude par-dessus le bras + se dégager en faisant levier avec le coude" },
  { front: "Ryote juji gote", back: "A : HC D : HC - Attaque : Saisie des deux poignets, poing en haut Défense : Idem katate — on ne se soucie pas de la 2e saisie" },
  { front: "Kusshin tsuki / geri", back: "A : HC D : HC - Attaque : Gyaku furi tsuki jodan Défense : Kusshin tsuki : mae chidori ashi + kusshin + hidari uchi age uke + migi tsuki sans se relever. Kusshin geri : idem avec geri (p126). Ne pas confondre avec uchi age tsuki/geri" },
  { front: "Kiri kaeshi nuki (katate/morote)", back: "A : HC D : MGe - Attaque : Saisie croisée dessus du poignet Défense : Amener le bras de K en position maki + retenir au niveau du coude + dégagement en coupant autour du poignet (p208). Morote : idem katate" },
  { front: "Kiri gote (katate/morote)", back: "A : HC D : MGe - Attaque : Saisie croisée dessus du poignet Défense : Amener le bras de K en position maki + bloquer la main de K + immobiliser en position maki (p210). Morote : idem katate" },
  { front: "Yoko tenshin geri", back: "A : HC D : MC - Attaque : Gyaku mae geri Défense : Déplacement latéral, poids jambe avant + harai uke uchi (petit) + gyaku geri (p136)" },
  { front: "Han tenshin geri", back: "A : HC D : HC - Attaque : Gyaku mae geri Défense : Quart de tour, poids jambe droite + uchi uke otoshi poing fermé + jun geri (p138)" },
  { front: "Johaku nuki (katate/ryote)", back: "A : HC D : MC - Attaque : Saisie du bras au niveau du biceps, bras tendu Défense : Katate : dégagement en enroulant le bras de l'extérieur vers l'intérieur (p216). Ryote : dégagement katate johaku nuki 2 fois" },
  { front: "Johaku dori (katate/ryote)", back: "A : HC D : MC - Attaque : Saisie du bras au niveau du biceps, bras tendu Défense : Bloquer la main + amener au sol en position dori (p220)" },
  { front: "Soto oshi uke geri", back: "A : HC D : HC - Attaque : Gyaku furi tsuki jodan Défense : Sashi kae ashi + hidari soto oshi uke + migi chudan geri (même principe que uwa uke tsuki mais furi tsuki)" },
  { front: "Uchi oshi uke geri", back: "A : HC D : HC - Attaque : Gyaku jodan furi tsuki Défense : Soto uchi uke + geri (p124)" },
  { front: "Uchi uke tsuki (omote)", back: "A : MC D : HC - Attaque : Jodan gyaku tsuki Défense : Uchi uke migi + tsuki (p125)" },
  { front: "Kon ten ichi", back: "A : HC D : MC - Attaque : Jodan furi tsuki puis chudan gyaku tsuki Défense : Migi soto uchi uke + hidari shita uke + geri" },
  { front: "Oshi kiri nuki", back: "A : HC D : MC - Attaque : Saisie des 2 bras au niveau du biceps, bras pliés Défense : Dégagement du bras en jun de l'intérieur vers l'extérieur (oshi kiri nuki) + katate johaku nuki sur l'autre bras (p218)" },
  { front: "Okuri dori", back: "A : HC D : HC - Attaque : Technique shikake Défense : Saisie main droite – main droite + passer derrière + finir comme tsuri age dori (p198)" },
  { front: "Ryote okuri gote", back: "A : HC D : MC - Attaque : Saisie dessus des deux poignets Défense : Dégager la main gyaku par maki nuki + puis okuri gote" },
  { front: "Ryote okuri gote okuri yoko tenbim", back: "A : HC D : HC - Attaque : Attaque ryote sur le dessus des poignets Défense : Faire okuri gote + amener au sol en appuyant sur ude juji (yoko tenbim)" },
  { front: "Ryaku juji gote", back: "A : HC D : MC - Attaque : Saisie même côté du poignet, poing en haut — K pousse quand on commence juji gote Défense : Descendre le poignet + passer le coude par-dessus le bras + saisir la main de K par dessous + immobilisation en position maki (p206)" },
  { front: "Maki juji gote", back: "A : MC D : MC - Attaque : Variante sur juji gote — K se retourne Défense : Applique maki tenbim" },
  { front: "Morote tsuki nuki", back: "A : HC D : HC - Attaque : Saisie des mains de U et pousser Défense : Adaptation de tsuki nuki. Ryote : dégagement 2 tsuki nuki. Morote : idem katate" },
  { front: "Katate oshi nuki", back: "A : HC D : MC - Attaque : Saisie même côté dessous du poignet Défense : Dégagement en tournant autour du pouce vers l'extérieur (p232)" },
  { front: "Kata muna otoshi", back: "A : HC D : HC - Attaque : Saisie du dogi en haut, poing vertical Défense : Casser le poignet par mouvement de hanche + passer le coude à l'intérieur + plier le bras de K (position maki) + tai sabaki vers l'intérieur + amener au sol en jouant sur le poignet de K (p266)" },
  { front: "Eri juji", back: "A : HC D : HC - Attaque : Saisie du dogi en haut, poing horizontal, paume vers le bas et pousser Défense : Jun sagari + casser le poignet en le frappant de bas en haut + terminer par katamuna otoshi (p268)" },
  { front: "Tsubami gaeshi", back: "A : HC D : MT - Attaque : Gyaku jodan tsuki Défense : Migi uchi uke (hanche gauche devant) + migi shuto + hidari gyaku tsuki (p154)" },
  { front: "Chidori gaeshi", back: "A : HC D : HT - Attaque : Gyaku jodan choko tsuki Défense : Attaque poids jambe arrière + crocheter la main de K + « rebondir » pour me uchi + migi sokuto (p152)" },
  { front: "Sode nuki", back: "A : HC D : MC - Attaque : Saisie de la manche sur le côté au niveau du biceps Défense : Passer le coude à l'intérieur + se dégager en poussant vers l'extérieur (p222)" },
  { front: "Sode dori", back: "A : HC D : MC - Attaque : Saisie de la manche sur le côté au niveau du biceps Défense : Bloquer la main + 1er déséquilibre (tap intérieur coude) + tai sabaki + 2e déséquilibre (3e pied) + immobilisation dori. Gonfler le biceps pour augmenter la torsion (p226)" },
  { front: "Hiki otoshi", back: "A : HC D : HC - Attaque : Adaptation johaku dori ou sode dori : K tend le bras (pousse) Défense : Changer de garde + faire la technique. Le coude doit être vers le haut. Passer l'épaule gauche devant + hanche droite devant" },
  { front: "Harai uke geri", back: "A : HC D : MC - Attaque : Yose ashi + jun mawashi geri chudan Défense : Migi juji ashi zen kutsu + harai uke + gyaku geri en pivotant sur la jambe d'appui" },
  { front: "Sode maki", back: "A : HC D : MC - Attaque : Saisie de la manche sur le côté au niveau du biceps Défense : Même principe que sode dori mais immobilisation position maki (p224)" },
  { front: "Sode maki tenbim", back: "A : HC D : MC - Attaque : Saisie manche biceps — K se retourne quand on commence sode maki Défense : Commencer sode maki + quand K se retourne : amener au sol en appuyant sur le point au niveau du coude" },
  { front: "Tsuki ten ni", back: "A : MC D : HC - Attaque : Jo jo ni ren tsuki Défense : Migi soto uchi age uke + migi uchi uke otoshi + geri. Bien marquer le uchi uke otoshi pour accentuer le déséquilibre de K" },
  { front: "Furi ten ni", back: "A : HC D : MC - Attaque : Jo chu ni ren furi tsuki Défense : Jun sagari migi oshi uke + migi uchi uke + jun geri (simultané)" },
  { front: "Eri nuki", back: "A : HC D : HC - Attaque : Saisie du dogi au niveau de la ceinture Défense : Se dégager en enroulant le bras de l'extérieur vers l'intérieur" },
  { front: "Ude maki", back: "A : HC D : HC - Attaque : Saisie du dogi au niveau de la ceinture Défense : Commencer en enroulant le bras de l'extérieur vers l'intérieur + quand il est en haut saisir la main + amener au sol en position maki" },
  { front: "Morote juji nuki", back: "A : HC D : MC - Attaque : Saisie à 2 mains du poignet, poing en haut Défense : Idem katate juji nuki" },
  { front: "Morote juji gote", back: "A : HC D : MC - Attaque : Saisie à 2 mains du poignet, poing en haut Défense : Idem katate juji gote" },
  { front: "Tsuki ten san", back: "A : HC D : MC - Attaque : Jo chu ni ren tsuki (...) jodan tsuki Défense : Jun sagari migi uwa uke + hidari uchi uke + migi uwa uke + jun geri (simultané) (p148)" },
  { front: "Geri ten san", back: "A : HC D : MC - Attaque : Jo chu ni ren tsuki (...) gyaku mawashi geri Défense : Jun sagari migi uwa uke + hidari uchi uke + juji uke + jun geri (simultané) (p146)" },
  { front: "Morote hiki nuki", back: "A : HC D : MC - Attaque : Saisie à deux mains poing vers le haut Défense : Dégager en contournant les pouces" },
  { front: "Maki gote (katate/morote)", back: "A : HC D : MC - Attaque : Saisie croisée intérieur poignet, poing vers le haut Défense : Amener la main paume vers soi + dégagement par nidan nuki en gardant le contact + tai sabaki intérieur + amener au sol en appuyant (p236)" },
  { front: "Gedan gaeshi", back: "A : HI D : HI - Attaque : Jun mawashi geri Défense : Un pas en avant + migi gaeshi geri. Accentuer l'esquive par la rotation des hanches (p140)" },
  { front: "Gyaku tenshin geri", back: "A : HC D : HC - Attaque : Sashi kae ashi + chudan tsuki Défense : Hiraki ashi sagari légèrement sur le côté + migi shita uke + hidari geri" },
  { front: "Gyaku tenbim", back: "A : HC D : HC - Attaque : Shikake Défense : Saisie main droite sur main droite + déséquilibre + amener au sol en jouant sur le point sensible au-dessus du coude" },
  { front: "Morote oshi nuki", back: "A : HC D : MC - Attaque : Saisie oshi nuki, main droite dessus, bras tendus Défense : Coller en entrant vers l'intérieur + dégagement oshi nuki" },
  { front: "Kinteki geri hiza uke name gaeshi", back: "A : MC D : MC - Attaque : Yose ashi + jun kinteki geri Défense : Migi hiza uke (ramener directement le pied au niveau du genou) + enchainer avec kinteki geri (p170)" },
  { front: "Gyaku geri hiza uke name gaeshi", back: "A : HC D : MC - Attaque : Gyaku kinteki geri Défense : Migi hiza uke (ramener directement le pied au niveau du genou) + enchainer avec kinteki geri" },
  { front: "Oshi gote (katate/ryote)", back: "A : HC D : MC - Attaque : Saisie même côté extérieur poignet Défense : Amener la main paume vers soi + dégagement par nidan nuki en gardant le contact + tai sabaki intérieur (ou extérieur) + amener au sol en appuyant (p230)" },
  { front: "Kote maki gaeshi", back: "A : HC D : MC - Attaque : Saisie même côté dessous du poignet Défense : Saisir la main de K + appuyer vers le bas avec le bord des kentos sur le point sensible du poignet + mouvement de hanche vers l'intérieur + se dégager + saisir la main côté opposé au pouce + tai sabaki extérieur + amener au sol en appuyant (p234)" },
  { front: "Morote wa nuki", back: "A : HC D : HC - Attaque : Ippon se nage Défense : Aller sur l'extérieur + dégagement nidan nuki" },
  { front: "Morote maki nuki", back: "A : HC D : HC - Attaque : Ippon se nage Défense : Suivre le mouvement + faire maki nuki" },
  { front: "Kaishin tsuki", back: "A : HC D : HM - Attaque : Jodan gyaku tsuki (kaishin = mouvement d'esquive) Défense : Soto uchi uke + saisie + déséquilibre + jodan jun tsuki. Possible intérieur ou extérieur (p128)" },
  { front: "Hangetsu geri", back: "A : HC D : HM - Attaque : Jodan gyaku tsuki (kaishin) Défense : Soto uchi uke + crocheter et maintenir vers le bas + geri. Possible intérieur ou extérieur (p131)" },
  { front: "Gyakute nage", back: "A : MC D : MC - Attaque : Adaptation de gyaku gote : K est souple Défense : Venir bloquer la main de K avec l'autre main en passant sous le coude + projeter" },
  { front: "Ryu nage", back: "A : MC D : MC - Attaque : Adaptation de gyaku gote : K est très souple Défense : Passer derrière K + bloquer le coude + amener au sol sur le côté (pas sur le dos). Au sol : bloquer la tête avec jambe gauche, genou droit contre le coude de K" },
  { front: "Soto maki tenbim", back: "A : MC D : MC - Attaque : Adaptation de gyaku gote : K tend le bras Défense : Hanche comme point d'appui sur l'avant-bras de K + pousser légèrement vers l'extérieur puis vers l'avant. Aider en faisant une torsion du poignet de K" },
  { front: "Uchi nuki (katate, ryote)", back: "A : MI D : MI - Attaque : Saisie yori nuki Défense : Poids jambe arrière + se dégager en frappant l'intérieur du poignet de K" },
  { front: "Shita uke geri kote nage", back: "A : HC D : HH - Attaque : Adaptation shita uke geri Défense : Shita uke + saisie du poignet + geri + poser devant + taisabaki + projeter au sol (bras de K en position gyaku gote). Aider en faisant une torsion du poignet de K (p238)" },
  { front: "Tai ten ichi", back: "A : HC D : HC - Attaque : Jodan tsuki + gyaku chudan tsuki Défense : Migi uwa uke + hidari uchi uke to mae geri (p150)" },
  { front: "Gyaku ten ichi", back: "A : HC D : MC - Attaque : Gyaku jodan tsuki + jun chudan tsuki Défense : Hidari uchi uke geri + migi uchi harai uke (p151)" },
  { front: "Hiki tenbim", back: "A : MC D : MC - Attaque : Shikake Défense : Saisie croisée intérieur du poignet + déplacement extérieur + attaquer le point ude juji (bras perpendiculaire au sol) + pousser vers l'épaule + amener au sol" },
  { front: "Gyaku hiki tenbim", back: "A : MC D : MC - Attaque : Saisie croisée comme gyaku gote Défense : Faire hiki tembim" },
  { front: "Kiri kaeshi tenbim", back: "A : MC D : MGe - Attaque : Adaptation kiri gote : K tend le bras Défense : Utiliser okuri gote + immobilisation tenbim" },
  { front: "Kiri kaeshi maki tenbim", back: "A : MC D : MGe - Attaque : Adaptation de kiri gote : K se retourne Défense : Utiliser okuri gote + immobilisation maki tembin" },
  { front: "Uwa uke nage", back: "A : HC D : HC - Attaque : Gyaku ura ken uchi (sans faire de pas) Défense : Uwa uke + saisir la main de K avec les 2 mains + amener au sol dans le même mouvement (p250)" },
  { front: "Uwa uke gyakute nage", back: "A : HC D : HC - Attaque : Gyaku ura ken uchi (sans faire de pas) Défense : Uwa uke + chudan tsuki + saisie de la main de K + tirer légèrement au niveau du coude + taisabaki + torsion du poignet de K + amener au sol" },
  { front: "Morote gyaku gote", back: "A : HC D : HC - Attaque : Gyaku gote à 2 mains Défense : Passer la main comme sur morote uwa nuki + finir par gyaku gote. Immobilisation : tate ichiji gatame, sekoshi ichiji gatame, kumo garami" },
  { front: "Morote okuri gote", back: "A : HC D : HC - Attaque : Variante sur okuri gote Défense : Immobilisation : baku ho, tsuriage ura gatame, ura hiza gatame" },
  { front: "Gyaku tenbim dori (2 types)", back: "A : MC D : MC - Attaque : Shikake ou saisie croisée intérieur poignet Défense : Saisie croisée + amener au sol en appuyant sur le point ude juji en montant le coude vers le haut. Possibilité de prendre le muscle" },
  { front: "Okuri ichi zeme", back: "A : HC D : MC - Attaque : Variante okuri gote : K plie le bras, coude vers le haut Défense : Coller la main de K sur le plexus + plier le coude + 'tirer' sur le côté (1er déséquilibre) + amener au sol vers l'avant. Tenir la main de K avec les 2 derniers doigts (p196)" },
  { front: "Tsuri otoshi", back: "A : HC D : MC - Attaque : Variante maki nuki : K se retourne pour frapper ura ken Défense : Bloquer ura ken + saisir l'épaule + remonter l'autre main le long du dos sans la coller + projeter" },
  { front: "Tsuriage dori", back: "A : MC D : MC - Attaque : Shikake Défense : Saisie main droite–main droite + coup sur le bras pour forcer K à se tourner + passer derrière + attraper l'épaule gauche + déséquilibrer vers l'avant en levant la main saisie + projeter" },
  { front: "Hiki muna otoshi", back: "A : MC D : MC - Attaque : Adaptation katamuna otoshi : K plie le bras en tirant Défense : Suivre le mouvement + rentrer dans la garde de K + katamuna otoshi direct" },
  { front: "Ryu muna otoshi", back: "A : MC D : MC - Attaque : Katamuna otoshi à 2 mains + K donne un coup de tête et de genou Défense : Bloquer le coup de tête par shuto + le coup de genou par shita uke + katamuna otoshi" },
  { front: "Jun geri chi ichi", back: "A : MI D : MI - Attaque : Hebi tsuki + jun kinteki geri Défense : Migi uwa uke + hidari ken uke to isa uke (main droite position uchi uke) + kinteki geri. Position neko ashi dashi (p162)" },
  { front: "Gyaku geri chi ichi", back: "A : HI D : MI - Attaque : Hebi tsuki + gyaku kinteki geri Défense : Migi uwa uke + migi ken uke to isa uke (main gauche position uchi uke) + kinteki geri. Position neko ashi dashi" },
  { front: "Maki otoshi", back: "A : MI D : MI - Attaque : Saisie du col paume vers le haut en tirant Défense : Bloquer la main + otoshi coude vers le haut. Main droite bloque le poing + main gauche pousse légèrement en mouvement circulaire du bas vers le haut pour accentuer le déséquilibre (p270)" },
  { front: "Soto maki otoshi", back: "A : MI D : MI - Attaque : Saisie du col paume vers le haut en poussant, bras tendu Défense : Déplacement vers l'extérieur + taisabaki + faire chuter en projetant avec la hanche au niveau de l'avant-bras. Saisie : main gauche comme yubi gatame, main droite pouce contre pouce. Torsion du poignet de K. Ne pas rentrer à l'intérieur de l'attaque" },
  { front: "Mawashi geri sanpo uke nami gaeshi", back: "A : MC D : MC - Attaque : Yose ashi + jun mawashi geri jodan Défense : Sanpo uke + jun mawashi jodan (p171)" },
  { front: "Dan geri sanpo uke dan geri gaeshi", back: "A : HC D : HC - Attaque : Dan mawashi geri Défense : Sanpo uke + dan mawashi geri (1er = kinteki geri) (p174)" },
  { front: "Sokuto geri hiki ashi nami gaeshi", back: "A : MC D : MC - Attaque : Un pas en avant + gedan sokuto geri Défense : Un pas en avant + hiza uke to shita uke + chudan sokuto geri (yoko san mai) (p172)" },
  { front: "Nuki uchi oshi gote", back: "A : HC D : MC - Attaque : Variante de oshi gote : K tend le bras Défense : Shuto sur le poignet de K pour faire plier K + reprendre oshi gote" },
  { front: "Harai uke dan tsuki", back: "A : HC D : MC - Attaque : Gyaku chudan mawashi geri Défense : Harai uke to migi ura ken direct (p156). Variante : avancer jambe gauche + harai uke + avancer jambe droite + ura ken" },
  { front: "Harai uke chi ni", back: "A : HC D : K - Attaque : Jun mawashi geri + jodan gyaku tsuki Défense : Jun sagari + migi harai uke + hidari uchi uke + migi chudan tsuki (p166)" },
  { front: "Jun geri chi san", back: "A : HC D : MC - Attaque : Jun sokuto + jo chu ni ren tsuki Défense : Jun sagari + migi harai uke + tsuki ten ichi (p168)" },
  { front: "Gyaku geri chi san", back: "A : HC D : MC - Attaque : Gyaku kinteki geri + migi shuto + gyaku chudan tsuki Défense : Ken uke + sortir extérieur + soto uchi uke + shita uke geri" },
  { front: "Machi geri", back: "A : MC D : MC - Attaque : Jodan tsuki Défense : Mae geri ? tai no sen (anticipation / attaque en premier)" },
  { front: "Tanto tsukikomi shita uke uchi otoshi geri", back: "A : HC D : HH - Attaque : Attaque couteau main droite gyaku chudan Défense : Hidari shita uke + migi uchi otoshi uke sur le pouce (faire lâcher le couteau) + gyaku geri. Shita uke : ne pas partir sur le côté et pousser vers l'intérieur mais léger déplacement côté et frapper l'avant-bras de K en rentrant droit sur lui" },
  { front: "Tanto furiage ryusui geri", back: "A : HC D : HC - Attaque : Attaque couteau de haut en bas Défense : Applique ryusui geri" },
  { front: "Age nuki", back: "A : MC D : S - Attaque : Saisie même côté dessus du poignet + tirer vers l'intérieur Défense : Dégagement en accompagnant l'attaque et se lever en même temps (depuis seiza)" },
  { front: "Idori okuri gote", back: "A : MC D : S - Attaque : Saisie même côté sur le dessus du poignet Défense : Okuri gote à genou : déplacement sur le côté + lever le genou droit + okuri gote (p192)" },
  { front: "Idori gyaku gote", back: "A : MC D : S - Attaque : Saisie croisée sur l'intérieur du poignet Défense : Gyaku gote à genoux : déplacement vers l'extérieur + lever le genou droit + gyaku gote. Le déséquilibre de K se fait latéralement, pas vers l'arrière (p184)" },
  { front: "Idori oshi gote", back: "A : MC D : S - Attaque : Saisie même côté sur le côté du poignet Défense : Oshi gote à genoux : déplacement vers l'extérieur + lever le genou droit + oshi gote" },
  { front: "Katate nage", back: "A : MC D : MC - Attaque : Shikake Défense : Saisie croisée main droite intérieur + tendre le bras vers l'intérieur + passer dessous pour aller de l'autre côté + faire chuter en utilisant le bras droit comme point de levier. Déséquilibre : amener l'épaule au point de chute (p252)" },
  { front: "Gyaku katate nage", back: "A : MC D : MC - Attaque : Saisie croisée intérieur du poignet Défense : Applique katate nage" },
  { front: "Okuri katate nage", back: "A : MC D : MC - Attaque : Ryote maki nuki Défense : Amener la main de Ka à la ceinture (paume vers haut, bras en hyperextension) + passer dessous + finir katate nage (p254)" },
  { front: "Mikazuki gaeshi kari ashi", back: "A : HC D : HT - Attaque : Sashi kae ashi + jodan tsuki Défense : Hidari hangetsu (absorber, poids sur jambe arrière) + migi mikazuki + (migi shuto) + migi sokuto geri gedan (p158). Ne pas confondre avec kaishin tsuki" },
  { front: "Suigetsu gaeshi oshi taoshi", back: "A : HC D : HT - Attaque : Sashi kae ashi + jodan tsuki Défense : Hidari uchi age + migi suigetsu + (migi shuto) + pousser avec une main sur le cou et l'autre sur la hanche (p160)" },
  { front: "Geri ten ichi sukui nage", back: "A : HI D : HI - Attaque : Gyaku jodan tsuki + gyaku mawashi geri Défense : Soto uke (poids jambe avant) + rotation de la hanche (poids jambe arrière) + juji uke et blocage + kinteki geri + projeter (mae ukemi)" },
  { front: "Hangetsu gaeshi sukui kubi nage", back: "A : HC D : HM - Attaque : Jo chu ni ren tsuki Défense : Hangetsu uke (crocheter) + shita uke to shuto + avancer + shuto et nage (planter la tête + attraper la cuisse) (p155)" },
  { front: "Sode maki gaeshi", back: "A : HC D : MC - Attaque : Saisie même côté de la manche dessous avant-bras Défense : Descendre position kibadashi (rester très bas) pour amener au sol (p272)" },
  { front: "Sode guchi dori", back: "A : HC D : MC - Attaque : Saisie même côté intérieur de la manche (paume vers le bas) Défense : Bloquer le poignet + tirer simultanément + rouler sur les doigts en passant le coude vers l'avant" },
  { front: "Sode guchi maki", back: "A : HC D : MC - Attaque : Saisie même côté intérieur de la manche (paume vers le haut) Défense : Attraper la main pour finir en position maki" },
  { front: "Chudan gaeshi", back: "A : MI D : HT - Attaque : Jun mawashi geri Défense : Migi shita uke to migi mawashi geri (p142)" },
  { front: "Fukko chi ni", back: "A : HC D : S - Attaque : 1) Jun mawashi geri ; 2) Gyaku tsuki Défense : Relever le genou droit en aspirant l'attaque : 1) soto uke tsuki avec déplacement genou gauche ; 2) hidari uchi uke + migi tsuki en se relevant + projection (p164)" },
  { front: "Kiri kaeshi gote", back: "A : MC D : MC - Attaque : Saisie kiri gote : K ouvre la main Défense : Saisir la main de K avec ses deux mains + amener sous l'aisselle + déséquilibre + projeter au sol en jouant sur la pression de la main et la torsion du poignet (p212)" },
  { front: "Kiri kaeshi nage", back: "A : MC D : MC - Attaque : Saisie kiri gote : K ouvre la main Défense : Saisir la main de K avec ses deux mains + tendre le bras + passer dessous + projeter (utilisation de katate nage) (p214)" },
  { front: "Morote kiri kaeshi nage", back: "A : MC D : MC - Attaque : Hama nage Défense : Suivre l'attaque + kagite main intérieur + saisir les 2 mains + pousser vers l'arrière puis vers l'avant" },
  { front: "Maki komi gote", back: "A : MC D : MC - Attaque : Hama nage Défense : Intercepter l'attaque dès le début : K avec coude gauche en bas, coude droit en haut. Position sankaku + tsuki nuki + remonter + taisabaki + projeter avec la forme gyaku gote" },
  { front: "Ryote katate nage", back: "A : MC D : MC - Attaque : Saisie ryote sur le côté des poignets Défense : Prendre une main + amener et bloquer à la ceinture (paume vers soi et vers le haut) + passer son coude sous celui de K + monter la hanche + enchainer sur katate nage" },
  { front: "Morote katate nage", back: "A : MC D : MC - Attaque : Saisie morote Défense : Utilisation de katate nage (p256)" },
  { front: "Uwa uke se nage", back: "A : HC D : HC - Attaque : Ura ken jodan Défense : Projeter en utilisant ippon se nage" },
  { front: "Kata uchi nage", back: "A : HC D : HC - Attaque : Kata guruma Défense : Au moment où K est en bas : tai sabaki + nage en poussant vers l'arrière" },
  { front: "Furitsute omote nage", back: "A : MC D : MC - Attaque : Saisie ippon se nage Défense : Laisser entrer + amener la main saisie au visage de K + pousser légèrement vers l'arrière + tai sabaki pour faire basculer K sur le côté (p244)" },
  { front: "Morote okuri gote nage", back: "A : MC D : MC - Attaque : Saisie ippon se nage Défense : Laisser entrer + amener la main saisie à l'épaule de K + pousser légèrement vers l'arrière + tai sabaki pour projeter K sur le côté" },
  { front: "Okuri tsuki taoshi", back: "A : MC D : MC - Attaque : Saisie ippon se nage Défense : Laisser entrer + amener la main saisie à la poitrine de K + bloquer avec la main gauche + lever le coude droit à la verticale + jeter au sol (p246)" },
  { front: "Koshi kujiki", back: "A : MC D : MC - Attaque : Saisie ippon se nage (K entre complètement ou est souple) Défense : Comme okuri tsuki taoshi + passer derrière K + frapper avec la paume sur le haut de la fesse au niveau du nerf sciatique du haut vers le bas pour accentuer le déséquilibre (p248)" },
  { front: "Soto uke dan tsuki", back: "A : HC D : HC - Attaque : Jodan gyaku tsuki Défense : Migi soto uke to migi chudan tsuki (p123)" },
  { front: "Uchi age dan tsuki", back: "A : HC D : HC - Attaque : Jodan gyaku tsuki Défense : Migi uchi age uke to migi chudan tsuki (en se relevant)" },
  { front: "Shita uke tsuki", back: "A : HC D : HH - Attaque : Chudan gyaku tsuki Défense : Hidari shita uke + migi jodan tsuki (p129)" },
  { front: "Shita uke dan tsuki", back: "A : HC D : HH - Attaque : Chudan gyaku tsuki Défense : Migi shita uke + migi jodan tsuki (p130)" },
  { front: "Konoha okuri", back: "A : MC D : HC - Attaque : Shikake (konoha = feuille) Défense : Saisie de la main gauche de K avec la main droite + casser le poignet avec la main gauche + déséquilibre + finir comme okuri gote en vrillant la main (p242)" },
  { front: "Okuri yubi gaeshi", back: "A : MC D : HC - Attaque : K commence konoha okuri ou konoha gaeshi Défense : Contre-attaque : saisir le pouce avec la main qui est saisie + remonter vers l'aisselle + taisabaki" },
  { front: "Konoha gaeshi", back: "A : MC D : MC - Attaque : Shikake Défense : Saisie konoha okuri + amener la main à la ceinture en passant le coude dessus + faire tourner pour faire chuter (p240)" },
  { front: "Gassho hiki tenbim", back: "A : MC D : MC - Attaque : Saisie 'bonjour' Défense : Faire hiki tembin" },
  { front: "Nigiri gaeshi", back: "A : MC D : MC - Attaque : Shikake (nigiri = à peine) Défense : Saisie croisée du dessus de la main + attraper le pouce + finir comme gyaku gote" },
  { front: "Okuri shishi dori", back: "A : HC D : MC - Attaque : Saisie okuri gote mais K ouvre la main (shishi = serpillère) Défense : Amener la main à la poitrine + attraper les doigts + déplacement sur le côté + casser le poignet en vrillant les doigts" },
  { front: "Gassho okuri dori", back: "A : HC D : MC - Attaque : Saisie okuri gote mais K se retourne Défense : Attraper l'épaule pour amener au sol + attraper les doigts + déplacement sur le côté pour venir devant lui (tête K entre les genoux de U) + immobiliser en vrillant les doigts" },
];

export default function FlashcardApp() {
  const [flashcards, setFlashcards] = useState(DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);

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

  const shuffle = () => {
    setFlashcards(f => [...f].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setFlipped(false);
  };

  const reset = () => {
    setFlashcards(DATA);
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
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); setFlipped(f => !f); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, flashcards.length, animating]);

  const card = flashcards[currentIndex];

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#6A9BCC" }}>
      <div className="w-full max-w-2xl px-8">

        <h1 className="text-white text-2xl font-bold text-center mb-2">Shorinji Kempo · 3e Dan</h1>
        <p className="text-white/60 text-center text-sm mb-8">{flashcards.length} techniques</p>

        <div className={`fade ${animating ? "out" : ""}`} style={{ perspective: "1200px" }}>
          <div className={`flip-card relative w-full cursor-pointer ${flipped ? "flipped" : ""}`}
            style={{ height: "420px" }} onClick={() => setFlipped(f => !f)}>

            <div className="face absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Nom de la technique</p>
              <h2 className="text-2xl font-semibold text-gray-800 text-center leading-snug">{card.front}</h2>
              <p className="text-gray-400 text-sm mt-auto">Clic ou ↑↓ pour retourner</p>
            </div>

            <div className="face face-back absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 overflow-y-auto">
              <p className="text-xs uppercase tracking-widest text-blue-400 mb-4">Technique</p>
              <p className="text-base text-gray-700 leading-relaxed text-center">{card.back}</p>
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
            ↺ Ordre original
          </button>
        </div>
      </div>
    </div>
  );
}
