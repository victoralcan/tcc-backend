import { createConnection } from 'typeorm';

export default async function create(
  adminId: string,
  waiterId: string,
  roleAdminId: string,
  roleWaiterId: string,
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

  await connection.close();

  console.log('Users created!');
}
