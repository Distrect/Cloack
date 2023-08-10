import * as crypto from 'crypto';

export class CryptoUtil {
  static generateRandomHex(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex');
  }
}
