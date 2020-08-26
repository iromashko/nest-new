import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'topsecret44',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
