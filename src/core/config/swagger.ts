import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfiguration {
    static setup(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle('MARK OUT')
            .setDescription('MARK OUT swagger documentation')
            .setVersion('1.0')
            
            .build();

        const options: SwaggerDocumentOptions = {
            operationIdFactory: (
                controllerKey: string,
                methodKey: string
            ) => methodKey,
        };
        const document = SwaggerModule.createDocument(app, config, options);
        SwaggerModule.setup('api', app, document, {
            url: 'http://192.168.34.182:3000/api',

        });
    }
}