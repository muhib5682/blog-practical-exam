import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserPostsQuery } from '../impl/get-user-posts.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../../core/entities/post.entity';

@QueryHandler(GetUserPostsQuery)
export class GetUserPostsHandler implements IQueryHandler<GetUserPostsQuery> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async execute(query: GetUserPostsQuery) {
    const posts = await this.postRepo.find({
      where: { user: { id: query.userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      username: post.user.username,
    }));
  }
}
