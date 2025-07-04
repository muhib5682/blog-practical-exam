
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginUserQuery } from '../impl/login-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../core/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(query: LoginUserQuery): Promise<{
    message: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  }> {
    const { username, password } = query;

    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Username or Password is incorrect!');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Incorrect password');

    // Return public-safe user fields
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
