import { Client } from 'pg';

const pgClient = new Client(
  'postgresql://neondb_owner:npg_2tkdnLKPFT6o@ep-winter-brook-a5yn451z-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
);

async function main() {
  await pgClient.connect();
  const result = await pgClient.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`);
  console.log(result);
}

main();
