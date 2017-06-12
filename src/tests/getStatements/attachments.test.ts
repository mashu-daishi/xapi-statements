import * as assert from 'assert';
import { isArray } from 'lodash';
import { Service } from '../../service';
import setup from '../utils/setup';
import attachmentsTest, { StatementCreator } from './utils/attachmentsTest';
import createAttachmentStatement from '../utils/createAttachmentStatement';
import createAttachmentSubStatement from '../utils/createAttachmentSubStatement';

describe('get statements with attachments', () => {
  const service = setup();

  const assertResult = async (result: any, expectedIds: string[], expectedAttachments: any[]) => {
    const statements: any[] = result.statements;
    const attachments: any[] = result.attachments;
    assert(isArray(attachments));
    assert(isArray(statements));
    const actualIds = statements.map((statement) => {
      return statement.id;
    });
    assert.deepEqual(actualIds, expectedIds);
    assert.deepEqual(attachments, expectedAttachments);
  };

  const testAttachments = (service: Service, createStatement: StatementCreator) => {
    describe('with exact statements', () => {
      attachmentsTest(service, async (expectedIds, expectedAttachments) => {
        const result = await service.getExactStatementsWithAttachments({});
        return assertResult(result, expectedIds, expectedAttachments);
      }, createStatement);
    });

    describe('with id statements', () => {
      attachmentsTest(service, async (expectedIds, expectedAttachments) => {
        const result = await service.getIdsStatementsWithAttachments({});
        return assertResult(result, expectedIds, expectedAttachments);
      }, createStatement);
    });

    describe('with canonical statements', () => {
      attachmentsTest(service, async (expectedIds, expectedAttachments) => {
        const result = await service.getCanonicalStatementsWithAttachments({
          langs: []
        });
        return assertResult(result, expectedIds, expectedAttachments);
      }, createStatement);
    });
  };

  describe('in the statement', () => {
    testAttachments(service, createAttachmentStatement);
  });

  describe('in the sub statement', () => {
    testAttachments(service, createAttachmentSubStatement);
  });
});