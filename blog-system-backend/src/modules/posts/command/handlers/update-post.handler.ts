import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../impl/update-post.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../../core/entities/post.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async execute(command: UpdatePostCommand): Promise<{ message: string }> {
    const { id, title, content, userId } = command;

    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) throw new NotFoundException('Post not found');

    if (post.user.id !== userId) {
      throw new UnauthorizedException('You are not authorized to edit this post');
    }

    post.title = title;
    post.content = content;

    await this.postRepo.save(post);

    return { message: 'Post updated successfully' };
  }
}
