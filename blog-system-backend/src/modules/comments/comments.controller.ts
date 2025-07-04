// src/modules/comments/comments.controller.ts
import { Body, Controller, Post,Get,Param } from '@nestjs/common';
import { CommandBus,QueryBus } from '@nestjs/cqrs';
import { CreateCommentCommand } from './command/impl/create-comment.command';
import { CreateCommentDto } from '../auth/dto/create-comment.dto';
import { GetCommentsByPostQuery } from './command/impl/get-comments-by-post.query';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async createComment(@Body() dto: CreateCommentDto) {
    const { content, userId, postId } = dto;
    return this.commandBus.execute(
      new CreateCommentCommand(content, postId, userId),
    );
  }
  @Get('by-post/:postId')
  async getCommentsByPost(@Param('postId') postId: number) {
  return this.queryBus.execute(new GetCommentsByPostQuery(+postId));
}

}
