import {
  ICheckCustomerEligibilityAvailableOutput,
  ICheckCustomerEligibilityInput,
  ICheckCustomerEligibilityNotAvailableOutput,
} from "./i-check-customer-elegibility";

export interface ICheckCustomerElegibilityUsecase {
  execute(
    input: ICheckCustomerEligibilityInput
  ): Promise<{
    elegibility: boolean;
    data:
      | ICheckCustomerEligibilityAvailableOutput
      | ICheckCustomerEligibilityNotAvailableOutput;
  }>;
}
