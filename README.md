#  API Recettes

Une API REST construite avec **Node.js** et **Express** qui récupère les recettes de [TheMealDB](https://www.themealdb.com/api.php) et les renvoie dans un format plus simple à utiliser.

##  Fonctionnalités

- Recherche de recettes par nom, avec filtres par catégorie et origine
- Détail d'une recette par son id
- Recette aléatoire
- Statistiques calculées sur les recettes trouvées
- Données nettoyées : ingrédients regroupés en liste `[{ nom, quantite }]` et champs vides supprimés

## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)

## Installation

```bash
git clone https://github.com/Al1Rod/API-recette.git
cd API-recette
npm install
npm run dev
```

L'API est disponible sur `http://localhost:3000`.

## Routes

| Méthode | Route | Description |
|---|---|---|
| GET | `/health` | Vérifie que le serveur fonctionne |
| GET | `/api/recettes?nom=chicken` | Recherche par nom (filtres : `categorie`, `origine`) |
| GET | `/api/recettes/aleatoire` | Renvoie une recette au hasard |
| GET | `/api/recettes/:id` | Renvoie une recette par son id |
| GET | `/api/stats?nom=chicken` | Statistiques sur les recettes trouvées |


## Gestion des erreurs

| 404 | Route inconnue ou recette introuvable |
| 500 | Erreur serveur |

## Structure du projet

```
├── serveur.js
└── src/
    ├── app.js
    ├── routes/
    │   ├── recettes.routes.js
    │   └── stats.routes.js
    └── services/
        └── mealdb.service.js
```

## Auteur

[Al1Rod](https://github.com/Al1Rod)
