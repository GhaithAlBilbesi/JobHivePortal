import * as schema from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create a postgres connection
const queryClient = postgres(process.env.DATABASE_URL);

// Create a Drizzle instance using the postgres client
export const db = drizzle(queryClient, { schema });