import { genSalt, hash } from 'bcryptjs';

async function generatePassword(password: string) {
  const salt = await genSalt(10);

  const passwordHash = await hash(password, salt);

  console.log(passwordHash);
}

generatePassword('waiter');
