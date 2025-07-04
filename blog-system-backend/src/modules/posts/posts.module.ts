import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as BlogPost } from '../../core/entities/post.entity';
import { User } from '../../core/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { PostsController } from './posts.controller';
import { CreatePostHandler } from './command/handlers/create-post.handler';
import { GetUserPostsHandler } from './command/handlers/get-user-posts.handler';
import { GetAllPostsHandler } from './command/handlers/get-all-posts.handler';
import { DeletePostHandler } from './command/handlers/delete-post.handler';
import { UpdatePostHandler } from './command/handlers/update-post.handler';
import {SearchPostsHandler}     from './command/handlers/search-posts.handler'
@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost, User]),
    CqrsModule,
  ],
  controllers: [PostsController],
  providers: [CreatePostHandler,GetUserPostsHandler,GetAllPostsHandler,DeletePostHandler,UpdatePostHandler,SearchPostsHandler]
   
})
export class PostsModule {}
