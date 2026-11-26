import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function setup() {
  console.log(
    `Conectando ao MySQL em ${process.env.DB_HOST}:${process.env.DB_PORT} com usuário ${process.env.DB_USER}...`,
  );

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD ?? "",
    multipleStatements: true,
  });

  console.log("1/2 Criando banco e tabelas (schema.sql)...");
  const schemaSql = fs.readFileSync(path.resolve(__dirname, "schema.sql"), "utf8");
  await connection.query(schemaSql);

  console.log("2/2 Inserindo dados iniciais e usuário de teste (seed.sql)...");
  const seedSql = fs.readFileSync(path.resolve(__dirname, "seed.sql"), "utf8");
  await connection.query(seedSql);

  await connection.end();
  console.log('✅ Sucesso! Banco de dados "conectadoa" configurado e populado com sucesso.');
}

setup().catch((err) => {
  console.error("❌ Erro ao configurar o banco:", err.message);
  process.exit(1);
});
