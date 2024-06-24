import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgress from 'postgres';

const client = postgress(process.env.DATABASE_URL as string);
export const db = drizzle(client, {schema, logger: true}) ;