import { CheckCustomerElegibilityController } from "../../presentation/controllers";
import { IController } from "../../presentation/protocols";
import { CheckCustomerElegibilityUsecase } from "../../usecases/check-customer-elegibility-usecase";
import { makeCheckElegibilityValidation } from "./check-customer-elegibility-validation-factory";

export const makeCheckCustomerElegibilityController = (): IController => {
  return new CheckCustomerElegibilityController(
    new CheckCustomerElegibilityUsecase(),
    makeCheckElegibilityValidation()
  );
};
