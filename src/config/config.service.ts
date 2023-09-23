import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) {}
  public getDatabaseConfig() {
    return {
      type: this.configService.get<string>('TYPE'),
      host: this.configService.get<string>('HOST'),
      port: this.configService.get<number>('PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      database: this.configService.get<string>('DATABASE'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
    };
  }
  public getJwtSecret() {
    return this.configService.get('JWT_KEY');
  }

  public getMailOptions() {
    return {
      user: this.configService.get('EMAIL'),
      pass: this.configService.get('PASSWORD'),
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      refreshToken: this.configService.get('REFRESH_TOKEN'),
    };
  }

  public getIsDevMode() {
    const isDev =
      this.configService.get<string>('isDev') === 'false' ? false : true;

    return isDev
      ? { synchronize: true, dropSchema: true }
      : { synchronize: false, dropSchema: false };
  }

  public getDev(): boolean {
    return this.configService.get<string>('isDev') === 'false' ? false : true;
  }

  public get(property: string) {
    return this.configService.get(property);
  }
}
