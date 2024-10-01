import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  alive() {
    return { message: 'I am alive! 🚀, ready to use' };
  }
}
