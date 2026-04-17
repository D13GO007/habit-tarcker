const HabitModel = require('../models/habit.model.js');
const pool = require('../config/db'); // Necesitamos la BD para actualizar al usuario

const HabitController = {
  async getUserHabits(req, res) {
    try {
      const { userId } = req.params;
      const habits = await HabitModel.findAllByUser(userId);
      res.json(habits);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener hábitos: ' + err.message });
    }
  },

  async createHabit(req, res) {
    try {
      // Extraemos los nuevos campos del body
      const { user_id, title, type, difficulty, target_time, target_days, deadline } = req.body;
      const newHabit = await HabitModel.create({ 
        user_id, title, type, difficulty, target_time, target_days, deadline 
      });
      res.status(201).json(newHabit);
    } catch (err) {
      res.status(500).json({ message: 'Error al crear hábito: ' + err.message });
    }
  },

  async updateHabit(req, res) {
    try {
      const { id } = req.params;
      const updated = await HabitModel.update(id, req.body);
      if (!updated) return res.status(404).json({ message: 'Misión no encontrada' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar: ' + err.message });
    }
  },

  async completeHabit(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      // 1. Obtener la misión primero para saber de qué tipo es
      const habitResult = await pool.query('SELECT * FROM habits WHERE id = $1', [id]);
      const habit = habitResult.rows[0];
      if (!habit) return res.status(404).json({ message: 'Hábito no encontrado' });

      // 2. Obtener estadísticas del usuario
      const userResult = await pool.query('SELECT xp, level, hp, coins FROM users WHERE id = $1', [userId]);
      let { xp, level, hp, coins } = userResult.rows[0];

      let xpGained = 0;
      let goldGained = 0;
      let isFullyCompleted = false;
      let message = '';

      // --- LÓGICA DE PROGRESO SEGÚN TIPO ---
      if (habit.type === 'Semanal') {
        habit.current_days += 1; // Sumamos un día de progreso
        
        if (habit.current_days >= habit.target_days) {
          isFullyCompleted = true; // Terminó la semana
          xpGained = habit.difficulty === 'Difícil' ? 100 : (habit.difficulty === 'Medio' ? 60 : 30);
          goldGained = habit.difficulty === 'Difícil' ? 150 : (habit.difficulty === 'Medio' ? 80 : 40);
          message = `¡Semana completada! Ganaste ${xpGained} XP y ${goldGained} Oro.`;
        } else {
          // Recompensa parcial por el día
          xpGained = 10;
          goldGained = 5;
          message = `Progreso guardado: ${habit.current_days}/${habit.target_days} días. (+${xpGained} XP)`;
        }
        
        await pool.query('UPDATE habits SET current_days = $1, completed = $2 WHERE id = $3', [habit.current_days, isFullyCompleted, id]);

      } else {
        // Diarias y Únicas se completan de un solo golpe
        isFullyCompleted = true;
        xpGained = habit.difficulty === 'Difícil' ? 50 : (habit.difficulty === 'Medio' ? 30 : 10);
        goldGained = habit.difficulty === 'Difícil' ? 100 : (habit.difficulty === 'Medio' ? 50 : 10);
        message = `¡Gesta cumplida! Ganaste ${xpGained} XP y ${goldGained} Oro.`;
        await HabitModel.complete(id);
      }

      // 3. Aplicar experiencia y curación
      xp += xpGained;
      coins += goldGained;
      hp += 5; 
      if (hp > 100) hp = 100;

      const xpNeeded = level * 100;
      let leveledUp = false;
      if (xp >= xpNeeded) {
        level += 1;
        xp = xp - xpNeeded;
        hp = 100;
        leveledUp = true;
        message = `¡NUEVO NIVEL ALCANZADO! Ahora eres Nivel ${level}.`;
      }

      const updatedUser = await pool.query(
        'UPDATE users SET xp = $1, level = $2, hp = $3, coins = $4 WHERE id = $5 RETURNING id, xp, level, hp, coins',
        [xp, level, hp, coins, userId]
      );

      res.json({ success: true, stats: updatedUser.rows[0], message, leveledUp });

    } catch (err) {
      res.status(500).json({ message: 'Error al completar: ' + err.message });
    }
  },

  async deleteHabit(req, res) {
    try {
      const { id } = req.params;
      const deleted = await HabitModel.delete(id);
      if (!deleted) return res.status(404).json({ message: 'Misión no encontrada' });
      res.json({ success: true, message: 'Misión abandonada' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar misión: ' + err.message });
    }
  },

  async failHabit(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      // Obtener las estadísticas actuales del jugador
      const userResult = await pool.query('SELECT xp, level, hp FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length === 0) return res.status(404).json({ message: 'Jugador no encontrado' });
      
      let { xp, level, hp } = userResult.rows[0];
      
      // Castigo de daño: perder 20 HP por fallar
      let damage = 20;
      hp -= damage;
      let message = `¡Has recibido ${damage} de daño!`;
      let died = false;

      // Mecánica de muerte (Estilo RPG)
      if (hp <= 0) {
        hp = 100; // Revives
        xp = 0;   // Pierdes tus "almas/experiencia" actual
        died = true;
        message = '¡HAS MUERTO! Has perdido toda tu experiencia de este nivel.';
      }

      // Guardar las nuevas estadísticas
      const updatedUser = await pool.query(
        'UPDATE users SET xp = $1, hp = $2 WHERE id = $3 RETURNING id, xp, level, hp',
        [xp, hp, userId]
      );

      res.json({ 
        success: true, 
        stats: updatedUser.rows[0],
        message,
        died
      });

    } catch (err) {
      res.status(500).json({ message: 'Error al procesar el fallo: ' + err.message });
    }
  }
};

module.exports = HabitController;
