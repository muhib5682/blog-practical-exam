import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl/register-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../core/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(command: RegisterUserCommand): Promise<{ message: string }> {
    const { username, email, password } = command;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepo.save(user);
    return { message: 'User registered successfully' };
  }
}
