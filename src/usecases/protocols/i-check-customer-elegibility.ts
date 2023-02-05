export enum ConnectionType {
  SINGLE_PHASIC = "monofasico",
  BIPHASIC = "bifasico",
  THREE_PHASIC = "trifasico",
}

export enum ConsumptionClass {
  RESIDENTIAL = "residencial",
  INDUSTRIAL = "industrial",
  COMMERCIAL = "comercial",
  RURAL = "rural",
  PUBLIC_POWER = "poderPublico",
}

export enum TariffModality {
  BLUE = "azul",
  WHITE = "branca",
  GREEN = "verde",
  CONVENTIONAL = "convencional",
}

export enum ReasonForIneligibility {
  CONSUMPTION_CLASS_ERROR = "Classe de consumo não aceita",
  TARIFF_MODALITY_ERROR = "Modalidade tarifária não aceita",
  LOW_CONSUMPTION_ERROR = "Consumo muito baixo para tipo de conexão",
}

export type ICheckCustomerEligibilityInput = {
  numeroDoDocumento: string;
  tipoDeConexao: ConnectionType;
  classeDeConsumo: ConsumptionClass;
  modalidadeTarifaria: TariffModality;
  historicoDeConsumo: number[];
};

export type ICheckCustomerEligibilityAvailableOutput = {
  economiaAnualDeCO2: number;
};

export type ICheckCustomerEligibilityNotAvailableOutput = {
  razoesDeInelegibilidade: ReasonForIneligibility[];
};
