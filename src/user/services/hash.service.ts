import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashService {
  async generateHash(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
