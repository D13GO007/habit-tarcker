const cron = require('node-cron');
const pool = require('./config/db');
const { DAMAGE_NORMAL, DAMAGE_HARD, HP_MAX } = require('./config/constants');

function iniciarMotorDeTiempo() {
  // '0 0 * * *' significa: Ejecutar todos los días a las 00:00 (Medianoche)
  // Para hacer pruebas ahora mismo, podrías cambiarlo a '* * * * *' (cada minuto)
  cron.schedule('0 0 * * *', async () => {
    console.log('⏳ La medianoche ha llegado. Revisando misiones de los jugadores...');

    try {
      // 1. Encontrar quiénes NO hicieron sus misiones diarias
      const { rows: failedHabits } = await pool.query(`
        SELECT user_id FROM habits WHERE type = 'Diaria' AND completed = FALSE
      `);

      // 2. Castigar a los que fallaron — el escudo absorbe el primer golpe
      for (let row of failedHabits) {
        const shieldRes = await pool.query('SELECT shield FROM users WHERE id = $1', [row.user_id]);
        if (shieldRes.rows[0]?.shield) {
          await pool.query('UPDATE users SET shield = FALSE WHERE id = $1', [row.user_id]);
        } else {
          const hmRes = await pool.query('SELECT hard_mode FROM users WHERE id = $1', [row.user_id]);
          const dmg = hmRes.rows[0]?.hard_mode ? DAMAGE_HARD : DAMAGE_NORMAL;
          await pool.query('UPDATE users SET hp = hp - $1 WHERE id = $2', [dmg, row.user_id]);
        }
      }

      // 3. Sistema de Muerte (Si el HP bajó a 0 o menos durante el castigo nocturno)
      await pool.query(`UPDATE users SET hp = ${HP_MAX}, xp = 0 WHERE hp <= 0`);

      // 4. Actualizar las Rachas (Streaks)
      // A) Romper la racha a 0 de los que fallaron
      await pool.query(`UPDATE habits SET streak = 0 WHERE type = 'Diaria' AND completed = FALSE`);
      
      // B) Sumar +1 a la racha de los que SÍ cumplieron
      await pool.query(`UPDATE habits SET streak = streak + 1 WHERE type = 'Diaria' AND completed = TRUE`);

      // 5. Reiniciar todas las tareas diarias para el nuevo día
      await pool.query(`UPDATE habits SET completed = FALSE WHERE type = 'Diaria'`);

      // 6. Reiniciar hábitos semanales cada lunes (día 1)
      const day = new Date().getDay();
      if (day === 1) {
        await pool.query(`UPDATE habits SET completed = FALSE, current_days = 0 WHERE type = 'Semanal'`);
        console.log('📅 Lunes: hábitos semanales reiniciados.');
      }

      console.log('✅ Revisión de medianoche terminada. El mundo se ha reiniciado.');
    } catch (error) {
      console.error('❌ Error en el Motor de Tiempo:', error);
    }
  });
}

module.exports = iniciarMotorDeTiempo;
