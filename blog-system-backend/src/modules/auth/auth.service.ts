// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserCommand } from './commands/impl/register-user.command';
import { LoginUserQuery } from './commands/impl/login-user.command';

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async register(dto: RegisterDto) {
    return await this.commandBus.execute(
      new RegisterUserCommand(dto.username, dto.email, dto.password),
    );
  }

  async login(dto: LoginDto) {
    return await this.queryBus.execute(
      new LoginUserQuery(dto.username, dto.password),
    );
  }
}
