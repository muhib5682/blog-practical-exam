import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserCommand } from './commands/impl/register-user.command';
import { LoginUserQuery } from './commands/impl/login-user.command';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.commandBus.execute(new RegisterUserCommand(dto.username, dto.email, dto.password));
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.queryBus.execute(new LoginUserQuery(dto.username, dto.password));
  }
}
