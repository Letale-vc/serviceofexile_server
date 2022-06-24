import { ServiceController } from './service.controller'
import { Module } from '@nestjs/common'
import { Service } from './service.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceService } from './service.service'

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceService],
  controllers: [ServiceController]
})
export class ServiceModule {}
