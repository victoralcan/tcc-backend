import { createConnection } from 'typeorm';

export default async function create(
  reserveId: string,
  reserveId2: string,
  reserveTable: string,
  
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO RESERVES(id, table_id, start_date, name, contact, amount)
      values ('${reserveId}','${reserveTable}', '2021-11-08', 'nome1', 'contact2', 50);
  `);

  await connection.query(`
      INSERT INTO RESERVES(id, table_id, start_date, name, contact, amount)
      values ('${reserveId2}','${reserveTable}', '2021-11-09', 'nome2', 'contact2', 60);
  `);

  await connection.close();

  console.log('Reserves created!');
}
