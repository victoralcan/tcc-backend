import { createConnection } from 'typeorm';

export default async function create(
  categorieId: string,
  categorieId2: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO CATEGORIES(id, name, description)
      values ('${categorieId}', 'Comida', 'De comer');
  `);

  await connection.query(`
      INSERT INTO CATEGORIES(id, name, description)
      values ('${categorieId2}','Bebida', 'De beber');
  `);

  await connection.close();

  console.log('Categories created!');
}
