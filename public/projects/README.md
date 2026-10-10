# Captures des projets

Déposer les captures réelles dans un sous-dossier par projet, nommé comme le `slug` de `data/projects.ts` :

```
public/projects/<slug>/hero.webp       # image principale
public/projects/<slug>/screen-1.webp   # galerie (1re image affichée en grand)
public/projects/<slug>/screen-2.webp
...                                    # jusqu'à screen-8.webp, sans trou
```

Slugs actuels : `jse-express`, `devroad`, `koro-services`, `rubigo`, `locamatch`, `serverpatterns`.

Le build détecte les fichiers automatiquement et remplace les placeholders, sans modification de code.
Format conseillé : `.webp`, 16:10, 1600 px de large maximum, moins de 200 Ko.

Les anciens fichiers `devroad.webp` et `jse-express.webp` à la racine de ce dossier servent de visuel de repli tant que les captures réelles ne sont pas ajoutées.
