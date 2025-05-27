# TP Express.js avancé

Améliorer l'API REST existante pour gérer une liste de contacts en mettant en place les concepts avancés.

## Structure du projet

```sh
contacts-api/
├── src/
│   └── config
|     └── app.config.js
|     └── logger.config.js
|   |
│   └── middlewares
|     └── logger.middleware.js
|   |
│   └── resources
|     └── contact
│       └── contact.controller.js
│       └── contact.model.json
│       └── contact.routes.js
|   |
│   └── app.bootstrap.js
├── .env
├── .gitignore
├── package.json
```

## 1. Architecture

Si ce n'est pas encore fait, mettez en place une architecture `Domain Driven Design`.

## 2. Logs

Une application digne de ce nom se doit d'enregistrer des logs qui permettront de réaliser les analyses requises pour les évolutions et les correctifs de bugs.

Mettez en place les éléments suivants:

- Logs HTTP avec Morgan
- Logs applicatifs avec Winston
- Alertes de niveau warning postés sur un channel Slack

## 3. Gestion des erreurs

Implémenter une gestion d'erreurs robuste dans l'application.

### 1. Création d'un middleware de gestion d'erreurs

Dans `middlewares/error.middleware.js`:

```javascript
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'AuthError') {
    return res.status(401).json({
      error: 'Accès refusé',
      details: err.message
    });
  }

  res.status(500).json({
    error: 'Erreur serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
};
```

### 2. Création d'une classe d'erreur personnalisée

Dans `errors.js`:

```javascript
export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}
```

### 3. Utilisation des erreurs personnalisées

- Implémenter la classe d'erreur dans le middleware d'authentification
- Lever des erreurs personnalisées
- Les gérer dans le middleware d'erreurs

### Critères de validation pour la gestion des erreurs

- Les erreurs sont correctement capturées
- Les messages d'erreur sont appropriés
- Le stack trace n'est visible qu'en développement

## 4. Sécurité

Implémentez et configurez les middlewares suivants pour toutes les routes:

- cors
- helmet
- rate-limit

## 5. Validation des données

Implémenter la validation des données avec un schéma JSON.

### 1. Installation de Joi

```bash
npm install joi
```

### 2. Création des schémas de validation

Pour toutes les routes de la ressource `contact`, implémentez des schémas de validation pour:

- le body quand il est présent (POST, PUT)
- les query parameters quand ils sont présents (GET)

```javascript
import Joi from 'joi';

export const createContactSchema = Joi.object({
  ...
});

export const updateContactSchema = Joi.object({
  ...
});
```

### 3. Création d'une classe d'erreur personnalisée (ValidationError)

Dans `utils/errors.js`:

```javascript
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### 4. Mise à jour du middleware de gestion d'erreurs

Dans `middlewares/error.middleware.js`:

```javascript
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'AuthError') {
    return res.status(401).json({
      error: 'Accès refusé',
      details: err.message
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Erreur de validation',
      details: err.message
    });
  }

  res.status(500).json({
    error: 'Erreur serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
};
```

### 4. Création d'un middleware de validation

- Valider les données entrantes
- Emettre les erreurs de validation

### Critères de validation pour la validation des inputs

- Les données sont correctement validées
- Les erreurs de validation sont transmises au middleware d'erreur
- Les messages d'erreur sont clairs et utiles

## 6. Code quality

- Mettez en place un linter avec ESLint
- Ecrivez quelques tests unitaires avec Jest
- Ecrivez quelques tests d'intégration avec Jest et Supertest

## 7. Déploiement

- Créez et configurez un compte Render
- Le projet doit être déployé lors de chaque `git push`
- La base de données est mise à jour manuellement
