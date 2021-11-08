import { createConnection } from 'typeorm';

export default async function create(
    item1Id: string,
    item2Id: string,
    subCategorieId: string,


  
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO ITEMS(id, name, description, sub_category_id, value)
      values ('${item1Id}', 'Item 1', 'Descrição de teste 1', '${subCategorieId}', 10.80);
  `);

  await connection.query(`
      INSERT INTO ITEMS(id, name, description, sub_category_id, value)
      values ('${item2Id}','Item 2', 'Descrição de teste 2', '${subCategorieId}', 25.80);
  `);

  await connection.close();

  console.log('Items created!');
}