export class ErrorResponseModel {
  constructor(
    public PropertyName: string,
    public ErrorMessage: string,
    public AttemptedValue: any,
    public CustomState: any,
    public Severity: number,
    public ErrorCode: any,
    public FormattedMessagePlaceholderValues: any
  ) { }
}
