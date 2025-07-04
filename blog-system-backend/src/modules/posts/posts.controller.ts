import { Controller, Post, Body,Get,Param,Delete,Put,Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto } from '../auth/dto/create-post.dto';
import { CreatePostCommand } from './command/impl/create-post.command';
import { GetUserPostsQuery } from './command/impl/get-user-posts.query';
import {GetAllPostsQuery}    from './command/impl/get-all-posts.query'
import { DeletePostCommand } from './command/impl/delete-post.command';
import { UpdatePostCommand } from './command/impl/update-post.command';
import { SearchPostsQuery } from './command/impl/search-posts.query';
@Controller('posts')
export class PostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus 
  ) {}

  @Post('create_posts')
  async createPost(@Body() dto: CreatePostDto) {
    return this.commandBus.execute(
      new CreatePostCommand(dto.title, dto.content, dto.userId),
    );
    
  }
 @Get('my-posts/:userId')
async getMyPosts(@Param('userId') userId: number) {
  return this.queryBus.execute(new GetUserPostsQuery(+userId));
}
@Get('all')
  async getAllPosts(@Query('userId') userId: number) {
    return this.queryBus.execute(new GetAllPostsQuery(+userId));
  }
 @Delete('delete/:id')
  async deletePost(@Param('id') id: number) {
    return this.commandBus.execute(new DeletePostCommand(+id));
  }
  @Put('update/:id')
  async updatePost(@Param('id') id: number, @Body() dto: CreatePostDto) {
    return this.commandBus.execute(
      new UpdatePostCommand(+id, dto.title, dto.content, dto.userId),
    );
  }
  @Get('search')
  async searchPosts(@Query('keyword') keyword: string) {
    return this.queryBus.execute(new SearchPostsQuery(keyword));
  }
}
