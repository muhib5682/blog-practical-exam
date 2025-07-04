import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../../../core/entities/comment.entity';
import { GetCommentsByPostQuery } from '../impl/get-comments-by-post.query';

@QueryHandler(GetCommentsByPostQuery)
export class GetCommentsByPostHandler implements IQueryHandler<GetCommentsByPostQuery> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async execute(query: GetCommentsByPostQuery) {
    const { postId } = query;

    const comments = await this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ['user'], // to access comment.user.username
      order: { createdAt: 'DESC' },
    });

    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      username: comment.user?.username,
    }));
  }
}
