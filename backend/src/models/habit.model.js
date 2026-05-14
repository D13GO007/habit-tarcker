const pool = require('../config/db');

const HabitModel = {
  // Obtener todas las misiones de un usuario
  async findAllByUser(userId, limit = 200) {
    const { rows } = await pool.query(
      `SELECT * FROM habits WHERE user_id = $1
       ORDER BY completed ASC, created_at DESC
       LIMIT $2`,
      [userId, limit]
    );
    return rows;
  },

  async create({ user_id, title, type, difficulty, target_time, target_days, deadline, category }) {
    const { rows } = await pool.query(
      `INSERT INTO habits (user_id, title, type, difficulty, target_time, target_days, deadline, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [user_id, title, type, difficulty, target_time || 0, target_days || 0, deadline || null, category || 'General']
    );
    return rows[0];
  },

  async update(id, { title, type, difficulty, target_time, target_days, deadline, category }) {
    const { rows } = await pool.query(
      `UPDATE habits
       SET title = $1, type = $2, difficulty = $3, target_time = $4, target_days = $5, deadline = $6, category = $7
       WHERE id = $8 RETURNING *`,
      [title, type, difficulty, target_time || 0, target_days || 0, deadline || null, category || 'General', id]
    );
    return rows[0];
  },

  // Marcar una misión como completada
  async complete(id) {
    const { rows } = await pool.query(
      'UPDATE habits SET completed = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0] || null;
  },

  // Eliminar una misión (Abandonar la misión)
  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM habits WHERE id = $1 RETURNING id',
      [id]
    );
    return rows[0] || null;
  }
};

module.exports = HabitModel;
