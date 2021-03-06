import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
import checkUnknownParams from '../checkUnknownParams';
import getStatementsResultOptions from './getStatementsResultOptions';
import { xapiHeaderVersion } from '../../../utils/constants';
import sendMultipartResult from './sendMultipartResult';

export interface Options {
  config: Config;
  res: Response;
  queryParams: any;
  id: string;
  voided: boolean;
  client: ClientModel;
  langs: string[];
}

export default async (opts: Options) => {
  const { queryParams, config, id, voided, res, client, langs } = opts;
  const timestamp = new Date().toISOString();
  const resultOpts = getStatementsResultOptions(queryParams, client);

  checkUnknownParams(queryParams, [
    'statementId',
    'voidedStatementId',
    'format',
    'attachments',
  ]);

  const results = await config.service.getStatement({ client, id, voided, langs, ...resultOpts });
  res.setHeader('X-Experience-API-Consistent-Through', timestamp);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.setHeader('Last-Modified', results.statements[0].stored);

  const jsonResponse = results.statements[0];

  if (resultOpts.attachments) {
    return sendMultipartResult(jsonResponse, results.attachments, res);
  }

  res.status(200);
  res.json(jsonResponse);
};
