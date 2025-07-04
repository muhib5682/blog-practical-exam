import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../../core/entities/user.entity';
import { AuthController } from './auth.controller';

// CQRS handlers
import { RegisterUserHandler } from './commands/handlers/register-user.handler';
import { LoginUserHandler } from './commands/handlers/login-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [AuthController],
  providers: [RegisterUserHandler, LoginUserHandler],
})
export class AuthModule {}
