import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceNameController } from './serviceName.controller'
import { ServiceName } from './serviceName.entity'
import { ServiceNameService } from './serviceName.service'

@Module({
  imports: [TypeOrmModule.forFeature([ServiceName])],
  controllers: [ServiceNameController],
  providers: [ServiceNameService],
  exports: [ServiceNameService]
})
export class ServiceNameModule {}
