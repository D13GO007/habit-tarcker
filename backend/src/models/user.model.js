const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const UserModel = {
  async findAll() {
    const { rows } = await pool.query(
      'SELECT id, name, email, xp, level, hp, created_at FROM users ORDER BY id'
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT id, name, email, xp, level, hp, coins, character_data, inventory, equipped, hard_mode, gender, shield, missions_completed, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  },

  async create({ name, email, password, hard_mode = false, gender = 'male' }) {
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password, hard_mode, gender) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, xp, level, hp, hard_mode, gender, created_at',
      [name, email, hashed, hard_mode, gender]
    );
    return rows[0];
  },

  async update(id, { name, email }) {
    const { rows } = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, xp, level, hp, created_at',
      [name, email, id]
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = UserModel;
