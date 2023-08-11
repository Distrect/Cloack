import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) {}
  public getDatabaseConfig() {
    return {
      password: this.configService.get('DATABASE_PASSWORD'),
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
}
