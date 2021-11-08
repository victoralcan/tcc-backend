import { createConnection } from 'typeorm';

export default async function create(
  categorieId: string,
  categorieId2: string,

  
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO CATEGORIES(id, name, description)
      values ('${categorieId}', 'Categoria1', 'Descrição de teste 1');
  `);

  await connection.query(`
      INSERT INTO CATEGORIES(id, name, description)
      values ('${categorieId2}','Categora2', 'Descrição de teste 2');
  `);

  await connection.close();

  console.log('Categories created!');
}
