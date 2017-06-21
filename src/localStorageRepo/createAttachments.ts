import * as fs from 'fs-extra';
import AttachmentModel from '../models/AttachmentModel';
import CreateAttachmentsOptions from '../repo/CreateAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<AttachmentModel[]> => {
    await fs.ensureDir(config.attachmentsDirectory);
    const promises = opts.models.map((model) => {
      return new Promise((resolve, reject) => {
        const filePath = `${config.attachmentsDirectory}/${model.hash}`;
        const writeStream = fs.createWriteStream(filePath);
        model.stream.pipe(writeStream);
        model.stream.on('end', () => {
          resolve(filePath);
        });
        model.stream.on('error', (err: any) => {
          reject(err);
        });
      });
    });
    await Promise.all(promises);
    return opts.models;
  };
};
