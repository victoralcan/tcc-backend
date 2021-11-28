import { createConnection } from 'typeorm';

export default async function create(
  reserveId: string,
  reserveId2: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO RESERVES(id, start_date, name, contact, amount)
      values ('${reserveId}', '2021-11-08', 'nome1', 'contact2', 5);
  `);

  await connection.query(`
      INSERT INTO RESERVES(id, start_date, name, contact, amount)
      values ('${reserveId2}', '2021-11-09', 'nome2', 'contact2', 3);
  `);

  await connection.close();

  console.log('Reserves created!');
}
