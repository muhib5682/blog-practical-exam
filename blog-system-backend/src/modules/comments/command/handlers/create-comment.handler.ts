// commands/handlers/create-comment.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../../core/entities/post.entity';
import { User } from '../../../../core/entities/user.entity';
import { CreateCommentCommand } from '../impl/create-comment.command';
import { NotFoundException } from '@nestjs/common';
import { Comment } from 'src/core/entities/comment.entity';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(command: CreateCommentCommand): Promise<any> {
    const { content, postId, userId } = command;
    const post = await this.postRepo.findOneBy({ id: postId });
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!post || !user) throw new NotFoundException('Post or user not found');

    const comment = this.commentRepo.create({ content, post, user });
    await this.commentRepo.save(comment);
    return { message: 'Comment added successfully' };
  }
}
