import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configModule: ConfigService) => {
      const reset =
        configModule.get('isDev') === 't'
          ? { synchronize: true, dropSchema: true }
          : { synchronize: false, dropSchema: false };

      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: configModule.get('DATABASE_PASSWORD'),
        database: 'cloack',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        ...reset,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
