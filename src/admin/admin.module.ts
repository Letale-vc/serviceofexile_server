import { Module } from '@nestjs/common'
import { BanlistModule } from '../banlist/banlist.module'
import { UserModule } from '../users/user.module'
import { AdminController } from './admin.controller'

@Module({
  imports: [BanlistModule, UserModule],
  controllers: [AdminController]
})
export class AdminModule {}
