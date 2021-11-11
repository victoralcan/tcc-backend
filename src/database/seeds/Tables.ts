import { createConnection } from 'typeorm';

export default async function create(
  table1Id: string,
  table2Id: string,
  table3Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO TABLES(id, number, busy, seats)
      values ('${table1Id}', 1, false, 4);
  `);

  await connection.query(`
      INSERT INTO TABLES(id, number, busy, seats)
      values ('${table2Id}', 2, false, 8);
  `);

  await connection.query(`
      INSERT INTO TABLES(id, number, busy, seats)
      values ('${table3Id}', 3, false, 2);
  `);

  await connection.close();

  console.log('Tables created!');
}
