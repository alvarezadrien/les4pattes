import express from 'express';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swagger.config.js';
import { limiter } from './rate-limit.config.js';
import cors from './cors.config.js';
import headers from './headers.config.js';
import hpp from 'hpp';

import { contactRouter } from '../../resources/contact/contact.routes.js';
import { authRouter } from '../../auth/auth.routes.js';  // auth routes modifiées ici
import { userRouter } from '../../resources/user/user.routes.js';
import { animalRouter } from '../../resources/animals/animals.routes.js';

import ErrorCatcher from '../middlewares/errors.middleware.js';
import Logger from './logger.config.js';

const app = express();

app.use(headers);
app.use(cors);
app.use(hpp());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Logger.writeStream());

app.use(express.static('public'));

app.use(compression());

// Auth routes sur /connexion au lieu de /api/auth
app.use('/api/connexion', authRouter);

app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/animals', animalRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(ErrorCatcher);

export default app;
