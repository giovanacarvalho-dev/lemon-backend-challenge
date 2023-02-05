import { CheckCustomerElegibilityController } from "../../presentation/controllers";
import { InvalidParamError } from "../../presentation/errors";
import { IValidation } from "../../presentation/protocols";
import {
  ConnectionType,
  ConsumptionClass,
  TariffModality,
} from "../../usecases/protocols/i-check-customer-elegibility";
import { ICheckCustomerElegibilityUsecase } from "../../usecases/protocols/i-check-customer-elegibility-usecase";

const checkElegibility: ICheckCustomerElegibilityUsecase = {
  execute: async () => {
    return {
      elegibility: true,
      data: {
        economiaAnualDeCO2: 0,
      },
    };
  },
};
const validation: IValidation = {
  validate: () => {},
};
const validationWithError: IValidation = {
  validate: () => {
    return new InvalidParamError("any");
  },
};

const sutWithError = new CheckCustomerElegibilityController(
  checkElegibility,
  validationWithError
);
const sut = new CheckCustomerElegibilityController(
  checkElegibility,
  validation
);

describe("CheckElegibilityController", () => {
  it("should call checkElegibility.execute method if valid parameters are passed", async () => {
    const request = {
      numeroDoDocumento: "any_document",
      tipoDeConexao: ConnectionType.SINGLE_PHASIC,
      classeDeConsumo: ConsumptionClass.COMMERCIAL,
      modalidadeTarifaria: TariffModality.BLUE,
      historicoDeConsumo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toEqual(200);
  });
  it("should return an error if validation returns an error", async () => {
    const request = {
      numeroDoDocumento: "any_document",
      tipoDeConexao: ConnectionType.SINGLE_PHASIC,
      classeDeConsumo: ConsumptionClass.COMMERCIAL,
      modalidadeTarifaria: TariffModality.BLUE,
      historicoDeConsumo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };
    const response = await sutWithError.handle(request);
    expect(response.statusCode).toEqual(400);
  });
  it("should return 500 if a server error occurs", async () => {
    const spy = jest
      .spyOn(checkElegibility, "execute")
      .mockImplementationOnce(async () => {
        throw new Error();
      });
    const request = {
      numeroDoDocumento: "any_document",
      tipoDeConexao: ConnectionType.SINGLE_PHASIC,
      classeDeConsumo: ConsumptionClass.COMMERCIAL,
      modalidadeTarifaria: TariffModality.BLUE,
      historicoDeConsumo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toEqual(500);
  });
});
