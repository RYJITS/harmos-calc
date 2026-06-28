# Harmos Calc - Calculateur scolaire suisse avec suivi HarmoS

## Rapport complet

Ce depot public presente le concept, les fonctions, les choix de conception, les outils utilises, les commandes locales et les captures d'ecran de l'application. Il est genere par l'orchestrateur uniquement apres validation de publication publique.

## Concept

Outil interactif pour saisir les notes, calculer les moyennes, évaluer l'orientation HarmoS et gérer un système de bonus/malus lié au temps de jeu.

Simplifier le suivi scolaire des élèves en transformant les notes brutes en informations actionnables (moyennes, orientation, progression) et en motivant l'élève via un système de récompenses temporelles.

Public vise: Parents et élèves (usage familial) souhaitant un suivi scolaire clair, des conseils d'orientation et une mécanique de motivation intégrée.


## Fonctionnement de l'application

L'application fonctionne en temps réel : à chaque saisie de note, les moyennes sont recalculées instantanément. Le système HarmoS analyse les niveaux A/B/C par matière pour déterminer une orientation. Le mode bonus/malus est appliqué automatiquement selon des règles configurables (ex : +15 min par note ≥ 5, -15 min par note < 4). Le timer de jeu est synchronisé avec ces bonus/malus. Le mode parent, protégé par mot de passe, permet de configurer les seuils et de consulter l'historique des actions.

## Fonctions de l'application

- Saisie des notes par matière et composant
- Calcul automatique des moyennes par matière et moyenne générale
- Évaluation de l'orientation scolaire selon les niveaux HarmoS (A/B/C)
- Affichage de la progression et conseils personnalisés
- Mode parent protégé par mot de passe pour gérer les paramètres sensibles
- Système de bonus/malus transformant les notes en temps de jeu
- Journalisation des actions parent
- Réinitialisation complète des données (notes, timer, bonus)
- Calcul dynamique des moyennes pondérées
- Évaluation automatique de l'orientation HarmoS
- Génération de conseils personnalisés
- Système de bonus/malus configurable
- Timer de jeu synchronisé avec les performances
- Réinitialisation complète des données
- Persistance locale des données
- Interface responsive (mobile et desktop)
- Animations visuelles pour les récompenses et pénalités

## Actualisations et evolution

- Mise à jour des dépendances principales (React 19, Vite 6, TypeScript 5.8)
- Validation des scripts de build (`npm run build`) et de lint (`npm run lint`)
- Ajout de captures d'écran pour la documentation publique
- Intégration d'un système de règles HarmoS basé sur des appels API optionnels
- Amélioration de la sécurité avec un mode parent protégé et une journalisation des actions
- Optimisation des performances avec un recalcul différé des moyennes
- Statut courant: PUBLIC_READY.
- Securite: OK_PUBLIC.
- Fonctionnement: FONCTIONNEL.
- [object Object]

## Comment le projet a ete reflechi et construit

Le projet a été conçu comme un outil familial simple et visuel, combinant calcul scolaire, visualisation immédiate et mécanique de motivation. L'architecture repose sur une séparation claire entre l'interface utilisateur (React), la logique métier (calculs locaux) et les services externes (appel à une API pour les règles HarmoS). Le choix de React et Vite permet une interface responsive et un développement modulaire. Le stockage des données est local (IndexedDB ou localStorage) pour garantir la confidentialité. La sécurité est renforcée par un mode parent protégé et une journalisation des actions. L'optimisation inclut un recalcul différé des moyennes pour éviter les blocages UI.

Cette section doit expliquer les choix qui ont guide le projet: besoin de depart, structure retenue, modules principaux, compromis techniques, interface ou logique metier, et raisons des outils utilises.

### Outils, IA et moteurs utilises

- React 19 pour l'interface utilisateur
- Vite 6 comme serveur de développement et bundler
- TypeScript 5.8 pour le typage statique
- Tailwind CSS pour le style
- Motion pour les animations
- canvas-confetti pour les effets visuels
- Google GenAI pour l'appel aux règles HarmoS (optionnel)
- Express pour le serveur de développement (si nécessaire)
- Calcul côté client pour une réactivité immédiate
- Stockage local (IndexedDB/localStorage) pour la persistance
- Modèle de composants React pour une architecture modulaire
- Gestion d'état local avec React Context ou Zustand
- Appel API externe pour les règles HarmoS (optionnel)
- Responsive Design avec Tailwind CSS
- Optimisation des performances (recalcul différé, memoization)

### Options techniques detectees

- Type de projet: node
- Gestionnaire: npm
- Nom package: react-example
- Version: 0.0.0
- Lien public: https://mamoyenne.c2rdesign.com/
- Statut securite: OK_PUBLIC

### Stack et dependances principales

- Vite/Dev server
- React
- Node.js
- Calcul côté client pour une réactivité immédiate
- Stockage local (IndexedDB/localStorage) pour la persistance
- Modèle de composants React pour une architecture modulaire
- Gestion d'état local avec React Context ou Zustand
- Appel API externe pour les règles HarmoS (optionnel)
- Responsive Design avec Tailwind CSS
- Optimisation des performances (recalcul différé, memoization)

### Scripts disponibles

- build: vite build
- clean: rm -rf dist
- dev: vite --port=3000 --host=0.0.0.0
- lint: tsc --noEmit
- preview: vite preview

### Dependances applicatives

- @google/genai ^1.29.0
- @tailwindcss/vite ^4.1.14
- @vitejs/plugin-react ^5.0.4
- better-sqlite3 ^12.4.1
- canvas-confetti ^1.9.4
- dotenv ^17.2.3
- express ^4.21.2
- lucide-react ^0.546.0
- motion ^12.23.24
- react ^19.0.0
- react-dom ^19.0.0
- vite ^6.2.0

### Dependances de developpement

- @types/express ^4.17.21
- @types/node ^22.14.0
- autoprefixer ^10.4.21
- tailwindcss ^4.1.14
- tsx ^4.21.0
- typescript ~5.8.2
- vite ^6.2.0

## Automatisations et comportements internes

- Recalcul automatique des moyennes à chaque saisie de note
- Application automatique des bonus/malus selon les seuils configurés
- Affichage dynamique de l'orientation HarmoS
- Génération de conseils personnalisés
- Journalisation automatique des actions parent
- Synchronisation du timer de jeu avec les bonus/malus

## Installation locale

[object Object]

### Pre-requis
- Node.js installe localement.
- Gestionnaire detecte: npm.
- Creer un fichier `.env` local a partir de `.env.example` si des variables sont necessaires.

### Commandes
```powershell
npm install
npm run build
npm run dev
```

### Scripts utiles
- build: vite build
- clean: rm -rf dist
- dev: vite --port=3000 --host=0.0.0.0
- lint: tsc --noEmit
- preview: vite preview

## Lancement

```powershell
npm run dev
npm run build
```

## Utilisation

[object Object]

## Captures d'ecran

![Capture desktop](docs/github-captures/10-harmos-calc-2026-06-28_03-38-17-desktop.png)

![Capture mobile](docs/github-captures/10-harmos-calc-2026-06-28_03-38-17-mobile.png)

## Variables d'environnement

Copier `.env.example` vers `.env` en local puis remplir les valeurs privees.

## Securite

Ne jamais publier `.env`, tokens, sessions, logs sensibles, cles privees ou donnees personnelles.
