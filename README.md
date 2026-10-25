# Gestion clients — projet de fin d'études

[![CI](https://github.com/kamal-code1/PFE-gestion_client/actions/workflows/ci.yml/badge.svg)](https://github.com/kamal-code1/PFE-gestion_client/actions/workflows/ci.yml)

Application de gestion commerciale : clients, fournisseurs, produits, catalogues, collections, secteurs d'activité et offres. API REST Node.js / Express sur MongoDB, interface HTML / Bootstrap.

## Stack

- Node.js, Express 5
- MongoDB (driver officiel)
- Interface HTML, Bootstrap 5, JavaScript
- Tests : Jest, Supertest, MongoDB en mémoire (`mongodb-memory-server`)
- CI GitHub Actions

## API

Chaque ressource expose le même CRUD : `GET /api/<ressource>`, `GET /api/<ressource>/:id`, `POST`, `PUT /:id`, `DELETE /:id`.

| Ressource | Collection MongoDB | Champs obligatoires (création) |
|---|---|---|
| `clients` | `clients` | `nom`, `email` |
| `fournisseurs` | `fournisseurs` | `nom` |
| `produits` | `produits` | `nom` |
| `catalogues` | `catalogues` | `nom` |
| `collections` | `collections` | `nom` |
| `collection-produits` | `collection_produits` | — |
| `secteurs` | `secteurs_activite` | `nom` |
| `offres` | `offres` | — |
| `ligne-offres` | `ligne_offres` | — |

Réponses : `400` pour un identifiant invalide, un JSON invalide ou un champ obligatoire manquant ; `404` pour un élément inexistant ; `204` après une suppression.

## Installation

```bash
npm install
cp .env.example .env   # puis renseigner MONGODB_URI
npm start              # http://localhost:3000
```

| Variable | Défaut | Rôle |
|---|---|---|
| `MONGODB_URI` | `mongodb://localhost:27017` | Chaîne de connexion MongoDB |
| `MONGODB_DB` | `gestion_client` | Nom de la base |
| `PORT` | `3000` | Port HTTP |
| `CORS_ORIGIN` | `*` | Origines autorisées, séparées par des virgules |

L'interface se trouve dans `frontend/` (ouvrir `frontend/index.html`, par exemple avec Live Server). Elle appelle l'API sur `http://localhost:3000/api`.

## Tests

```bash
npm test
```

Les tests démarrent un MongoDB en mémoire : aucune base à installer.

## Historique

La première version utilisait MySQL. Le schéma d'origine est conservé dans `docs/schema-mysql-historique.sql` ; toute l'API utilise désormais MongoDB.
