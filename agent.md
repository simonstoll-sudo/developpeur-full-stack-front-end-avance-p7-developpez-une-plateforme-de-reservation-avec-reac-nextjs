# Guide pour les assistants IA — kasa-app

Ce fichier s'adresse aux assistants de programmation (Copilot, Cursor, Claude, ChatGPT ou tout autre outil intégré à l'éditeur) qui interviennent sur le dépôt `kasa-app`. Il décrit la posture attendue, le projet et sa stack, et les règles à respecter avant de proposer du code.

## Posture attendue

- **Expliquer avant de montrer.** Quand une question est posée, commencez par le raisonnement : quel est le problème, quelles sont les options, laquelle vous paraît adaptée et pourquoi. Le code vient ensuite, en appui de l'explication.
- **Procéder par petites étapes.** Un changement à la fois, vérifiable (l'application se lance, `npm run lint` et `npm run build` passent) avant de passer au suivant. Pas de refonte en bloc.
- **Poser des questions avant de coder.** Si le périmètre, le comportement attendu ou l'emplacement d'un changement sont ambigus, demandez. Une hypothèse non dite coûte plus cher qu'une question.
- **Laisser la décision à la personne.** Proposez, comparez, argumentez ; ne tranchez pas à sa place sur l'architecture, les dépendances ou les mécanismes à mettre en place. Elle doit pouvoir justifier chaque choix sans vous.
- **Rester dans les conventions du dépôt.** Noms en français, composants fonctions, logique hors React dans `lib/` et `src/donnees/`, alias `@/` côté web.

## Le projet

`kasa-app` est la plateforme de réservation de logements entre particuliers de Kasa. Monorepo npm workspaces :

- `apps/web/` — front-end **Next.js 16.4.0** (App Router) et **React 19.3.0**, TypeScript en mode strict.
  - `app/` : les routes (`page.tsx` accueil, `logements/[id]/page.tsx` détail, `connexion/page.tsx` connexion, `layout.tsx` racine).
  - `components/` : `Header` (client), `CarteLogement` (serveur), `FormulaireConnexion` (client).
  - `lib/` : `types.ts` (types partagés), `api.ts` (client HTTP vers l'API), `session.ts` (session dans le navigateur).
- `apps/api/` — API **Node.js 24.21.0** avec **Express 5**, JavaScript ESM exécuté sans transpilation.
  - `src/serveur.js` : point d'entrée. `src/config.js` : variables d'environnement. `src/donnees/chargeurCsv.js` : lecture du CSV. `src/routes/` : `logements.js` et `auth.js`.
- `starter-kit/` — documents du projet et jeu de données CSV lu par l'API via `DATA_FILE`.

Le front appelle l'API par `NEXT_PUBLIC_API_URL`. Les pages sont des composants serveur qui récupèrent leurs données dans `lib/api.ts` ; `'use client'` n'apparaît que là où il y a de l'interactivité.

Commandes : `npm install` à la racine, `npm run dev` (API sur 4000, web sur 3000), `npm run build`, `npm run lint`. Débogage : configurations dans `.vscode/launch.json`.

## Bonnes pratiques de la stack à rappeler

### React et Next.js

- Un composant est serveur par défaut. Ne proposez `'use client'` que pour de l'état local, des événements ou des API du navigateur ; les secrets et l'accès aux données restent côté serveur.
- `useEffect` sert à se synchroniser avec l'extérieur, pas à calculer une valeur dérivée ni à enchaîner des mises à jour d'état. Pour lire une source externe comme le `localStorage`, préférez `useSyncExternalStore`, comme le fait `Header`.
- Ce qui se calcule à partir de l'état se calcule au rendu ; on ne le stocke pas une seconde fois.
- Les clés de liste sont des identifiants stables (`logement.id`), jamais l'index du tableau.
- Attention aux erreurs d'hydratation : rien dans le rendu serveur ne doit dépendre de `window`, de `Date.now()` ou d'une valeur aléatoire.
- Dans `app/`, les `params` des pages dynamiques sont des promesses (`await params`).
- Les entrées se vérifient toujours sur le serveur ; la validation dans le navigateur (`required`, `type="email"`) est un confort pour l'utilisateur, pas une protection.

### Node.js et Express 5

- Les handlers asynchrones peuvent `await` directement : Express 5 transmet les rejets de promesses au gestionnaire d'erreurs.
- Les erreurs renvoyées au client restent génériques ; le détail va dans les journaux côté serveur.
- Les variables d'environnement se lisent dans `src/config.js`, nulle part ailleurs.

### TypeScript

- Mode strict : props et réponses d'API typées. Un `any` se justifie par écrit ; un `unknown` suivi d'une vérification est presque toujours préférable.
- Les types partagés du front vivent dans `lib/types.ts` ; on les étend plutôt que de les dupliquer.

### Tests, quand il y en a

- On teste le comportement visible (`getByRole`, `getByLabelText`), pas l'implémentation (état interne, classe CSS).
- Les parcours de bout en bout attendent un état de la page, jamais un délai fixe.
- Les tests unitaires et d'intégration se placent à côté du code (`*.test.ts`, `*.test.tsx`), les parcours dans `e2e/`.

## Secrets et données

- **Jamais de secret dans le code**, ni dans un commit, ni dans une variable `NEXT_PUBLIC_*` : tout ce qui porte ce préfixe est envoyé au navigateur et lisible par tous. Les secrets vont dans les fichiers `.env` / `.env.local`, ignorés par Git ; seuls les `.env.example` sont versionnés, avec des valeurs vides ou factices.
- **Les comptes du fichier de données sont des données personnelles** (prénom, nom, adresse e-mail, mot de passe). Ne les recopiez pas dans des exemples, des tests, des messages de commit ou des réponses ; référencez-les par leur identifiant (`u-006`) quand c'est nécessaire.
- **Ne faites pas confiance au code généré.** Relisez-le, exécutez-le, vérifiez qu'il compile (`npm run build`), qu'il passe le lint et qu'il fait ce qui était demandé. Signalez vous-même ce dont vous n'êtes pas sûr.
- **Ne proposez pas d'ajouter une dépendance** sans dire ce qu'elle apporte, ce qu'elle pèse et comment elle est maintenue. Vérifiez la compatibilité avec Next.js 16, React 19 et Node.js 24.

## Ce qu'un assistant ne fait pas sur ce dépôt

- Écrire un fichier entier à la place de la personne sans qu'elle ait validé l'approche.
- Modifier `package.json`, `tsconfig.json` ou les configurations ESLint sans l'expliquer ligne par ligne.
- Committer `node_modules/`, `.next/`, `.env` ou `.env.local`.
- Manipuler le DOM à la main dans un composant React, ou pousser des données entre composants par des effets.
