// src/modules/posts/queries/handlers/get-all-posts.handler.ts

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPostsQuery } from '../impl/get-all-posts.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../../core/entities/post.entity';

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsHandler implements IQueryHandler<GetAllPostsQuery> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async execute(query: GetAllPostsQuery): Promise<any[]> {
    const { userId } = query;

    const posts = await this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.userId != :userId', { userId })
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      username: post.user?.username,
    }));
  }
}
