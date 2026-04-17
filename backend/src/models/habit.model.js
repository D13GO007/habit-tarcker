const pool = require('../config/db');

const HabitModel = {
  // Obtener todas las misiones de un usuario
  async findAllByUser(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  // Crear una nueva misión (ACTUALIZADO PARA FASE 2)
  async create({ user_id, title, type, difficulty, target_time, target_days, deadline }) {
    const { rows } = await pool.query(
      `INSERT INTO habits 
      (user_id, title, type, difficulty, target_time, target_days, deadline) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        user_id, 
        title, 
        type, 
        difficulty, 
        target_time || 0, 
        target_days || 0, 
        deadline || null
      ]
    );
    return rows[0];
  },

  // Actualizar una misión existente (FASE 3)
  async update(id, { title, type, difficulty, target_time, target_days, deadline }) {
    const { rows } = await pool.query(
      `UPDATE habits 
       SET title = $1, type = $2, difficulty = $3, target_time = $4, target_days = $5, deadline = $6
       WHERE id = $7 RETURNING *`,
      [title, type, difficulty, target_time || 0, target_days || 0, deadline || null, id]
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
