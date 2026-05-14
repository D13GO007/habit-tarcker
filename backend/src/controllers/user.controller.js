const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { POTIONS } = require('../config/constants');

const signToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name, email, password, hard_mode = false, gender = 'male' } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'name, email y password son requeridos' });
      }

      const existing = await UserModel.findByEmail(email);
      if (existing) {
        return res.status(409).json({ success: false, message: 'El email ya está registrado' });
      }

      const user = await UserModel.create({ name, email, password, hard_mode, gender });
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);

      if (!user) {
        return res.status(401).json({ success: false, message: 'El correo no está registrado' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }

      const token = signToken(user.id, user.role || 'user');
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          xp: user.xp,
          level: user.level,
          hp: user.hp,
          coins: user.coins,
          hard_mode: user.hard_mode || false,
          gender: user.gender || 'male',
          shield: user.shield || false,
          missions_completed: user.missions_completed || 0,
          character_data: user.character_data || {},
          inventory: user.inventory || [],
          equipped: user.equipped || [],
          role: user.role || 'user'
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error en el servidor: ' + err.message });
    }
  },

  async saveCharacterState(req, res) {
    try {
      const { id } = req.params;
      const { character_data, inventory, equipped } = req.body;

      const result = await pool.query(
        `UPDATE users
         SET character_data = $1, inventory = $2, equipped = $3
         WHERE id = $4
         RETURNING id`,
        [
          JSON.stringify(character_data || {}),
          JSON.stringify(inventory || []),
          JSON.stringify(equipped || []),
          id
        ]
      );

      if (!result.rows.length) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      if (req.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ success: false, message: 'Prohibido: no puedes modificar otro usuario' });
      }
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'name y email son requeridos' });
      }

      const user = await UserModel.update(req.params.id, { name, email });
      if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const user = await UserModel.delete(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      res.json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async cheatAddGold(req, res) {
    try {
      if (req.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ success: false, message: 'Prohibido' });
      }
      const { amount = 1000 } = req.body
      const result = await pool.query(
        'UPDATE users SET coins = coins + $1 WHERE id = $2 RETURNING coins',
        [amount, req.params.id]
      )
      if (!result.rows.length) return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      res.json({ success: true, coins: result.rows[0].coins })
    } catch (err) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async getAchievements(req, res) {
    try {
      const { rows } = await pool.query(
        'SELECT key, unlocked_at FROM achievements WHERE user_id = $1 ORDER BY unlocked_at ASC',
        [req.params.id]
      );
      res.json({ success: true, data: rows });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async usePotion(req, res) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const { type } = req.body;
      if (!POTIONS[type]) return res.status(400).json({ success: false, message: 'Tipo de poción inválido' });

      await client.query('BEGIN');
      const r = await client.query('SELECT coins, hp, shield FROM users WHERE id = $1 FOR UPDATE', [id]);
      if (!r.rows.length) { await client.query('ROLLBACK'); return res.status(404).json({ success: false, message: 'Jugador no encontrado' }); }

      const { coins, hp, shield } = r.rows[0];
      const { cost } = POTIONS[type];
      if (coins < cost) { await client.query('ROLLBACK'); return res.status(400).json({ success: false, message: `Oro insuficiente — necesitas ${cost}`, coins }); }
      if (type === 'shield' && shield) { await client.query('ROLLBACK'); return res.status(400).json({ success: false, message: 'Ya tienes un escudo activo' }); }

      let updated;
      if (type === 'life') {
        updated = await client.query(
          'UPDATE users SET coins = coins - $1, hp = LEAST(hp + 30, 100) WHERE id = $2 RETURNING id, coins, hp, shield',
          [cost, id]
        );
      } else {
        updated = await client.query(
          'UPDATE users SET coins = coins - $1, shield = TRUE WHERE id = $2 RETURNING id, coins, hp, shield',
          [cost, id]
        );
      }
      await client.query('COMMIT');
      res.json({ success: true, ...updated.rows[0], message: `¡${POTIONS[type].name} usada!` });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ success: false, message: err.message });
    } finally {
      client.release();
    }
  },

  async buyReward(req, res) {
    try {
      const { id } = req.params          // userId
      const { cost } = req.body          // costo del item

      if (!cost || cost <= 0) {
        return res.status(400).json({ success: false, message: 'Costo inválido' })
      }

      // Verificar monedas actuales en BD (fuente de verdad)
      const userResult = await pool.query(
        'SELECT coins FROM users WHERE id = $1',
        [id]
      )
      if (userResult.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Jugador no encontrado' })
      }

      const currentCoins = userResult.rows[0].coins

      if (currentCoins < cost) {
        return res.status(400).json({
          success: false,
          message: `Oro insuficiente. Tienes ${currentCoins} y necesitas ${cost}.`,
          coins: currentCoins
        })
      }

      // Descontar en BD
      const updated = await pool.query(
        'UPDATE users SET coins = coins - $1 WHERE id = $2 RETURNING id, coins',
        [cost, id]
      )

      return res.json({
        success: true,
        coins: updated.rows[0].coins,
        message: '¡Recompensa obtenida!'
      })
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al procesar compra: ' + err.message })
    }
  },
};

module.exports = UserController;
