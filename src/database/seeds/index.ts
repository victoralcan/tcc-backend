import { v4 as uuidV4 } from 'uuid';

import { createConnection } from 'typeorm';
import createRoles from './Roles';
import createUsers from './Users';
import createTables from './Tables';
import createReserves from './Reserves';
import createCategories from './Categories';
import createSubCategories from './SubCategories';
import createItems from './Items';

const adminRoleId = uuidV4();
const waiterRoleId = uuidV4();

const waiterId = uuidV4();
const adminId = uuidV4();

const table1Id = uuidV4();
const table2Id = uuidV4();
const table3Id = uuidV4();

const reserveId = uuidV4();
const reserveId2 = uuidV4();

const categorie1Id = uuidV4();
const categorie2Id = uuidV4();

const subCategorie1Id = uuidV4();
const subCategorie2Id = uuidV4();

const item1Id = uuidV4();
const item2Id = uuidV4();

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
    await createTables(table1Id, table2Id, table3Id);
    await createReserves(reserveId, reserveId2, table1Id);
    await createCategories(categorie1Id, categorie2Id);
    await createSubCategories(subCategorie1Id, subCategorie2Id, categorie1Id);
    await createItems(item1Id, item2Id, subCategorie1Id);
  } catch (e) {
    console.log(e);
    throw new Error();
  }
}

execute()
  .then(() => console.log('Seed complete!'))
  .catch(() => console.log('Seed error!'));
