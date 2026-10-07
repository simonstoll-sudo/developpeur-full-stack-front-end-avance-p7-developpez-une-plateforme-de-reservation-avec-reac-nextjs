# Journal de maintenance – Plateforme kasa-app (modèle à compléter)

## Comment utiliser ce modèle

Ce journal est le document que vous remettrez à Inès Favreau, CTO de Kasa, pour rendre compte de la maintenance de la plateforme kasa-app (Next.js, React, API Node.js). Il ne s'agit pas d'une liste de bugs corrigés, mais d'un journal de bord : pour chaque intervention, on doit pouvoir lire comment le problème a été constaté, comment il a été diagnostiqué et avec quel outil, ce qui a été audité dans le code, ce qui a été refactorisé et pourquoi, et comment la correction a été vérifiée.

Règles de remplissage :

- Une entrée par intervention, datée, numérotée dans l'ordre chronologique (MAINT-001, MAINT-002, etc.).
- Chaque entrée reprend les cinq rubriques dans l'ordre. Ne supprimez aucune rubrique : si l'une ne s'applique pas, écrivez « non applicable » et dites pourquoi.
- La rubrique **Diagnostic** doit nommer l'outil utilisé (débogueur natif de l'éditeur, outils de développement du navigateur, ou les deux) et contenir une preuve : capture d'écran, extrait de trace, copie d'un onglet Réseau ou Console, valeur observée à un point d'arrêt.
- La rubrique **Vérification après correction** doit renvoyer à quelque chose de rejouable : un test automatisé ajouté ou modifié, une commande exécutée, un résultat mesuré avant / après.
- Les trois types de maintenance sont acceptés : corrective (un défaut constaté), préventive (un risque identifié avant qu'il ne devienne un incident), évolutive (une adaptation du code pour accueillir une évolution). Indiquez le type dans l'en-tête de l'entrée.
- Les phrases en italique sont des aides à la rédaction : supprimez-les une fois l'entrée rédigée.

L'entrée d'exemple ci-dessous est volontairement générique et sans rapport avec kasa-app : elle montre le niveau de détail attendu, pas le contenu. Supprimez-la avant de remettre le journal.

---

## Identification du journal

| Champ | Valeur |
| --- | --- |
| Projet | kasa-app – plateforme de réservation de logements entre particuliers |
| Commanditaire | Inès Favreau, CTO de Kasa |
| Auteur (développeur front-end freelance) |  |
| Dépôt GitHub concerné (même dépôt que la note de sécurisation, les tests et la pipeline) |  |
| Période couverte par le journal |  |
| Outils de diagnostic utilisés sur la période (débogueur natif de l'éditeur, outils de développement du navigateur, autres) |  |

---

## Sommaire des entrées

_Aide : une ligne par entrée, à tenir à jour au fil du journal. Elle permet à Inès Favreau de voir d'un coup d'œil ce qui a été fait._

| N° | Date | Type (corrective / préventive / évolutive) | Résumé en une ligne | Statut (ouvert / corrigé / vérifié) |
| --- | --- | --- | --- | --- |
| MAINT-001 |  |  |  |  |
| MAINT-002 |  |  |  |  |
| MAINT-003 |  |  |  |  |

---

## Entrée MAINT-001

**Date :** 
**Type de maintenance :** 
**Composant ou zone du code concernée :** 
**Auteur :** 

### 1. Symptôme constaté

_Aide : décrivez ce qui a été observé, par qui, dans quelles conditions (navigateur, environnement local ou déployé, données utilisées). Restez factuel : ce qui se passe, ce qui devrait se passer à la place. Indiquez comment le problème a été reproduit._

- Observé le / par : 
- Environnement : 
- Comportement observé : 
- Comportement attendu : 
- Étapes de reproduction : 

### 2. Diagnostic

_Aide : nommez l'outil utilisé et joignez la preuve. Avec le débogueur natif de l'éditeur : fichier, ligne du point d'arrêt, valeur des variables observées. Avec les outils de développement du navigateur : onglet utilisé (Console, Réseau, Éléments, Performances, Application), requête ou message observé, extrait copié. Concluez par la cause identifiée, en distinguant la cause réelle du symptôme._

- Outil(s) utilisé(s) : 
- Preuve (capture d'écran, extrait de trace, requête réseau, valeur à un point d'arrêt) : 

```
(coller ici l'extrait de trace, de console ou de requête)
```

- Cause identifiée : 
- Hypothèses écartées et pourquoi : 

### 3. Audit du code concerné

_Aide : listez les fichiers et fonctions relus, ce que vous avez vérifié (logique, gestion des erreurs, dépendances, duplication, sécurité, performance) et ce que vous avez trouvé, y compris ce qui était correct. Signalez si le même défaut existe ailleurs dans le dépôt._

| Fichier / fonction auditée | Ce qui a été vérifié | Constat |
| --- | --- | --- |
|  |  |  |
|  |  |  |

- Défaut présent ailleurs dans le code ? (où) : 
- Tests existants sur cette zone avant intervention : 

### 4. Refactorisation effectuée et justification

_Aide : décrivez ce qui a été modifié, et surtout pourquoi cette modification empêche le problème de revenir (et pas seulement de disparaître). Indiquez le commit ou la pull request. Si vous avez choisi de ne pas refactoriser une partie, dites-le et justifiez._

- Modifications apportées : 
- Justification (pourquoi cette solution, alternatives envisagées) : 
- Commit / pull request : 
- Impact sur le reste de l'application (compatibilité, performance, sécurité) : 

### 5. Vérification après correction

_Aide : montrez que la correction fonctionne de façon rejouable : test automatisé ajouté ou modifié (nom du fichier de test, niveau : unitaire, intégration, bout-en-bout), commande exécutée et résultat, mesure avant / après, passage de la pipeline._

- Test(s) ajouté(s) ou modifié(s) : 
- Commande exécutée et résultat : 

```
(coller ici la sortie de la commande ou le résultat de la pipeline)
```

- Mesure avant / après (si applicable) : 
- Vérifié dans le navigateur le / par : 
- Statut final : 

---

## Entrée MAINT-002

**Date :** 
**Type de maintenance :** 
**Composant ou zone du code concernée :** 
**Auteur :** 

### 1. Symptôme constaté

- Observé le / par : 
- Environnement : 
- Comportement observé : 
- Comportement attendu : 
- Étapes de reproduction : 

### 2. Diagnostic

- Outil(s) utilisé(s) : 
- Preuve : 

```

```

- Cause identifiée : 
- Hypothèses écartées et pourquoi : 

### 3. Audit du code concerné

| Fichier / fonction auditée | Ce qui a été vérifié | Constat |
| --- | --- | --- |
|  |  |  |

- Défaut présent ailleurs dans le code ? (où) : 
- Tests existants sur cette zone avant intervention : 

### 4. Refactorisation effectuée et justification

- Modifications apportées : 
- Justification : 
- Commit / pull request : 
- Impact sur le reste de l'application : 

### 5. Vérification après correction

- Test(s) ajouté(s) ou modifié(s) : 
- Commande exécutée et résultat : 

```

```

- Mesure avant / après : 
- Statut final : 

---

## Entrée MAINT-003

_Dupliquez la structure ci-dessus autant de fois que nécessaire._

---

## Bilan de la période

_Aide : en cinq à dix lignes, sans vocabulaire technique, résumez pour Inès Favreau ce qui a été maintenu, ce qui reste fragile et ce que vous recommandez de surveiller ou de traiter ensuite. Indiquez les outils de surveillance ou d'alerte que vous proposez de mettre en place pour détecter plus tôt les problèmes de ce type._

- Ce qui a été corrigé ou consolidé : 
- Points restant fragiles et risques acceptés : 
- Recommandations de surveillance et de maintenance préventive : 

---

## ENTRÉE D'EXEMPLE (générique, à supprimer avant remise)

_Cet exemple ne concerne pas kasa-app. Il illustre uniquement le niveau de détail attendu dans chaque rubrique._

### Entrée EX-001

**Date :** 03/02/2026
**Type de maintenance :** corrective
**Composant ou zone du code concernée :** page de liste d'articles d'un blog interne, composant `ArticleList`
**Auteur :** développeur de l'équipe web

#### 1. Symptôme constaté

- Observé le / par : 02/02/2026, par un rédacteur de l'équipe contenu.
- Environnement : navigateur Chrome 121, environnement de préproduction.
- Comportement observé : au chargement de la page « Articles », la liste reste vide pendant environ trois secondes puis s'affiche en double (chaque article apparaît deux fois).
- Comportement attendu : la liste s'affiche une seule fois, dès que la réponse de l'API est reçue.
- Étapes de reproduction : ouvrir la page « Articles », attendre le chargement ; le doublon apparaît à chaque fois après un rechargement complet de la page, pas lors d'une navigation interne.

#### 2. Diagnostic

- Outil(s) utilisé(s) : outils de développement du navigateur (onglet Réseau, puis onglet Console), puis débogueur natif de l'éditeur sur le composant `ArticleList`.
- Preuve : dans l'onglet Réseau, la requête `GET /api/articles` est émise deux fois au chargement initial, à 40 ms d'intervalle. Au point d'arrêt placé dans l'effet de chargement du composant (`ArticleList.jsx`, ligne 18), le débogueur montre que l'effet est exécuté deux fois et que la variable `articles` passe de `[]` à 12 éléments, puis de 12 à 24 éléments.

```
Réseau : GET /api/articles  200  312 ms  (déclenchée 2 fois)
Console : aucune erreur
Point d'arrêt ArticleList.jsx:18 — articles.length : 0 → 12 → 24
```

- Cause identifiée : l'effet de chargement ajoute les articles reçus à la liste existante (`setArticles([...articles, ...data])`) au lieu de la remplacer. En mode développement, le mode strict de React exécute volontairement l'effet deux fois, ce qui révèle le défaut d'accumulation. Le délai de trois secondes vient d'un second défaut : l'appel API attend la fin d'une animation d'entrée avant d'être émis.
- Hypothèses écartées et pourquoi : un doublon côté API a été écarté (la réponse brute contient 12 articles uniques) ; un problème de cache navigateur a été écarté (le symptôme persiste après vidage du cache).

#### 3. Audit du code concerné

| Fichier / fonction auditée | Ce qui a été vérifié | Constat |
| --- | --- | --- |
| `ArticleList.jsx`, effet de chargement | Logique de mise à jour de l'état, dépendances de l'effet, gestion des erreurs | Accumulation au lieu de remplacement ; aucune gestion d'erreur si l'API échoue ; dépendances correctes |
| `useArticles.js` (absent, logique inline dans le composant) | Réutilisation de la logique de chargement | Logique dupliquée dans deux autres composants (`ArticleSidebar`, `ArticleSearch`) |
| `api/articles.js` | Unicité des articles renvoyés | Correct : 12 identifiants uniques |

- Défaut présent ailleurs dans le code ? : oui, le même schéma d'accumulation existe dans `ArticleSidebar.jsx`.
- Tests existants sur cette zone avant intervention : aucun test unitaire sur `ArticleList` ; un test bout-en-bout vérifie seulement que la page se charge sans erreur.

#### 4. Refactorisation effectuée et justification

- Modifications apportées : extraction de la logique de chargement dans un hook `useArticles` qui remplace l'état au lieu de l'accumuler, ajoute un état de chargement et un état d'erreur, et est réutilisé par les trois composants concernés ; suppression de l'attente de fin d'animation avant l'appel API.
- Justification : remplacer l'accumulation par un remplacement corrige le symptôme ; centraliser la logique dans un hook empêche le défaut de réapparaître dans les composants qui dupliquaient le code, et permet de le tester une seule fois. Une alternative (désactiver le mode strict) a été rejetée car elle aurait masqué le défaut sans le corriger.
- Commit / pull request : PR #47 « Extraction du hook useArticles et correction du doublon d'articles ».
- Impact sur le reste de l'application : aucun changement d'interface ; temps d'affichage réduit car l'appel API n'attend plus l'animation.

#### 5. Vérification après correction

- Test(s) ajouté(s) ou modifié(s) : test unitaire `useArticles.test.js` (vérifie que la liste contient exactement les éléments renvoyés par l'API simulée, même si le hook est monté deux fois) ; test bout-en-bout `articles.spec.js` modifié pour compter le nombre d'articles affichés.
- Commande exécutée et résultat :

```
npm run test -- useArticles
  ✓ remplace la liste au lieu de l'accumuler (2 montages)
  ✓ expose un état d'erreur si l'API échoue
2 tests réussis

npm run test:e2e -- articles
  ✓ affiche 12 articles, sans doublon
1 test réussi
```

- Mesure avant / après : délai d'affichage de la liste mesuré dans l'onglet Performances : 3 100 ms avant, 380 ms après.
- Vérifié dans le navigateur le / par : 03/02/2026, par le développeur puis par le rédacteur ayant signalé le problème.
- Statut final : vérifié, déployé en préproduction, pipeline au vert.
