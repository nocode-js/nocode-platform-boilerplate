import { ObjectId } from 'mongodb';

export class StorageIdGenerator {
  public static readonly next = (): string => {
    return new ObjectId().toHexString();
  };
}
