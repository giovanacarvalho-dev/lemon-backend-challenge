import { InvalidParamError } from "../../presentation/errors";
import { IValidation } from "../../presentation/protocols";

export class LengthlValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly minValue: number,
    private readonly maxValue: number
  ) {}

  validate(input: any): Error | void {
    if (
      input[this.fieldName].length < this.minValue ||
      input[this.fieldName].length > this.maxValue
    ) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
