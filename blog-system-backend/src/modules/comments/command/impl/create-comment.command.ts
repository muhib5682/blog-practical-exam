// commands/impl/create-comment.command.ts
export class CreateCommentCommand {
  constructor(
    public readonly content: string,
    public readonly postId: number,
    public readonly userId: number,
  ) {}
}