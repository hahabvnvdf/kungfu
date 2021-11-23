import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as https from 'https';
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
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
      // const res = await this.httpService.post(
      //   'https://api.kungfustockspro.live:8443/api/login',
      //   JSON.stringify({
      //     email: 'haminh1998@gmail.com',
      //     password: 'Minh@1998',
      //     persist_login: true,
      //   }),
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
      // if (res. >= 400) {
      //   throw new Error('Bad response from server');
      //
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });

      const res = await this.httpService
        .post(
          'https://api.kungfustockspro.live:8443/api/login',
          JSON.stringify({
            email: 'haminh1998@gmail.com',
            password: 'Minh@1998',
            persist_login: true,
          }),
          {
            httpsAgent: httpsAgent,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();
      fs.writeFileSync('./src/token.txt', res.data.access_token, 'utf-8');
    } catch (err) {
      console.error(err);
    }
  }
}
