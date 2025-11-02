// Carga las variables del archivo .env inmediatamente
import * as dotenv from 'dotenv';
dotenv.config();

// Luego, importa y define tu configuración
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  // Ahora, env("DATABASE_URL") debería funcionar porque dotenv.config() ya lo cargó.
  datasource: {
    url: env("DATABASE_URL"), 
  },
});