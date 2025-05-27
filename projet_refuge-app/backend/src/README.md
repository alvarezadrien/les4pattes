# Training Node Express Advanced

Ce projet est une application Node.js avec Express qui sert d'exemple pour une formation avancée sur le développement backend.

## Description

Application de gestion de contacts avec une API RESTful, implémentant des concepts avancés de Node.js et Express.

## Prérequis

- Node.js (version 18 ou supérieure)
- MongoDB
- Docker (optionnel)

## Installation

1. Cloner le repository:

```bash
git clone [URL_DU_REPO]
cd training-node-express-advanced
```

2. Installer les dépendances:

```bash
npm install
```

3. Configurer les variables d'environnement:

```bash
cp .env.example .env
```

## Commandes utiles

- Démarrage en mode développement:

```bash
npm run dev
```

- Lancer les tests:

```bash
npm run test
```

- Lancer les tests avec couverture:

```bash
npm run test:coverage
```

- Lancer le linter:

```bash
npm run lint
```

- Générer la documenation OpenAPI:

```bash
npm run doc
```

## Architecture

```markdown
src/
├── api/                   # Configuration et middlewares de l'API
│   ├── config/            # Configuration de l'API
│   ├── errors/            # Gestion des erreurs
│   ├── middlewares/       # Middlewares globaux
│   └── schemas/           # Schémas de validation globaux
├── auth/                  # Module d'authentification
│   ├── auth.controller.js # Contrôleur d'authentification
│   ├── auth.middleware.js # Middleware d'authentification
│   ├── auth.routes.js     # Routes d'authentification
│   ├── auth.schema.js     # Schémas de validation
│   └── auth.service.js    # Service d'authentification
├── resources/             # Ressources de l'API
│   ├── contact/           # Module de gestion des contacts
│   │   ├── contact.controller.js
│   │   ├── contact.model.js
│   │   ├── contact.routes.js
│   │   └── contact.schema.js
│   └── user/              # Module de gestion des utilisateurs
└── app.js
```

## Fonctionnalités principales

- API RESTful pour la gestion des contacts
- Authentification JWT
- Validation des données
- Logging avancé
- Tests unitaires et d'intégration
- Documentation API (Insomnia)

## Déploiement

Le projet peut être déployé avec Docker :

```bash
docker-compose up -d
```

## Tests

Les tests sont implémentés avec Jest. Pour lancer les tests :

```bash
npm test
```

## Documentation

La documentation de l'API est disponible dans le fichier `insomnia-contacts-api.yaml` et peut être importée dans Insomnia.

## Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT.
