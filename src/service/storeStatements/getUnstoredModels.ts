import { has, keys, values, groupBy, Dictionary } from 'lodash';
import StatementHash from '../../models/StatementHash';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import ClientModel from '../../models/ClientModel';
import Conflict from '../../errors/Conflict';
import DuplicateId from '../../errors/DuplicateId';
import Config from '../Config';

type ModelsMap = { [statementId: string]: UnstoredStatementModel };
type ConflictRes = { modelsMap: ModelsMap, generatedIdModels: UnstoredStatementModel[] };

const modelsConflicts = (models: UnstoredStatementModel[]): ConflictRes => {
  return models.reduce(({ modelsMap, generatedIdModels }: ConflictRes, model: UnstoredStatementModel) => {
    if (model.hasGeneratedId) {
      // Relies on the DB indexes to ensure that there are no duplicate IDs.
      return {
        modelsMap,
        generatedIdModels: [
          ...generatedIdModels,
          model,
        ],
      };
    }

    // Ensures that there are no duplicate ids within the batch (spec requirement).
    const statementId = model.statement.id;
    if (has(modelsMap, statementId)) {
      throw new DuplicateId(statementId);
    }
    return {
      modelsMap: {
        ...modelsMap,
        [statementId]: model,
      },
      generatedIdModels,
    };
  }, { modelsMap: {}, generatedIdModels: [] });
};

const repoConflicts = async (
  config: Config, modelsMap: ModelsMap, client: ClientModel
): Promise<UnstoredStatementModel[]> => {
  const hashesMap: Dictionary<StatementHash[]> = groupBy(await config.repo.getHashes({
    ids: keys(modelsMap),
    client
  }), 'statementId');
  return values(modelsMap).filter((model: UnstoredStatementModel) => {
    const statementId = model.statement.id;
    if (has(hashesMap, statementId)) {
      if (model.hash !== hashesMap[statementId][0].hash) {
        throw new Conflict(statementId);
      }
      return false;
    }
    return true;
  });
};

export default async (
  config: Config, models: UnstoredStatementModel[], client: ClientModel
): Promise<UnstoredStatementModel[]> => {
  /* istanbul ignore next */
  if (!config.enableConflictChecks) return models;

  const conflictRes = modelsConflicts(models);
  const ungeneratedIdModels = await repoConflicts(config, conflictRes.modelsMap, client);
  return [...ungeneratedIdModels, ...conflictRes.generatedIdModels];
};
