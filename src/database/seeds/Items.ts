import { createConnection } from 'typeorm';

export default async function create(
  item1Id: string,
  item2Id: string,
  item3Id: string,
  item4Id: string,
  subCategorieId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO ITEMS(id, name, description, sub_category_id, value, image_url)
      values ('${item1Id}', 'Hamburger', 'Carne com queijo', '${subCategorieId}', 10.80, 'https://www.df.senac.br/wp-content/uploads/2021/01/hambuuguer-gourmet1.jpeg');
  `);

  await connection.query(`
      INSERT INTO ITEMS(id, name, description, sub_category_id, value, image_url)
      values ('${item2Id}','Batata frita', 'Batata frita sem nada', '${subCategorieId}', 25.80, 'http://www.sitiovojoao.com.br/wp-content/uploads/2020/11/ketchup-752x440_Easy-Resize.com_.jpg');
  `);

  await connection.query(`
      INSERT INTO ITEMS(id, name, description, sub_category_id, value, image_url)
      values ('${item2Id}','Batata frita com bacon', 'Batata frita com bacon', '${subCategorieId}', 25.80, 'http://www.sitiovojoao.com.br/wp-content/uploads/2020/11/ketchup-752x440_Easy-Resize.com_.jpg');
  `);

  await connection.query(`
      INSERT INTO ITEMS(id, name, description, sub_category_id, value, image_url)
      values ('${item2Id}','Batata frita com parmesao', 'Batata frita com parmesao', '${subCategorieId}', 25.80, 'http://www.sitiovojoao.com.br/wp-content/uploads/2020/11/ketchup-752x440_Easy-Resize.com_.jpg');
  `);

  await connection.close();

  console.log('Items created!');
}
