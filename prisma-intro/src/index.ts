import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  age: number,
  city: string
) {
  await client.user.create({
    data: {
      username,
      password,
      age,
      city,
    },
  });
}

insertUser('akshit', '123123', 21, 'hyd');
