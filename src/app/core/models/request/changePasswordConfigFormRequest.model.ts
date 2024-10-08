export class ChangePasswordRequestModel {
  constructor(
    public UserName: string,
    public CurrentPassword: string,
    public NewPassword: string,
    public NewPasswordVerified: string,
    public ProgramId: number
  ) {}
}
