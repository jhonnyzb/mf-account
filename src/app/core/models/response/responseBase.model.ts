export class ResponseBaseModel<T> {
  constructor(
  public codeId: number,
  public message: string,
  public data: T){}
}
