export interface MixPaymentdDto {
  IDPrograma: number;
  Programa: string;
  IDPais: number;
  Pais: string;
  IDEstado: number;
  IdEmpresaPromotoraPpal: number;
  EmpresaPromotora: string;
  DecimalesPuntos: number;
  PorcentajePagoEnPuntos: number;
  TasaComisionMedioPago: number;
  ValorFijoComisionMedioPago: number;
  ValorMinimoComisionMedioPago: number;
  TasaImptoComisionMedioPago: number;
  ValorPagoMinimo: number;
  PermitirCantidadEnRedencion: boolean;
  UrlOrigen: string;
  Descripcion: string;
  MessageValorPagoMinimo: string;
  ValorPuntosMinimoCarrito: number;
  RedirecionAppUrl: string;
  RecaptchaVisible: boolean;
  MaximoIntentosLogin: number;
  EsMultiPais: boolean;
}
