// src/modules/comments/comments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Comment } from '../../core/entities/comment.entity';
import { Post } from '../../core/entities/post.entity';
import { User } from '../../core/entities/user.entity';
import { CommentsController } from './comments.controller';
import { CreateCommentHandler } from './command/handlers/create-comment.handler';
import { GetCommentsByPostHandler } from './command/handlers/get-comments-by-post.handler';
@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User]), CqrsModule],
  controllers: [CommentsController],
  providers: [CreateCommentHandler,GetCommentsByPostHandler],
})
export class CommentsModule {}
