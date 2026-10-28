# DIRECTION — Portfolio HANCODE · « L'Enregistreur »

## Graine créative (tirée le 28/10/2026)

| Axe | Tirage | Décision |
|---|---|---|
| Métaphore | son / onde / fréquence | Gardé |
| Composition | plein cadre cinéma | Gardé |
| Mouvement | profondeur / caméra qui avance | Gardé |
| Rôle 3D | scène entière navigable | Gardé, réinterprété : une seule bande de papier en WebGL que la caméra longe (pas un monde 3D lourd) |
| Navigation | piste horizontale | Gardé sur desktop ; sur mobile la bande tourne de 90° et défile verticalement en scroll natif |
| Couleur | papier et encre | Gardé |
| Typo | monospace | Gardé |

Registre : vide, premier projet. Aucun conflit.

## Idée directrice

Le site est un **enregistreur à bande de papier** (sismographe, ECG, table de mixage) : un stylet d'encre trace en continu le signal du visiteur pendant que les projets défilent, imprimés sur la bande comme des plans de film.

Pourquoi c'est juste : Smith fait du code et du son (Young SM). Un portfolio qui « enregistre » relie les deux sans le dire. Et c'est intransférable : un cabinet comptable ou une marque de mode ne pourraient pas reprendre ce dispositif.

## Geste signature : « votre lecture »

- Le stylet est piloté par la vitesse de scroll (+ position du pointeur sur desktop, inclinaison/doigt sur mobile). Chaque visiteur dessine un tracé unique sur la bande.
- Le tracé reste imprimé derrière lui pendant toute la visite.
- En fin de bande (contact), la bande se rembobine et affiche le **relevé complet de la visite**, en miniature, avec de vraies données mesurées : durée, projet où le signal a été le plus fort (là où il s'est attardé). Aucune donnée inventée, rien n'est envoyé nulle part.

## Grammaire de mouvement

- **Avance papier** : mécanique, `CustomEase "moteur"` (démarrage sec, léger dépassement, arrêt amorti). Le contenu n'apparaît jamais en fondu : il est **imprimé** au moment où il passe sous la tête d'impression.
- **Stylet** : ressort amorti (physique), jamais linéaire.
- **Caméra** (desktop WebGL) : rase la bande en légère contre-plongée ; elle se relève pour chaque projet (plan plein cadre) puis replonge.
- **Ne bougent jamais** : le bandeau de la machine (nom, timecode, horloge d'Abidjan, coordonnées), comme les inscriptions sérigraphiées d'un appareil.
- Mouvement réduit : bande statique en lecture verticale, tracé dessiné une fois, aucun déplacement de caméra.

## Système visuel

- **Palette** : papier `#F3F0EA`, encre `#0B0B0B`, encre de contrôle orange `#FF6A00` (les enregistreurs tracent en rouge : c'est la couleur de marque, utilisée uniquement pour le stylet et l'action), quadrillage millimétré à 8 % d'encre.
- **Typo** : une seule famille, **JetBrains Mono** (déjà dans la charte), de 100 à 800. Titres monumentaux en Thin 100, étiquettes en Bold 700 capitales espacées, corps en Regular. Remplace Space Grotesk + DM Sans.
- **Grille** : le quadrillage millimétré EST la grille (module 8 px, bande de 6 « pistes »). Tout s'aligne sur les pistes.
- **Images** : les captures des projets sont imprimées sur le papier (shader de trame / encre qui bave légèrement), en couleur pleine seulement quand le projet est « en lecture ». Cadrage 2,39:1 (cinémascope) avec timecode d'entrée/sortie.
- **Iconographie** : aucune icône décorative. Repères de mesure, flèches de lecture ▶ ■ ◀◀, numéros de prise.

## Architecture (la bande, de gauche à droite)

| # | Moment | Fonction | Émotion |
|---|---|---|---|
| 00 | **Mise sous tension** | Nom, rôle, horloge d'Abidjan, « REC ». La phrase « Je conçois des produits numériques utiles. » s'imprime en passant sous la tête. | Curiosité, précision |
| 01 | **Calibrage** (manifeste) | L'amplitude du signal monte ; les mots-clés (produit, design, ingénierie, interface) sont imprimés sur les pics. | Compréhension de la méthode |
| 02 | **Prises 1 à 7** (projets) | Chaque projet = un plan plein cadre : n° de prise, catégorie, statut, stack listée comme des « canaux », lien vers le code. Clic → page projet, le cadre s'agrandit (Flip) jusqu'à remplir l'écran. | Preuve, envie d'ouvrir |
| 03 | **Opérateur** (à propos) | Portrait imprimé en trame d'encre, parcours en notes de bord. | Confiance, humain |
| 04 | **Console** (stack) | Index dense façon légende de table de mixage, remplace la marquee. | Sérieux technique |
| 05 | **Fin de bande** (contact) | Rembobinage + relevé de la visite, puis e-mail / WhatsApp en grand. | Action |

Supprimés : `Marquee`, `MagneticLink`, révélations ligne par ligne (clichés interdits par le skill).
Conservés : `data/site.ts`, `data/projects.ts`, routes `/projets/[slug]`, `AbidjanClock`, assets WebP.

## Plan technique

- **Desktop capable** : `three` (vanilla, sans R3F) chargé après le premier rendu, 1 plan + 1 shader custom (papier, quadrillage, tracé, impression des images), `dpr ≤ 1.5`, rendu en pause hors écran. Tracé stocké dans une texture 1D mise à jour chaque frame.
- **Mobile / bas de gamme / saveData / sans WebGL** : version DOM + CSS 3D (perspective) + canvas 2D pour le tracé. Pas un écran dégradé : c'est la bande verticale, conçue comme une variante à part entière.
- **GSAP** (déjà installé, 3.15) : ScrollTrigger pour l'avance papier, `CustomEase`, `Flip` vers les pages projet, `matchMedia` pour desktop / mobile / mouvement réduit.
- **Budget** : aucun JS 3D dans le bundle initial ; texte et liens lisibles et indexables sans JS ; une seule famille de police en sous-ensemble latin.
- **Desktop** : la bande horizontale occupe toute la page (pas une section pinnée au milieu). Scroll natif vertical converti en avance papier, clavier (← →, Tab) et barre de défilement fonctionnels.

## Risques

- Passage du thème sombre au papier clair : changement fort d'identité visuelle du portfolio.
- Le scroll horizontal sur desktop doit rester irréprochable au clavier et au trackpad ; testé en priorité.
