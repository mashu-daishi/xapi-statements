import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import Signature, { Opts } from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    if (ids.length === 0) return;

    const collection = (await config.db()).collection(STATEMENTS_COLLECTION_NAME);
    const query = {
      'statement.id': { $in: ids },
      ...matchesClientOption(client)
    };
    const update = { $set: { voided: true } };
    const options = { multi: true };

    await collection.update(query, update, options);
  };
};
