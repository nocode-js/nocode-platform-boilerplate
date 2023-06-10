import crypto from 'crypto';

export class UidGenerator {
  public static readonly next = (): string => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, v => v.toString(16).padStart(2, '0')).join('');
  };
}
