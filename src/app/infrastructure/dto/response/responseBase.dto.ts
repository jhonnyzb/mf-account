export interface ResponseBaseDto<T> {
  codeId: number
  message: string
  data: T
}
