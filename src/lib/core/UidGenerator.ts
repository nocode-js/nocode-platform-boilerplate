import { v4 } from 'uuid';

export class UidGenerator {
  public static readonly next = (): string => {
    return v4();
  };
}
