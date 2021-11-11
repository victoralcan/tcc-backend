import { createConnection } from 'typeorm';

export default async function create(
  adminId: string,
  waiterId: string,
  kitchenId: string,
  roleAdminId: string,
  roleWaiterId: string,
  roleKitchenId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
    INSERT INTO USERS(id, name, lastname, password, role_id)
    values ('${adminId}', 'admin', 'user', '$2a$08$7yfof/vlcM8t3mPy32Iptucskr2moWw/lBmX6i4ThXje6HFltv9mq',
            '${roleAdminId}');
  `);

  await connection.query(`
    INSERT INTO USERS(id, name, lastname, password, role_id)
    values ('${waiterId}', 'waiter', 'user', '$2a$10$XHs0aeEWVex6QXAS/NWlgepsRy0nXun3u28RVZTyXnTOEC6O.vjx2',
            '${roleWaiterId}');
  `);

  await connection.query(`
    INSERT INTO USERS(id, name, lastname, password, role_id)
    values ('${kitchenId}', 'kitchen', 'user', '$2a$10$SQZUctI03Yxb6Hb4sdsnBeZep7E7dp3n/uJ17v8uiyrwz.BhxKiVK',
            '${roleKitchenId}');
  `);

  await connection.close();

  console.log('Users created!');
}
