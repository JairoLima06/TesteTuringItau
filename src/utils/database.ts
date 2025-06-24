import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../database.json');

export function getDatabase() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

export function saveDatabase(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
