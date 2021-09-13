import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class EnvironmentDto {
  production: boolean;
  typeOrmConfig: TypeOrmModuleOptions;
}
