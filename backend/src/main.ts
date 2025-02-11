import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const allowedOrigins = [
        'http://localhost:5173',
        'http://frontend:5173',
        'http://localhost:8080',
        'http://frontend:80',
    ];

    const corsOptions: CorsOptions = {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
            'Origin'
        ],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };

    app.enableCors(corsOptions);


    // Swagger setup
    const config = new DocumentBuilder()
        .setTitle('Humble Superhero API')
        .setDescription('API for managing humble superheroes')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log('Humble Superhero API running on http://localhost:3000');
    console.log('API Documentation available at http://localhost:3000/api');
}
bootstrap();