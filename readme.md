# Description

Backend développé en **Node.js** avec **Express**, servant une API pour le portfolio. Il gère les données (projets, technologies, utilisateurs, authentification) et communique avec le frontend React via des endpoints REST.
[Lien vers le frontend](https://github.com/yannou64/PortFolio-Frontend.git)

# Stack Technique

- Node.js — environnement d’exécution côté serveur
- Express — framework minimaliste pour la création d’API REST
- MongoDB — base de données orientée documents
- Mongoose — ODM facilitant la modélisation et la validation des données
- Bcrypt — hashage sécurisé des mots de passe
- Multer — gestion de l’upload et du stockage des images
- JWT (JSON Web Token) — authentification et gestion des sessions

Cookie HTTP-only pour la gestion des sessions

# Installation et lancement

Clonez le dépôt, installez les dépendances et lancez le serveur :

```bash
    git clone <url-du-repo>
    cd backend
    npm install
    npm run dev
```

# Variables d’environnement

```bash
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.aiofetq.mongodb.net/<database>
    PORT=3444
    SALT=10
    SECRET=<clé_secrète_jwt>
    MAIL_PASS=<mdp_application>
    MAIL_USER=<email_gmail>
    FRONTEND_ORIGIN=<url_frontend>
    NODE_ENV="dev"
```

# Routes principales

Liste les endpoints que le front utilise :

## Authentification

**POST** `/api/auth/register` Création utilisateur
**POST** `/api/auth/login` Authentification utilisateur
**POST** `/api/auth/logout` Logout utilisateur
**GET** `/api/auth/checkifAdmin` Vérifie si session valide

## Projets


**POST** `/api/edition/projets/` Création d'un projet
**GET** `/api/edition/projets/` Récupère tous les projets
**GET** `/api/edition/projets/favoris` Récupère tous les projets favoris
**GET** `/api/edition/projets/:id` Récupère un projet avec son id
**DELETE** `/api/edition/projets/:id` Supprime un projet avec son id
**PUT** `/api/edition/projets/:id` Met à jour un projet avec son id

## Technos

**POST** `/api/edition/technos/` Création d'une techno
**GET** `/api/edition/technos/` Récupère toutes les technos
**GET** `/api/edition/technos/byCategories` Récupère toutes les technos groupés par catégories
**DELETE** `/api/edtion/technos/:id` Supprime une techno avec son id
**PUT** `/api/edition/technos/:id` Met à jour une techno avec son id

## Prise de contact

**POST** `/priseDeConact` Envoi un email à l'admin

# Architecture – Modèle MVC

Le projet suit une architecture MVC (Model – View – Controller) afin de garantir une meilleure organisation et une maintenance facilitée du code.

## Models (Modèle)

Définit la structure des données via Mongoose.
Contient les schémas et les règles de validation des collections MongoDB (ex. : Project, Techno, User).

## Controllers (Controlleur)

Contient la logique métier.
Reçoit les requêtes HTTP, interagit avec les modèles, et renvoie les réponses appropriées au client.

## Routers (Route)

Définissent les endpoints de l’API.
Redirigent chaque requête vers le contrôleur correspondant.

## View (Vues)

Dans ce projet, la partie View est gérée par le frontend React (le backend ne sert que des données JSON).
