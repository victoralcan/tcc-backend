import { v4 as uuidV4 } from 'uuid';

import { createConnection } from 'typeorm';
import createRoles from './Roles';
import createUsers from './Users';

const adminRoleId = uuidV4();
const waiterRoleId = uuidV4();

const waiterId = uuidV4();
const adminId = uuidV4();

async function execute() {
  try {
    // @ts-ignore
    const connection = await createConnection();
    await connection.query(
      '  CREATE FUNCTION min_uuid(uuid, uuid)' +
        '    RETURNS uuid AS $$' +
        '    BEGIN' +
        '        IF $2 IS NULL AND $1 IS NULL THEN' +
        '            RETURN NULL ;' +
        '        END IF;' +
        '' +
        '        IF $2 IS NULL THEN' +
        '            RETURN $1;' +
        '        END IF ;' +
        '        IF $1 IS NULL THEN' +
        '            RETURN $2;' +
        '          END IF;' +
        '' +
        '        IF $1 > $2 THEN' +
        '            RETURN $2;' +
        '        END IF;' +
        '' +
        '        RETURN $1;' +
        '    END;' +
        '    $$ LANGUAGE plpgsql;' +
        '' +
        '    CREATE AGGREGATE min(uuid) (' +
        '      sfunc = min_uuid,' +
        '      stype = uuid,' +
        '      combinefunc = min_uuid,' +
        '      parallel = safe,' +
        '      sortop = operator (<)' +
        '    );',
    );
    console.log('Configuration to UUID MIN');
    await connection.close();
    await createRoles(adminRoleId, waiterRoleId);
    await createUsers(adminId, waiterId, adminRoleId, waiterRoleId);
  } catch (e) {
    console.log(e);
    throw new Error();
  }
}

execute()
  .then(() => console.log('Seed complete!'))
  .catch(() => console.log('Seed error!'));
