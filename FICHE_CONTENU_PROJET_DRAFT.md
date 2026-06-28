# Brouillon contenu fiche - Harmos Calc - Calculateur scolaire suisse avec suivi HarmoS

## Resume
Outil interactif pour saisir les notes, calculer les moyennes, évaluer l'orientation HarmoS et gérer un système de bonus/malus lié au temps de jeu.

## A quoi sert le projet
Simplifier le suivi scolaire des élèves en transformant les notes brutes en informations actionnables (moyennes, orientation, progression) et en motivant l'élève via un système de récompenses temporelles.

## Fonctionnement
L'application fonctionne en temps réel : à chaque saisie de note, les moyennes sont recalculées instantanément. Le système HarmoS analyse les niveaux A/B/C par matière pour déterminer une orientation. Le mode bonus/malus est appliqué automatiquement selon des règles configurables (ex : +15 min par note ≥ 5, -15 min par note < 4). Le timer de jeu est synchronisé avec ces bonus/malus. Le mode parent, protégé par mot de passe, permet de configurer les seuils et de consulter l'historique des actions.

## Construction
Le projet a été conçu comme un outil familial simple et visuel, combinant calcul scolaire, visualisation immédiate et mécanique de motivation. L'architecture repose sur une séparation claire entre l'interface utilisateur (React), la logique métier (calculs locaux) et les services externes (appel à une API pour les règles HarmoS). Le choix de React et Vite permet une interface responsive et un développement modulaire. Le stockage des données est local (IndexedDB ou localStorage) pour garantir la confidentialité. La sécurité est renforcée par un mode parent protégé et une journalisation des actions. L'optimisation inclut un recalcul différé des moyennes pour éviter les blocages UI.

## Installation
[object Object]

## Utilisation
[object Object]

## Fonctions
- Saisie des notes par matière et composant
- Calcul automatique des moyennes par matière et moyenne générale
- Évaluation de l'orientation scolaire selon les niveaux HarmoS (A/B/C)
- Affichage de la progression et conseils personnalisés
- Mode parent protégé par mot de passe pour gérer les paramètres sensibles
- Système de bonus/malus transformant les notes en temps de jeu
- Journalisation des actions parent
- Réinitialisation complète des données (notes, timer, bonus)
- Calcul dynamique des moyennes pondérées
- Classification automatique de l'orientation HarmoS
- Génération de conseils personnalisés basés sur les résultats
- Système de bonus/malus configurable
