import pg from 'pg';

export const pool = new pg.Pool ({
  user: "postgres",
  host: "localhost",
  database: "bank_db",
  password: "100763221",
  port: 5432,
});

