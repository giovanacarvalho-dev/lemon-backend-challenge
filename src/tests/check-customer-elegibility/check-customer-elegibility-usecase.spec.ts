import { CheckCustomerElegibilityUsecase } from "../../usecases/check-customer-elegibility-usecase";
import {
  ConnectionType,
  ConsumptionClass,
  TariffModality,
} from "../../usecases/protocols/i-check-customer-elegibility";
const input = {
  numeroDoDocumento: "any_document",
  tipoDeConexao: ConnectionType.BIPHASIC,
  classeDeConsumo: ConsumptionClass.COMMERCIAL,
  modalidadeTarifaria: TariffModality.WHITE,
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
  ],
};
const sut = new CheckCustomerElegibilityUsecase();
describe("CheckElegibilityUsecase", () => {
  it("should call checkElegibility.execute return unelegible if invalid consumption class is provided", async () => {
    const spy = jest
      .spyOn<any, string>(sut, "checkConsumptionClass")
      .mockReturnValueOnce(false);
    const result = await sut.execute(input);
    expect(result.elegibility).toEqual(false);
  });
  it("should call checkElegibility.execute return unelegible if invalid tariff modality is provided", async () => {
    const spy = jest
      .spyOn<any, string>(sut, "checkTariffModality")
      .mockReturnValueOnce(false);
    const result = await sut.execute(input);
    expect(result.elegibility).toEqual(false);
  });
  it("should call checkElegibility.execute return unelegible if the minimum consumption value is not reached", async () => {
    const spy = jest
      .spyOn<any, string>(sut, "checkMinConsumption")
      .mockReturnValueOnce(false);
    const result = await sut.execute(input);
    expect(result.elegibility).toEqual(false);
  });
  it("should call checkElegibility.execute return elegible if valid input is provided", async () => {
    const result = await sut.execute(input);
    expect(result.elegibility).toEqual(true);
  });
});
