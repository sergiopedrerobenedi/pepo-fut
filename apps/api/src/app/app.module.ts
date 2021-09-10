import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/model/user.entity';
import { UsersModule } from './modules/users/users.module';



@Module({
  imports: [AuthModule,TypeOrmModule.forRoot({
     type:'postgres',
     port: 5432,
     username: 'postgres',
     password: 'postgres',
     database: 'pepo_fut',
     schema:'public',
     synchronize:true,
     logging:false,
     entities: [User]
  }),UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
