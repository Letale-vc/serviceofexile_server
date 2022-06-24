import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import poeHandlers from '../mocks/pathofexile'

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

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e: any) {
    console.log(e)
  }
}

// const server = setupServer(...poeHandlers)


// process.once('SIGINT', () => server.close())
// process.once('SIGTERM', () => server.close())
// server.listen()
void start()
