import postgres from 'postgres';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the schema file
const schemaFilePath = path.join(__dirname, 'schema.sql');

// Run the schema SQL
async function initializeDatabase() {
  console.log('Initializing database schema...');
  
  try {
    // Read the SQL file
    const sql = fs.readFileSync(schemaFilePath, 'utf8');
    
    // Connect to the database
    const client = postgres(process.env.DATABASE_URL);
    
    // Execute the SQL
    await client`${sql}`;
    
    console.log('Schema initialized successfully');
    
    // Close the connection
    await client.end();
  } catch (error) {
    console.error('Error initializing database:', error.message);
  }
}

initializeDatabase();