import {
  ConnectionType,
  ConsumptionClass,
  ICheckCustomerEligibilityAvailableOutput,
  ICheckCustomerEligibilityInput,
  ICheckCustomerEligibilityNotAvailableOutput,
  ReasonForIneligibility,
  TariffModality,
} from "./protocols/i-check-customer-elegibility";
import { ICheckCustomerElegibilityUsecase } from "./protocols/i-check-customer-elegibility-usecase";

export class CheckCustomerElegibilityUsecase
  implements ICheckCustomerElegibilityUsecase
{
  async execute(
    input: ICheckCustomerEligibilityInput
  ): Promise<{
    elegibility: boolean;
    data:
      | ICheckCustomerEligibilityAvailableOutput
      | ICheckCustomerEligibilityNotAvailableOutput;
  }> {
    const averageConsumption = this.calculateAverageConsumption(
      input.historicoDeConsumo
    );
    let reasons = [];
    if (!this.checkConsumptionClass(input.classeDeConsumo)) {
      reasons.push(ReasonForIneligibility.CONSUMPTION_CLASS_ERROR);
    }
    if (!this.checkTariffModality(input.modalidadeTarifaria)) {
      reasons.push(ReasonForIneligibility.TARIFF_MODALITY_ERROR);
    }
    if (!this.checkMinConsumption(input.tipoDeConexao, averageConsumption)) {
      reasons.push(ReasonForIneligibility.LOW_CONSUMPTION_ERROR);
    }
    if (reasons.length > 0) {
      return {
        elegibility: false,
        data: {
          razoesDeInelegibilidade: reasons,
        },
      };
    }
    const savingsCO2 = this.calculateAnnualCO2Savings(input.historicoDeConsumo);
    return {
      elegibility: true,
      data: {
        economiaAnualDeCO2: savingsCO2,
      },
    };
  }
  private checkConsumptionClass(consumptionClass: ConsumptionClass): boolean {
    if (
      [
        ConsumptionClass.COMMERCIAL,
        ConsumptionClass.RESIDENTIAL,
        ConsumptionClass.INDUSTRIAL,
      ].includes(consumptionClass)
    ) {
      return true;
    }
    return false;
  }
  private checkTariffModality(tarifModality: TariffModality): boolean {
    if (
      [TariffModality.WHITE, TariffModality.CONVENTIONAL].includes(
        tarifModality
      )
    ) {
      return true;
    }
    return false;
  }

  private checkMinConsumption(
    connectionType: ConnectionType,
    averageConsumption: number
  ): boolean {
    if (
      connectionType === ConnectionType.SINGLE_PHASIC &&
      averageConsumption > 400
    ) {
      return true;
    } else if (
      connectionType === ConnectionType.BIPHASIC &&
      averageConsumption > 500
    ) {
      return true;
    } else if (
      connectionType === ConnectionType.THREE_PHASIC &&
      averageConsumption > 750
    ) {
      return true;
    } else {
      return false;
    }
  }

  private calculateAverageConsumption(consumptions: number[]): number {
    const consumptionSum = consumptions.reduce(
      (consumptionSum, consumptionItem) => {
        return consumptionSum + consumptionItem;
      }
    );
    return consumptionSum / consumptions.length;
  }

  private calculateAnnualCO2Savings(consumptions: number[]): number {
    const consumptionSum = consumptions.reduce(
      (consumptionSum, consumptionItem) => {
        return consumptionSum + consumptionItem;
      }
    );
    return (consumptionSum / 1000) * 84;
  }
}
