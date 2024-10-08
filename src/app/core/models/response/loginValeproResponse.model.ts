export class LoginValeproResponseModel {
  constructor(
    public UserId: string,
    public UserName: string,
    public AccessToken: string,
    public Name: string,
    public LastName: string,
    public FullName: string,
    public Email: string,
    public Phone: string,
    public HiddenEmail: string,
    public HiddenPhone: string,
    public PersonId: number,
    public SessionId: string,
    public ProgramId: number,
    public AccountId: number,
    public ProgramName: string,
    public LanguageId: number,
    public RequiredNewPassword: boolean,
    public Roles: RoleModel[],
    public AcceptHabeasData: boolean,
    public AcceptTermsAndConditions: boolean
  ) { }
}


export class RoleModel {
  constructor(
    public RoleId: number,
    public RoleName: string
  ) { }
}



