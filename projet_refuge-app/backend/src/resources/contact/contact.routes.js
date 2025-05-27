import { Router } from 'express';

import upload from '../../api/config/multer.config.js';
import { authenticate } from '../../auth/auth.middleware.js';
import { validate } from '../../api/middlewares/validation.middleware.js';

import { createContact, getContacts, getContactById, updateContact, deleteContact } from './contact.controller.js';
import { createContactSchema, updateContactSchema, deleteContactSchema, filterContactSchema } from './contact.schema.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API endpoints for managing contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     operationId: getContacts
 *     summary: Get all contacts
 *     description: Retrieve a list of contacts with optional filtering and pagination
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of contacts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       500:
 *         description: Internal server error
 *   post:
 *     operationId: createContact
 *     summary: Create a new contact
 *     description: Create a new contact in the system
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The contact's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The contact's email
 *               phone:
 *                 type: string
 *                 description: The contact's phone number
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The contact's avatar image
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */
router
  .route('/')
  .get(
    authenticate,
    validate(filterContactSchema),
    getContacts
  )
  .post(
    authenticate,
    upload.single('avatar'),
    validate(createContactSchema),
    createContact
  );

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     operationId: getContactById
 *     summary: Get a contact by ID
 *     description: Retrieve a specific contact by its ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 *   put:
 *     operationId: updateContact
 *     summary: Update a contact
 *     description: Update an existing contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The contact's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The contact's email
 *               phone:
 *                 type: string
 *                 description: The contact's phone number
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The contact's avatar image
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     operationId: deleteContact
 *     summary: Delete a contact
 *     description: Delete an existing contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router
  .route('/:id')
  .get(
    authenticate,
    getContactById
  )
  .put(
    authenticate,
    upload.single('avatar'),
    validate(updateContactSchema),
    updateContact
  )
  .delete(
    authenticate,
    validate(deleteContactSchema),
    deleteContact
  );

export { router as contactRouter };
