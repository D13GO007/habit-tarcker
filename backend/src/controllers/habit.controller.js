const HabitModel = require('../models/habit.model.js');
const pool = require('../config/db');
const {
  HP_MAX, HP_HEAL, DAMAGE_NORMAL, DAMAGE_HARD,
  XP_BY_DIFF, XP_BY_DIFF_WEEKLY, XP_WEEKLY_PARTIAL,
  GOLD_BY_DIFF, GOLD_BY_DIFF_WEEKLY, GOLD_WEEKLY_PARTIAL,
  HABITS_PAGE_SIZE, ACHIEVEMENT_CHECKS,
} = require('../config/constants');

function calculateHabitRewards(habit) {
  if (habit.type === 'Semanal') {
    const newDays = habit.current_days + 1;
    if (newDays >= habit.target_days) {
      return {
        xpGained: XP_BY_DIFF_WEEKLY[habit.difficulty] || XP_BY_DIFF_WEEKLY['Fácil'],
        goldGained: GOLD_BY_DIFF_WEEKLY[habit.difficulty] || GOLD_BY_DIFF_WEEKLY['Fácil'],
        isFullyCompleted: true,
        newDays,
        message: null,
      };
    }
    return { xpGained: XP_WEEKLY_PARTIAL, goldGained: GOLD_WEEKLY_PARTIAL, isFullyCompleted: false, newDays, message: null };
  }
  return {
    xpGained: XP_BY_DIFF[habit.difficulty] || XP_BY_DIFF['Fácil'],
    goldGained: GOLD_BY_DIFF[habit.difficulty] || GOLD_BY_DIFF['Fácil'],
    isFullyCompleted: true,
    newDays: habit.current_days,
    message: null,
  };
}

async function checkAchievements(userId, level) {
  const [mRes, sRes] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM habit_history WHERE user_id = $1', [userId]),
    pool.query('SELECT COALESCE(MAX(streak), 0) AS ms FROM habits WHERE user_id = $1', [userId]),
  ]);
  const missions = parseInt(mRes.rows[0].count);
  const streak   = parseInt(sRes.rows[0].ms);
  const unlocked = [];
  for (const { key, test } of ACHIEVEMENT_CHECKS) {
    if (!test(missions, streak, level)) continue;
    const r = await pool.query(
      'INSERT INTO achievements (user_id, key) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING key',
      [userId, key]
    );
    if (r.rows.length) unlocked.push(key);
  }
  return unlocked;
}

const HabitController = {
  async getUserHabits(req, res) {
    try {
      const { userId } = req.params;
      const habits = await HabitModel.findAllByUser(userId, HABITS_PAGE_SIZE);
      res.json(habits);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener hábitos: ' + err.message });
    }
  },

  async createHabit(req, res) {
    try {
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
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const userId = req.userId;

      await client.query('BEGIN');

      const habitResult = await client.query('SELECT * FROM habits WHERE id = $1 FOR UPDATE', [id]);
      const habit = habitResult.rows[0];
      if (!habit) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'Hábito no encontrado' });
      }

      if (habit.completed) {
        await client.query('ROLLBACK');
        return res.status(409).json({ message: 'Esta misión ya fue completada hoy' });
      }

      const userResult = await client.query('SELECT xp, level, hp, coins FROM users WHERE id = $1 FOR UPDATE', [userId]);
      if (!userResult.rows.length) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'Jugador no encontrado' });
      }
      let { xp, level, hp, coins } = userResult.rows[0];

      let xpGained = 0;
      let goldGained = 0;
      let isFullyCompleted = false;
      let message = '';

      const rewards = calculateHabitRewards(habit);
      ({ xpGained, goldGained, isFullyCompleted } = rewards);

      if (habit.type === 'Semanal') {
        message = isFullyCompleted
          ? `¡Semana completada! Ganaste ${xpGained} XP y ${goldGained} Oro.`
          : `Progreso guardado: ${rewards.newDays}/${habit.target_days} días. (+${xpGained} XP)`;
        await client.query('UPDATE habits SET current_days = $1, completed = $2 WHERE id = $3', [rewards.newDays, isFullyCompleted, id]);
      } else {
        message = `¡Gesta cumplida! Ganaste ${xpGained} XP y ${goldGained} Oro.`;
        await client.query('UPDATE habits SET completed = TRUE WHERE id = $1', [id]);
      }

      xp += xpGained;
      coins += goldGained;
      hp = Math.min(hp + HP_HEAL, HP_MAX);

      const xpNeeded = level * 100;
      let leveledUp = false;
      if (xp >= xpNeeded) {
        level += 1;
        xp = xp - xpNeeded;
        hp = 100;
        leveledUp = true;
        message = `¡NUEVO NIVEL ALCANZADO! Ahora eres Nivel ${level}.`;
      }

      const updatedUser = await client.query(
        'UPDATE users SET xp = $1, level = $2, hp = $3, coins = $4 WHERE id = $5 RETURNING id, xp, level, hp, coins',
        [xp, level, hp, coins, userId]
      );

      await client.query(
        'INSERT INTO habit_history (user_id, title, type, difficulty, category) VALUES ($1, $2, $3, $4, $5)',
        [userId, habit.title, habit.type, habit.difficulty, habit.category || 'General']
      );
      await client.query(
        'UPDATE users SET missions_completed = missions_completed + 1 WHERE id = $1',
        [userId]
      );

      await client.query('COMMIT');

      const newAchievements = await checkAchievements(userId, level);
      res.json({ success: true, stats: updatedUser.rows[0], message, leveledUp, newAchievements });

    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ message: 'Error al completar: ' + err.message });
    } finally {
      client.release();
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

  async getHistory(req, res) {
    try {
      const { rows } = await pool.query(
        'SELECT title, type, difficulty, category, completed_at FROM habit_history WHERE user_id = $1 ORDER BY completed_at DESC LIMIT 50',
        [req.params.userId]
      );
      res.json({ success: true, data: rows });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async failHabit(req, res) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const userId = req.userId;

      await client.query('BEGIN');

      const userResult = await client.query('SELECT xp, level, hp, hard_mode FROM users WHERE id = $1 FOR UPDATE', [userId]);
      if (!userResult.rows.length) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'Jugador no encontrado' });
      }

      let { xp, level, hp, hard_mode } = userResult.rows[0];
      const damage = hard_mode ? DAMAGE_HARD : DAMAGE_NORMAL;
      hp -= damage;
      let message = `¡Has recibido ${damage} de daño!`;
      let died = false;

      if (hp <= 0) {
        hp = 100;
        xp = 0;
        if (hard_mode && level > 1) level -= 1;
        died = true;
        message = hard_mode
          ? '¡HAS MUERTO! Perdiste nivel y toda tu experiencia.'
          : '¡HAS MUERTO! Has perdido toda tu experiencia de este nivel.';
      }

      const updatedUser = await client.query(
        'UPDATE users SET xp = $1, hp = $2, level = $3 WHERE id = $4 RETURNING id, xp, level, hp',
        [xp, hp, level, userId]
      );

      await client.query('COMMIT');
      res.json({ success: true, stats: updatedUser.rows[0], message, died });

    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ message: 'Error al procesar el fallo: ' + err.message });
    } finally {
      client.release();
    }
  }
};

module.exports = HabitController;
