# Harmos Calc - Calculateur scolaire suisse avec suivi HarmoS

## Liens vers l'application
- Lien public: [https://mamoyenne.c2rdesign.com/](https://mamoyenne.c2rdesign.com/)
- GitHub: [https://github.com/RYJITS/harmos-calc](https://github.com/RYJITS/harmos-calc)

## A quoi sert le projet
Harmos Calc est une application web interactive conçue pour aider les familles à suivre la progression scolaire des élèves selon le système HarmoS suisse. L'application permet de saisir des notes par matière et composant, calcule automatiquement les moyennes pondérées, et évalue l'orientation scolaire (Général, Moderne, Pré-gymnasial) en fonction des niveaux A/B/C. Un système de bonus/malus transforme les performances en temps de jeu, offrant une motivation supplémentaire. Le mode parent, sécurisé par mot de passe, permet de configurer les seuils et de consulter l'historique des actions.

## Fonctionnement de l'application ou du projet
L'application fonctionne en temps réel : à chaque saisie de note, les moyennes sont recalculées instantanément. Le système HarmoS analyse les niveaux A/B/C par matière pour déterminer une orientation. Le mode bonus/malus est appliqué automatiquement selon des règles configurables (ex : +15 min par note ≥ 5, -15 min par note < 4). Le timer de jeu est synchronisé avec ces bonus/malus. Le mode parent, protégé par mot de passe, permet de configurer les seuils et de consulter l'historique des actions.

## Comment le projet a ete construit
Le projet a été conçu comme un outil familial simple et visuel, combinant calcul scolaire, visualisation immédiate et mécanique de motivation. L'architecture repose sur une séparation claire entre l'interface utilisateur (React), la logique métier (calculs locaux) et les services externes (appel à une API pour les règles HarmoS). Le choix de React et Vite permet une interface responsive et un développement modulaire. Le stockage des données est local (IndexedDB ou localStorage) pour garantir la confidentialité. La sécurité est renforcée par un mode parent protégé et une journalisation des actions. L'optimisation inclut un recalcul différé des moyennes pour éviter les blocages UI.

## Installation et utilisation
### Installation
[object Object]

### Utilisation
[object Object]

## Fonctions disponibles dans l'application
- Calcul dynamique des moyennes pondérées
- Évaluation automatique de l'orientation HarmoS
- Génération de conseils personnalisés
- Système de bonus/malus configurable
- Timer de jeu synchronisé avec les performances
- Journalisation des actions parent
- Réinitialisation complète des données
- Persistance locale des données
- Interface responsive (mobile et desktop)
- Animations visuelles pour les récompenses et pénalités

## Outils, IA et moteurs en arriere-plan
- React 19 pour l'interface utilisateur
- Vite 6 comme serveur de développement et bundler
- TypeScript 5.8 pour le typage statique
- Tailwind CSS pour le style
- Motion pour les animations
- canvas-confetti pour les effets visuels
- Google GenAI pour l'appel aux règles HarmoS (optionnel)
- Express pour le serveur de développement (si nécessaire)

## Automatisations integrees
- Recalcul automatique des moyennes à chaque saisie de note
- Application automatique des bonus/malus selon les seuils configurés
- Affichage dynamique de l'orientation HarmoS
- Génération de conseils personnalisés
- Journalisation automatique des actions parent
- Synchronisation du timer de jeu avec les bonus/malus

## Captures d'ecran
![Capture 1 - harmos-calc](docs/captures/10-harmos-calc-2026-06-25_01-33-15-desktop.png)

![Capture 2 - harmos-calc](docs/captures/10-harmos-calc-2026-06-25_01-33-15-mobile.png)

## Mises a jour
- [object Object]
- [object Object]
- Mise à jour des dépendances principales (React 19, Vite 6, TypeScript 5.8)
- Validation des scripts de build (`npm run build`) et de lint (`npm run lint`)
- Ajout de captures d'écran pour la documentation publique
- Intégration d'un système de règles HarmoS basé sur des appels API optionnels
- Amélioration de la sécurité avec un mode parent protégé et une journalisation des actions
- Optimisation des performances avec un recalcul différé des moyennes

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
