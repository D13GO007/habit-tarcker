const express = require('express');
const router = express.Router();
const HabitController = require('../controllers/habit.controller.js');

// Obtener todas las misiones de un usuario (ej. /api/habits/user/1)
router.get('/user/:userId', HabitController.getUserHabits);

// Crear nueva misión
router.post('/', HabitController.createHabit);

// Completar misión
router.put('/:id/complete', HabitController.completeHabit);

// Actualizar misión
router.put('/:id', HabitController.updateHabit);

// Abandonar misión (Eliminar)
router.delete('/:id', HabitController.deleteHabit);

// Fallar misión (Recibir daño)
router.put('/:id/fail', HabitController.failHabit);

module.exports = router;
