const pool = require('./db');

const schema = [
  {
    table: 'users',
    create: `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        hp INTEGER DEFAULT 100,
        coins INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
    columns: [
      { name: 'name',               def: 'VARCHAR(100) NOT NULL' },
      { name: 'email',              def: 'VARCHAR(150)' },
      { name: 'password',           def: 'VARCHAR(255) NOT NULL' },
      { name: 'xp',                 def: 'INTEGER DEFAULT 0' },
      { name: 'level',              def: 'INTEGER DEFAULT 1' },
      { name: 'hp',                 def: 'INTEGER DEFAULT 100' },
      { name: 'coins',              def: 'INTEGER DEFAULT 0' },
      { name: 'character_data',     def: "JSONB DEFAULT '{}'" },
      { name: 'inventory',          def: "JSONB DEFAULT '[]'" },
      { name: 'equipped',           def: "JSONB DEFAULT '[]'" },
      { name: 'hard_mode',          def: 'BOOLEAN DEFAULT FALSE' },
      { name: 'gender',             def: "VARCHAR(10) DEFAULT 'male'" },
      { name: 'shield',             def: 'BOOLEAN DEFAULT FALSE' },
      { name: 'missions_completed', def: 'INTEGER DEFAULT 0' },
      { name: 'role',               def: "VARCHAR(20) DEFAULT 'user'" },
      { name: 'created_at',         def: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
    ],
  },
  {
    table: 'habits',
    create: `
      CREATE TABLE IF NOT EXISTS habits (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        difficulty VARCHAR(50) NOT NULL,
        target_time INTEGER DEFAULT 0,
        target_days INTEGER DEFAULT 0,
        current_days INTEGER DEFAULT 0,
        deadline TIMESTAMP,
        completed BOOLEAN DEFAULT FALSE,
        streak INTEGER DEFAULT 0,
        category VARCHAR(50) DEFAULT 'General',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
    columns: [
      { name: 'user_id',      def: 'INTEGER REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'title',        def: 'VARCHAR(255) NOT NULL' },
      { name: 'type',         def: 'VARCHAR(50) NOT NULL' },
      { name: 'difficulty',   def: 'VARCHAR(50) NOT NULL' },
      { name: 'target_time',  def: 'INTEGER DEFAULT 0' },
      { name: 'target_days',  def: 'INTEGER DEFAULT 0' },
      { name: 'current_days', def: 'INTEGER DEFAULT 0' },
      { name: 'deadline',     def: 'TIMESTAMP' },
      { name: 'completed',    def: 'BOOLEAN DEFAULT FALSE' },
      { name: 'streak',       def: 'INTEGER DEFAULT 0' },
      { name: 'category',     def: "VARCHAR(50) DEFAULT 'General'" },
      { name: 'created_at',   def: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
    ],
  },
  {
    table: 'habit_history',
    create: `
      CREATE TABLE IF NOT EXISTS habit_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255),
        type VARCHAR(50),
        difficulty VARCHAR(50),
        category VARCHAR(50) DEFAULT 'General',
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
    columns: [],
  },
  {
    table: 'achievements',
    create: `
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        key VARCHAR(50) NOT NULL,
        unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, key)
      )
    `,
    columns: [],
  },
];

const INDEXES = [
  'CREATE INDEX IF NOT EXISTS idx_habits_user_id        ON habits(user_id)',
  'CREATE INDEX IF NOT EXISTS idx_habits_type_completed ON habits(type, completed)',
  'CREATE INDEX IF NOT EXISTS idx_history_user_id       ON habit_history(user_id)',
  'CREATE INDEX IF NOT EXISTS idx_history_completed_at  ON habit_history(completed_at DESC)',
  'CREATE INDEX IF NOT EXISTS idx_achievements_user_id  ON achievements(user_id)',
];

async function runMigrations() {
  for (const entry of schema) {
    await pool.query(entry.create);

    const { rows } = await pool.query(
      'SELECT column_name FROM information_schema.columns WHERE table_name = $1',
      [entry.table]
    );
    const existing = rows.map((r) => r.column_name);

    for (const col of entry.columns) {
      if (!existing.includes(col.name)) {
        await pool.query(`ALTER TABLE ${entry.table} ADD COLUMN IF NOT EXISTS ${col.name} ${col.def}`);
        console.log(`Columna añadida: ${entry.table}.${col.name}`);
      }
    }

    console.log(`Tabla lista: ${entry.table}`);
  }

  for (const idx of INDEXES) {
    await pool.query(idx);
  }
  console.log('Índices listos.');
}

module.exports = runMigrations;
