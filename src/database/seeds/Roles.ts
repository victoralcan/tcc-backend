import { createConnection } from 'typeorm';

export default async function create(
  adminId: string,
  waiterId: string,
  kitchenId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${adminId}', 'ROLE_ADMIN');
  `);

  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${waiterId}', 'ROLE_WAITER');
  `);

  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${kitchenId}', 'ROLE_KITCHEN');
  `);

  await connection.close();

  console.log('Roles created!');
}
