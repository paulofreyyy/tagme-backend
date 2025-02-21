import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                const formattedErros = errors.map((error) => {
                    return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
                });
                return {
                    statusCode: 400,
                    message: formattedErros,
                    error: 'Bad Request'
                }
            }
        })
    )

    await app.listen(3000);
}
bootstrap();
