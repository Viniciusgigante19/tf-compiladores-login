import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        id_user INTEGER,
        title VARCHAR(155),
        is_checked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT chave_estrangeira_user_todo
            FOREIGN KEY (id_user)
            REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE todos;`);
}

export default { up, down };