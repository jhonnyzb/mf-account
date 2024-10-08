export class DialogParams {
  constructor(
    public msg?: any,
    public page: any = null,
    public success: boolean = true,
    public confirmText?: string,
    public btnshow?: boolean,
    public textTittle?: string,
    public typeRute?: boolean,
    public otpCode?: number
  ) { }
}


export class DialogParamsAward {
  constructor(
    public Msg?: string | null,
    public Page?: string | null,
    public TypeAward?: number | null,

  ) { }
}
