export class LoginUserQuery {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}
}
