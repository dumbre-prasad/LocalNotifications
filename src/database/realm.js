import Realm from 'realm';
import {VISITORS_TABLE} from './tableConstants';
import {CONFIG} from '../utils/config';

class Visitors extends Realm.Object {}
Visitors.schema = {
  name: VISITORS_TABLE,
  properties: {
    name: {type: 'string?'},
    email: {type: 'string?'},
    typeOfVisit: {type: 'string?'},
    personToVisit: {type: 'string?'},
    dateOfEntry: {type: 'date?'},
    timeOfEntry: {type: 'date?'},
    timeOfExit: {type: 'date?'},
  },
};

export const schemasArray = [Visitors.schema];

export default new Realm({
  schema: schemasArray,
  schemaVersion: CONFIG.DB_VERSION,
  deleteRealmIfMigrationNeeded: true,
});
