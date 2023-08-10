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
}
