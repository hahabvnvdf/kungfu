import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generateToken() {
    try {
      const res = await fetch(
        'https://api.kungfustockspro.live:8443/api/login',
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'haminh1998@gmail.com',
            password: 'Minh@1998',
            persist_login: false,
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
      return user.access_token;
    } catch (err) {
      console.error(err);
    }
  }
}
