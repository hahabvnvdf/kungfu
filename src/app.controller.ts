import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async generateToken() {
    return await this.appService.generateToken();
  }

  @Get('/reset')
  async manualGenerateToken() {
    return await this.appService.manualGenerateToken();
  }
}
