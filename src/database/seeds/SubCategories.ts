import { createConnection } from 'typeorm';

export default async function create(
  subCategorie1Id: string,
  subCategorie2Id: string,
  categorieId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO SUB_CATEGORIES(id, name, description, category_id)
      values ('${subCategorie1Id}', 'Normal', 'Alimento pode conter carne', '${categorieId}');
  `);

  await connection.query(`
      INSERT INTO SUB_CATEGORIES(id, name, description, category_id)
      values ('${subCategorie2Id}','Vegano', 'Alimento livre de carne', '${categorieId}');
  `);

  await connection.close();

  console.log('Sub Categories created!');
}
