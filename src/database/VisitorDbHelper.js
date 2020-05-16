import realm from './realm';
import {VISITORS_TABLE} from './tableConstants';

export const addVisitor = async ({visitor}) => {
  try {
    realm.write(async () => {
      await realm.create(VISITORS_TABLE, visitor);
    });
    console.log('VISITOR ADDED', visitor);
  } catch (error) {
    alert(error);
    console.log('error', error);
  }
};
