import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../impl/create-post.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../../core/entities/post.entity';
import { User } from '../../../../core/entities/user.entity';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async execute(command: CreatePostCommand): Promise<{ message: string }> {
    const { title, content, userId } = command;
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new Error('User not found');

    const post = this.postRepo.create({ title, content, user });
    await this.postRepo.save(post);

    return { message: 'Post created successfully' };
  }
}
