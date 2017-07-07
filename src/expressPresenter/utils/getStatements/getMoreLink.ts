import { map } from 'lodash';
import StatementsResult from '../../../models/StatementsResult';
import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';

interface MoreLinkOptions {
  results: StatementsResult;
  statementsOpts: Partial<GetStatementsOptions>;
  resultOpts: StatementsResultOptions;
}

export default (opts: MoreLinkOptions) => {
  if (opts.results.cursor === undefined) {
    return undefined;
  }

  const moreLinkOpts = {
    ...opts.statementsOpts,
    ...opts.resultOpts,
    cursor: opts.results.cursor,
  };

  const moreLinkParams = map(moreLinkOpts, (value, key) => {
    return value === undefined ? '' : `${key}=${value}`;
  }).filter((param) => {
    return param !== '';
  }).join('&');

  return `/statements?${moreLinkParams}`;
};