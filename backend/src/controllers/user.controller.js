const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

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
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'name, email y password son requeridos' });
      }

      const existing = await UserModel.findByEmail(email);
      if (existing) {
        return res.status(409).json({ success: false, message: 'El email ya está registrado' });
      }

      const user = await UserModel.create({ name, email, password });
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
        return res.status(401).json({ message: 'El correo no está registrado' });
      }

      // Comparamos la contraseña que llega (plana) con la de la BD (hasheada)
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Si todo está bien, devolvemos éxito
      res.json({ 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email } 
      });
    } catch (err) {
      res.status(500).json({ message: 'Error en el servidor: ' + err.message });
    }
  },

  async update(req, res) {
    try {
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
