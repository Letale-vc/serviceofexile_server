/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const start = async () => {
  try {
    const PORT = process.env.PORT || 8000
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        skipMissingProperties: true,
        disableErrorMessages: true
      })
    )
    app.enableCors()

    const configSwagger = new DocumentBuilder()
      .setTitle('serviceofexile back api')
      .setVersion('dev')
      .build()
    const document = SwaggerModule.createDocument(app, configSwagger)
    SwaggerModule.setup('api', app, document)

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e: unknown) {
    console.log(e)
  }
}

start()
