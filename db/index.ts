import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

console.log('DEBUG: ', { "DATABASE_URL": process.env.DATABASE_URL })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const client = neon(process.env.DATABASE_URL);

export const db = drizzle(client, { schema, casing: 'snake_case' });
