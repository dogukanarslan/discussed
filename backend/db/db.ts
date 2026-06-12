import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export const database = new DatabaseSync(`${process.env.DB}`);


const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
database.exec(schema);
