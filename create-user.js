import postgres from 'postgres';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64));
  return `${buf.toString("hex")}.${salt}`;
}

async function createUser() {
  try {
    const client = postgres(process.env.DATABASE_URL);
    
    const hashedPassword = await hashPassword('password');
    console.log('Hashed password:', hashedPassword);
    
    // Insert test user
    const users = await client`
      INSERT INTO users (username, email, name, password, profile_image)
      VALUES (
        'demo.user', 
        'demo.user@example.com', 
        'Demo User', 
        ${hashedPassword}, 
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80'
      )
      ON CONFLICT (username) 
      DO UPDATE SET password = ${hashedPassword}
      RETURNING *
    `;
    
    console.log('User created:', users[0]);
    
    await client.end();
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();