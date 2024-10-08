export class EnvironmentModel {
  constructor(
    public  production: boolean,
    public  serverName: string,
    public  serverNotification: string,
    public  environmentId: number,
    public  sourceId: number,
    public  keyRecaptcha: string,
    public  gtm_key: string,
    public  apiKey: string,
    public  timeValidCodeSent: number,
    public apiValepro: string
  ) {}
}














