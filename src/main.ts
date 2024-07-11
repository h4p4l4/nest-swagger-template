import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Constants } from './common/Constants';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SwaggerConfig } from './common/SwaggerConfig';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port: number =
    +configService.get<string>(Constants.ENV.APP_PORT) || 3000;
  const apiDocsPath: string = 'api-docs';

  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle(SwaggerConfig.APP_NAME)
    .setDescription(SwaggerConfig.APP_DESCRIPTION)
    .setVersion(SwaggerConfig.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiDocsPath, app, document);

  await app.listen(port, () => {
    console.log(`🐝 🌈 🌧️  Server started on PORT: ${port} 🔥 🍓 🐣`);
    if (process.env.NODE_ENV === Constants.ENV.DEV) {
      console.log(
        `🔗 Open docs in your browser: http://localhost:${port}/${apiDocsPath}`,
      );
    }
  });
}

bootstrap();
