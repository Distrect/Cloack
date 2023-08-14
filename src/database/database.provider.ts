import { GlobalConfigService } from 'src/config/config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configModule: GlobalConfigService) => {
      const reset = configModule.getIsDevMode();
      const databaseOptions = configModule.getDatabaseConfig();

      const dataSource = new DataSource({
        ...(databaseOptions as DataSourceOptions),
        ...reset,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
    inject: [GlobalConfigService],
  },
];
