import { groupBy, Dictionary, mapValues } from 'lodash';
import StatementModel from '../../../models/StatementModel';
import UpRef from '../../../models/UpRef';
import Config from '../../Config';

export default async (
  config: Config,
  models: StatementModel[]
): Promise<Dictionary<String[]>> => {
  const statementIds = models.map((model) => {
    return model.statement.id;
  });
  const eagerLoadedUpRefs = await config.repo.getUpRefsByIds({ targetIds: statementIds });
  const groupedUpRefs = groupBy(eagerLoadedUpRefs, (upRef: UpRef) => {
    return upRef.targetId;
  });
  const groupedUpRefIds = mapValues(groupedUpRefs, (upRefs: UpRef[]): string[] => {
    return upRefs.map((upRef: UpRef) => {
      return upRef.sourceId;
    });
  });
  return groupedUpRefIds;
};