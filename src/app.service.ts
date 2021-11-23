import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generateToken() {
    const file = fs.readFileSync('./src/token.txt', 'utf-8');
    // console.log(file);
    return file;
  }

  async manualGenerateToken() {
    try {
      const res = await fetch(
        'https://api.kungfustockspro.live:8443/api/login',
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'haminh1998@gmail.com',
            password: 'Minh@1998',
            persist_login: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      const user = await res.json();
      fs.writeFileSync('./src/token.txt', user.access_token, 'utf-8');

      console.log('new token');
    } catch (err) {
      console.error(err);
    }
  }
}
