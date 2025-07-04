import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SearchPostsQuery } from '../impl/search-posts.query';
import { Post } from '../../../../core/entities/post.entity';

@QueryHandler(SearchPostsQuery)
export class SearchPostsHandler implements IQueryHandler<SearchPostsQuery> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async execute(query: SearchPostsQuery) {
    const posts = await this.postRepo.find({
      where: { title: Like(`%${query.keyword}%`) },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      username: post.user.username,
    }));
  }
}
