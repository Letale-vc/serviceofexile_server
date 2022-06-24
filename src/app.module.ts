import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { ServiceModule } from './service/service.module'
import { UserModule } from './users/user.module'
import { BanlistModule } from './banlist/banlist.module'
import { AuthModule } from './auth/auth.module'
import { ServiceNameModule } from './data/serviceNames/serviceName.module'
import { LeagueModule } from './data/league/league.module'
import { ServiceCategoryModule } from './data/serviceCategory/serviceCategory.module'
import { DataModule } from './data/data.module'
import { VouchesModule } from './vouches/vouches.module'
import { CurrencyModule } from './data/currency/currency.module'
import { AdminModule } from './admin/admin.module'
import { RoleModule } from './role/role.module'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'poe_service',
      password: 'yMw2Jje',
      database: 'poe_service',
      synchronize: true,
      autoLoadEntities: true,
      cache: true
    }),
    UserModule,
    RoleModule,
    ServiceModule,
    BanlistModule,
    AuthModule,
    LeagueModule,
    CurrencyModule,
    ServiceCategoryModule,
    ServiceNameModule,
    DataModule,
    VouchesModule,
    AdminModule
  ]
})
export class AppModule {}
