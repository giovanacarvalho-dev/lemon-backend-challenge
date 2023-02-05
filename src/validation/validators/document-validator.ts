import { InvalidParamError } from "../../presentation/errors";
import { IValidation } from "../../presentation/protocols";

export class DocumentlValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | void {
    const cpfRegex = new RegExp("^\\d{11}$");
    const cnpjRegex = new RegExp("^\\d{14}$");
    if (
      !input[this.fieldName].match(cpfRegex) &&
      !input[this.fieldName].match(cnpjRegex)
    ) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
