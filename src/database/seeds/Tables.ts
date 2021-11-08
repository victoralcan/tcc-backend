import { createConnection } from 'typeorm';

export default async function create(
  table1Id: string,
  table2Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO TABLES(id, number, busy)
      values ('${table1Id}', 1, false);
  `);

  await connection.query(`
      INSERT INTO TABLES(id, number, busy)
      values ('${table2Id}', 2, false);
  `);

  await connection.close();

  console.log('Tables created!');
}
