const cron = require('node-cron');
const pool = require('./config/db');

function iniciarMotorDeTiempo() {
  // '0 0 * * *' significa: Ejecutar todos los días a las 00:00 (Medianoche)
  // Para hacer pruebas ahora mismo, podrías cambiarlo a '* * * * *' (cada minuto)
  cron.schedule('* * * * *', async () => {
    console.log('⏳ La medianoche ha llegado. Revisando misiones de los jugadores...');

    try {
      // 1. Encontrar quiénes NO hicieron sus misiones diarias
      const { rows: failedHabits } = await pool.query(`
        SELECT user_id FROM habits WHERE type = 'Diaria' AND completed = FALSE
      `);

      // 2. Castigar a los que fallaron (20 de daño por cada misión ignorada)
      for (let row of failedHabits) {
        await pool.query('UPDATE users SET hp = hp - 20 WHERE id = $1', [row.user_id]);
      }

      // 3. Sistema de Muerte (Si el HP bajó a 0 o menos durante el castigo nocturno)
      await pool.query(`
        UPDATE users SET hp = 100, xp = 0 WHERE hp <= 0
      `);

      // 4. Actualizar las Rachas (Streaks)
      // A) Romper la racha a 0 de los que fallaron
      await pool.query(`UPDATE habits SET streak = 0 WHERE type = 'Diaria' AND completed = FALSE`);
      
      // B) Sumar +1 a la racha de los que SÍ cumplieron
      await pool.query(`UPDATE habits SET streak = streak + 1 WHERE type = 'Diaria' AND completed = TRUE`);

      // 5. Reiniciar todas las tareas diarias para el nuevo día
      await pool.query(`UPDATE habits SET completed = FALSE WHERE type = 'Diaria'`);

      console.log('✅ Revisión de medianoche terminada. El mundo se ha reiniciado.');
    } catch (error) {
      console.error('❌ Error en el Motor de Tiempo:', error);
    }
  });
}

module.exports = iniciarMotorDeTiempo;
