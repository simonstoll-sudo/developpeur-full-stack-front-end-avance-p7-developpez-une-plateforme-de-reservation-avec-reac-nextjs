# kasa-app – Instructions d'accès, de clonage et d'installation du dépôt

**Projet :** kasa-app – plateforme de réservation de logements entre particuliers
**Commanditaire :** Inès Favreau, CTO de Kasa
**Destinataire :** développeur front-end freelance en charge de la mise en production
**Version du dépôt :** branche `main`, tag `v0.1.0-fonctionnel`

---

## 1. Ce que contient ce dépôt, et ce qu'il ne contient pas

Le dépôt `kasa-app` est l'état de la plateforme tel que vous l'avez livré à l'issue du projet précédent : le cœur fonctionnel est en place, l'application se lance et s'utilise, mais rien n'a encore été fait pour la production.

**Ce qui est présent et fonctionnel :**

- un front-end **Next.js / React** (dossier `apps/web`) avec trois pages : la page d'accueil (liste des logements), la page de détail d'un logement et la page de connexion ;
- une **API Node.js** (dossier `apps/api`) qui expose les logements et un point d'entrée de connexion, et lit ses données depuis un fichier CSV de démonstration ;
- un jeu de données de démonstration : `data/donnees-logements-utilisateurs-kasa.csv` (10 comptes et 12 logements, voir section 6).

**Ce qui est volontairement absent – c'est l'objet de votre mission :**

- **aucune sécurisation** : les mots de passe sont stockés et comparés **en clair**, la connexion renvoie l'identifiant de l'utilisateur sans jeton, aucune validation des entrées n'est faite côté API, aucun en-tête HTTP de sécurité n'est configuré, aucun contrôle de rôle n'existe entre utilisateur, hôte et administrateur ;
- **aucun test** : ni unitaire, ni d'intégration, ni bout-en-bout ; aucun framework de test n'est installé ;
- **aucune pipeline** : pas de dossier `.github/workflows`, pas de configuration de déploiement ;
- **aucun journal de maintenance**.

La messagerie, l'inscription et l'espace hôte n'existent pas. Vous sécurisez les flux présents, la connexion en priorité. Si vous souhaitez couvrir le cas des messages dans votre note de sécurisation, vous pouvez ajouter un formulaire de contact : il reste facultatif.

> Ne considérez pas l'état actuel comme une référence de bonnes pratiques. Il est livré ainsi pour que chaque mécanisme que vous ajouterez soit visible, justifiable et prouvable dans l'historique Git.

---

## 2. Accès au dépôt

- **Adresse du dépôt :** `https://github.com/kasa-demo/kasa-app`
- **Branche de référence :** `main`
- **Accès :** le dépôt est privé. Une invitation GitHub vous a été envoyée par Inès Favreau sur l'adresse e-mail utilisée pour votre contrat. Acceptez-la avant de cloner. Si vous n'avez pas reçu l'invitation, écrivez à `ines.favreau@kasa-demo.fr`.
- **Droits :** vous êtes `maintainer` sur le dépôt, vous pouvez créer des branches, ouvrir des pull requests et configurer les secrets du dépôt (nécessaire pour la pipeline).

Recommandation : travaillez sur des branches dédiées (`feat/securisation-auth`, `test/parcours-connexion`, `ci/pipeline-vercel`, etc.) et fusionnez par pull request sur `main`. L'historique de vos commits servira de preuve dans votre note de sécurisation et votre journal de maintenance.

---

## 3. Prérequis

| Outil | Version requise | Vérification |
| --- | --- | --- |
| Node.js | 20.11 LTS ou supérieure (20.x) | `node --version` |
| npm | 10.x (livré avec Node.js 20) | `npm --version` |
| Git | 2.40 ou supérieure | `git --version` |
| Navigateur | Chrome, Edge ou Firefox récent (outils de développement nécessaires pour le diagnostic) | – |
| Éditeur | Visual Studio Code recommandé (débogueur natif Node.js et navigateur intégré ; un fichier `.vscode/launch.json` est fourni) | – |

Le dépôt contient un fichier `.nvmrc` (`20.11.1`). Si vous utilisez nvm : `nvm use`.

Le gestionnaire de paquets est **npm**, avec les *workspaces* npm : une seule commande d'installation à la racine installe le front et l'API.

---

## 4. Clonage et installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/kasa-demo/kasa-app.git
cd kasa-app

# 2. Se placer sur la bonne version de Node.js (si nvm est installé)
nvm use

# 3. Installer toutes les dépendances (front + API) depuis la racine
npm install

# 4. Créer les fichiers d'environnement à partir des exemples fournis
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Renseignez ensuite les variables d'environnement (section 5) avant de lancer l'application.

---

## 5. Variables d'environnement

Les fichiers `.env.local` et `.env` sont ignorés par Git (`.gitignore`). **Ne les committez jamais.** Seuls les fichiers `.env.example` sont versionnés.

### 5.1 Front-end – `apps/web/.env.local`

| Variable | Valeur par défaut | Rôle |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Adresse de l'API Node.js appelée par le front |
| `NEXT_PUBLIC_APP_NAME` | `Kasa` | Nom affiché dans l'en-tête |

### 5.2 API – `apps/api/.env`

| Variable | Valeur par défaut | Rôle |
| --- | --- | --- |
| `PORT` | `4000` | Port d'écoute de l'API |
| `DATA_FILE` | `../../data/donnees-logements-utilisateurs-kasa.csv` | Chemin du fichier de données de démonstration |
| `CORS_ORIGIN` | `http://localhost:3000` | Origine autorisée pour le front |
| `JWT_SECRET` | *(vide)* | Prévue pour vous : non utilisée dans l'état actuel, à renseigner lorsque vous mettrez en place les jetons |
| `JWT_EXPIRES_IN` | `1h` | Prévue pour vous : durée de validité des jetons |
| `BCRYPT_ROUNDS` | `12` | Prévue pour vous : coût du hachage des mots de passe |
| `OAUTH_CLIENT_ID` / `OAUTH_CLIENT_SECRET` | *(vide)* | Prévues pour vous si vous retenez une délégation d'authentification OAuth2 |

Les variables marquées « prévues pour vous » sont présentes dans `.env.example` pour vous éviter de les inventer, mais **aucun code ne les lit aujourd'hui**.

---

## 6. Lancement en local

Depuis la racine du dépôt :

```bash
# Lancer l'API seule (http://localhost:4000)
npm run dev:api

# Lancer le front seul (http://localhost:3000)
npm run dev:web

# Lancer les deux en parallèle
npm run dev
```

Autres scripts disponibles dans le `package.json` racine :

| Script | Effet |
| --- | --- |
| `npm run build` | Construit le front Next.js (`apps/web/.next`) |
| `npm run start` | Démarre le front construit et l'API en mode production |
| `npm run lint` | ESLint sur les deux applications |

Aucun script `test`, `test:e2e` ou `coverage` n'existe : ils sont à créer avec l'outillage que vous retiendrez (Jest ou Vitest pour l'unitaire et l'intégration, Cypress ou Playwright pour le bout-en-bout). Consultez la documentation officielle de la version de Next.js du dépôt (`apps/web/package.json`) pour identifier l'outil qu'elle recommande, et justifiez votre choix.

### Vérifier que tout fonctionne

1. Ouvrez `http://localhost:3000` : la page d'accueil affiche les 12 logements du CSV (Studio lumineux près du canal, Maison de pêcheur avec jardin, etc.).
2. Cliquez sur un logement : la page de détail affiche le titre, le type, la ville et le prix par nuit.
3. Ouvrez `http://localhost:3000/connexion` et connectez-vous avec un compte de démonstration, par exemple :
   - voyageur : `julien.morand@exemple-kasa.fr` / `azerty123`
   - hôte : `marc.levesque@exemple-kasa.fr` / `marcl-hote-01`
   - administrateur : `ines.favreau@kasa-demo.fr` / `Admin!Kasa2026`
4. Vérifiez dans l'onglet Réseau des outils de développement du navigateur l'appel `POST http://localhost:4000/api/auth/login` : vous constaterez que le mot de passe transite tel quel et que la réponse contient l'identifiant et le rôle sans aucun jeton. C'est le point de départ de votre travail de sécurisation.

> Les comptes de démonstration et leurs mots de passe figurent en clair dans `data/donnees-logements-utilisateurs-kasa.csv` (colonne `mot_de_passe_clair`). Ce fichier représente l'état des données existantes de Kasa : la migration vers des mots de passe hachés fait partie de ce que vous devez traiter et documenter.

---

## 7. Points d'entrée de l'API

| Méthode et route | Description | État actuel |
| --- | --- | --- |
| `GET /api/logements` | Liste des logements (`id`, `titre`, `type_logement`, `ville`, `prix_par_nuit`, `id_hote`) | Public, fonctionnel |
| `GET /api/logements/:id` | Détail d'un logement | Public, fonctionnel ; renvoie une erreur 500 brute (avec trace) si l'identifiant est inconnu |
| `POST /api/auth/login` | Connexion (`email`, `mot_de_passe`) | Fonctionnel ; comparaison en clair, aucune validation, aucun jeton, aucune limitation de tentatives |
| `GET /api/utilisateurs/:id` | Profil d'un compte (`prenom`, `nom`, `email`, `role`) | Fonctionnel ; **aucun contrôle d'accès** : n'importe qui peut lire n'importe quel profil |

Les noms de champs reprennent exactement les colonnes du CSV (`type_enregistrement`, `id`, `titre`, `type_logement`, `ville`, `prix_par_nuit`, `id_hote`, `role`, `prenom`, `nom`, `email`, `mot_de_passe_clair`, `date_creation`). Ne les renommez pas sans mettre à jour l'ensemble de la chaîne.

---

## 8. Arborescence du projet

```
kasa-app/
├── .nvmrc                       # version de Node.js (20.11.1)
├── .gitignore                   # ignore node_modules, .env, .env.local, .next
├── package.json                 # workspaces npm + scripts dev/build/start/lint
├── README.md                    # résumé fonctionnel (à enrichir par vos soins)
├── .vscode/
│   └── launch.json              # configurations du débogueur : API Node.js, front Next.js, navigateur
├── data/
│   └── donnees-logements-utilisateurs-kasa.csv   # 10 comptes + 12 logements de démonstration
├── apps/
│   ├── web/                     # front-end Next.js / React
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── .env.example
│   │   ├── public/
│   │   │   └── images/          # visuels des logements
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.jsx           # mise en page commune (en-tête, pied de page)
│   │       │   ├── page.jsx             # page d'accueil : liste des logements
│   │       │   ├── logement/[id]/page.jsx   # page de détail d'un logement
│   │       │   └── connexion/page.jsx   # page de connexion
│   │       ├── components/
│   │       │   ├── Header.jsx
│   │       │   ├── Footer.jsx
│   │       │   ├── CarteLogement.jsx    # vignette d'un logement
│   │       │   ├── Galerie.jsx          # carrousel d'images
│   │       │   └── FormulaireConnexion.jsx
│   │       ├── lib/
│   │       │   ├── api.js               # appels fetch vers NEXT_PUBLIC_API_URL
│   │       │   └── format.js            # formatage des prix et des dates
│   │       └── styles/
│   │           └── globals.css
│   └── api/                     # API Node.js
│       ├── package.json
│       ├── .env.example
│       └── src/
│           ├── server.js        # démarrage du serveur HTTP (Express)
│           ├── app.js           # déclaration des routes et du CORS
│           ├── routes/
│           │   ├── logements.js
│           │   ├── auth.js      # POST /api/auth/login (comparaison en clair)
│           │   └── utilisateurs.js
│           ├── services/
│           │   └── csvStore.js  # lecture du CSV, séparation utilisateurs / logements
│           └── middlewares/
│               └── erreurs.js   # renvoie la trace complète au client (à corriger)
└── docs/
    └── (vide)                   # emplacement suggéré pour votre note de sécurisation et votre journal de maintenance
```

---

## 9. Débogage : ce qui est déjà configuré

Le fichier `.vscode/launch.json` contient trois configurations prêtes à l'emploi :

- **API : Node.js** – lance `apps/api/src/server.js` avec le débogueur natif de Node.js attaché ; les points d'arrêt posés dans `routes/` et `services/` sont actifs ;
- **Front : Next.js (serveur)** – lance `npm run dev:web` avec inspection côté serveur ;
- **Front : navigateur** – ouvre Chrome sur `http://localhost:3000` avec les sources mappées, pour poser des points d'arrêt dans les composants React.

Pour les outils de développement du navigateur, les onglets Réseau (appels vers l'API), Console (erreurs React et messages du front) et Application (stockage local, cookies) sont ceux que vous utiliserez le plus pour vos preuves de diagnostic.

---

## 10. Déploiement

Aucune configuration de déploiement n'est fournie. Le front Next.js est directement déployable sur **Vercel** ; l'API Node.js peut l'être sous forme de fonctions serverless sur la même plateforme ou sur toute autre solution que vous jugerez adaptée. La solution retenue, et ce qu'elle apporte par rapport à un déploiement manuel, est à justifier dans vos livrables.

Les secrets de production (`JWT_SECRET`, identifiants OAuth, jetons de déploiement) se configurent dans les **secrets du dépôt GitHub** et dans les variables d'environnement de la plateforme de déploiement, jamais dans le code.

---

## 11. En cas de problème à l'installation

| Symptôme | Cause probable | Solution |
| --- | --- | --- |
| `npm install` échoue avec une erreur de version de Node.js | Version de Node.js trop ancienne | `nvm use` ou installer Node.js 20 LTS |
| Page d'accueil vide, erreur `Failed to fetch` dans la Console | L'API n'est pas lancée ou `NEXT_PUBLIC_API_URL` est incorrecte | Lancer `npm run dev:api`, vérifier `apps/web/.env.local` |
| Erreur `ENOENT` au démarrage de l'API | `DATA_FILE` ne pointe pas vers le CSV | Vérifier le chemin dans `apps/api/.env` (relatif à `apps/api`) |
| Erreur CORS dans la Console | `CORS_ORIGIN` ne correspond pas à l'adresse du front | Aligner `CORS_ORIGIN` sur `http://localhost:3000` |

Pour toute question sur le périmètre fonctionnel, adressez-vous à Inès Favreau. Les questions de méthode et de choix d'outils relèvent de votre mission : elles font partie de ce que vous devrez justifier.
