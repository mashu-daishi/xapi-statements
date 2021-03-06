import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import Signature, { Opts } from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({
    id,
    client,
    agents,
    relatedAgents,
    verbs,
    activities,
    relatedActivities,
    registrations
  }) => {
    const collection = (await config.db()).collection(STATEMENTS_COLLECTION_NAME);

    const query = {
      'statement.id': id,
      ...matchesClientOption(client)
    };
    const update = {
      $addToSet: {
        agents: { $each: agents },
        relatedAgents: { $each: relatedAgents },
        verbs: { $each: verbs },
        activities: { $each: activities },
        relatedActivities: { $each: relatedActivities },
        registrations: { $each: registrations },
      }
    };
    const options = { multi: false };

    await collection.update(query, update, options);
  };
};
