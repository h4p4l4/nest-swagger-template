import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerConfig } from './common/SwaggerConfig';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags(SwaggerConfig.API_TAGS.APP)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
