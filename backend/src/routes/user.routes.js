const { Router } = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const UserController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const validate = require('../middleware/validate');

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Demasiados intentos de login. Intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerRules = [
  body('name').trim().notEmpty().withMessage('El nombre es requerido').isLength({ max: 100 }).withMessage('Nombre demasiado largo'),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const loginRules = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
];

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           example: juan@example.com
 *         created_at:
 *           type: string
 *           format: date-time
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           example: juan@example.com
 *         password:
 *           type: string
 *           example: secreto123
 *     UserUpdate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: Juan Actualizado
 *         email:
 *           type: string
 *           example: juan2@example.com
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/', auth, requireAdmin, UserController.getAll);

router.post('/login', loginLimiter, loginRules, validate, UserController.login);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', auth, UserController.getById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Email ya registrado
 */
router.post('/', registerRules, validate, UserController.create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', auth, [
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
], validate, UserController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', auth, requireAdmin, UserController.remove);

router.post('/:id/buy', auth, UserController.buyReward);
router.post('/:id/cheat-gold', auth, UserController.cheatAddGold);
router.put('/:id/character-state', auth, UserController.saveCharacterState);
router.post('/:id/use-potion', auth, UserController.usePotion);
router.get('/:id/achievements', auth, UserController.getAchievements);

module.exports = router;
