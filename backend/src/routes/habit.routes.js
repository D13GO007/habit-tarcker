const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const HabitController = require('../controllers/habit.controller.js');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/user/:userId', auth, HabitController.getUserHabits);
router.get('/history/:userId', auth, HabitController.getHistory);
router.post('/', auth, [
  body('title').trim().notEmpty().withMessage('El título de la misión es requerido').isLength({ max: 255 }).withMessage('Título demasiado largo'),
  body('type').isIn(['Diaria', 'Semanal', 'Unica']).withMessage('Tipo inválido'),
  body('difficulty').isIn(['Fácil', 'Medio', 'Difícil']).withMessage('Dificultad inválida'),
], validate, HabitController.createHabit);
router.put('/:id/complete', auth, HabitController.completeHabit);
router.put('/:id', auth, HabitController.updateHabit);
router.delete('/:id', auth, HabitController.deleteHabit);
router.put('/:id/fail', auth, HabitController.failHabit);

module.exports = router;
