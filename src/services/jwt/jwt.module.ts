// jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '1d1fadbd9150349c135781140fffee9d', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
    }),
  ],
  providers: [JwtAuthService],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
