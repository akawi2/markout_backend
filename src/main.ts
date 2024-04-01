import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import{VersioningType, ValidationPipe} from '@nestjs/common';
import { SwaggerConfiguration } from './core/config/swagger';
import { config } from 'dotenv';


async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(helmet());
  
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());


  SwaggerConfiguration.setup(app);

  await app.listen(3000);

}
bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});


