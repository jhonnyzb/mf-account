export interface ChangePasswordRequestDto {
   UserName: string;
   CurrentPassword: string;
   NewPassword: string;
   NewPasswordVerified: string;
   ProgramId: number
}
export interface Info {
  Password: string;
  NewPassword: string;
  NewPasswordVerified: string;
}