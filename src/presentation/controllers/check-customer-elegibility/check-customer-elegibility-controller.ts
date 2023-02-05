import { ICheckCustomerEligibilityInput } from "../../../usecases/protocols/i-check-customer-elegibility";
import { ICheckCustomerElegibilityUsecase } from "../../../usecases/protocols/i-check-customer-elegibility-usecase";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpResponse, IController, IValidation } from "../../protocols";

export class CheckCustomerElegibilityController implements IController {
  constructor(
    private CheckCustomerElegibility: ICheckCustomerElegibilityUsecase,
    private validation: IValidation
  ) {}
  async handle(
    request: CheckCustomerElegibilityController.Request
  ): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const response = await this.CheckCustomerElegibility.execute(request);
      return ok({
        elegibilidade: response.elegibility,
        ...response.data,
      });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export namespace CheckCustomerElegibilityController {
  export type Request = ICheckCustomerEligibilityInput;
}
