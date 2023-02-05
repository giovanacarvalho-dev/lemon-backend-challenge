import { InvalidParamError } from "../../presentation/errors";
import { IValidation } from "../../presentation/protocols";

export class AcceptableValuesValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly acceptableValues: string[]
  ) {}

  validate(input: any): Error | void {
    if (!this.acceptableValues.includes(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
