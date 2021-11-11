import { createConnection } from 'typeorm';

export default async function create(
  subCategorie1Id: string,
  subCategorie2Id: string,
  categorieId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO SUB_CATEGORIES(id, name, description, category_id)
      values ('${subCategorie1Id}', 'Com carne', 'Descrição de teste 1', '${categorieId}');
  `);

  await connection.query(`
      INSERT INTO SUB_CATEGORIES(id, name, description, category_id)
      values ('${subCategorie2Id}','Vegano', 'Descrição de teste 2', '${categorieId}');
  `);

  await connection.close();

  console.log('Sub Categories created!');
}
