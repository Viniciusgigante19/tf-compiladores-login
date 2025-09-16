import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(155),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NULL,
        photo VARCHAR(255) NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE users;`);
}

export default { up, down };