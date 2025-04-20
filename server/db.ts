import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

// Create the database connection
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

// Log successful connection
console.log("Database connection established");