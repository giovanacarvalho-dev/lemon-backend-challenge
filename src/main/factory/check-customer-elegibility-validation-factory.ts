import { IValidation } from "../../presentation/protocols";
import { RequiredFieldValidation } from "../../validation/required-field-validation";
import { ValidationComposite } from "../../validation/validation-composite";
import { AcceptableValuesValidation } from "../../validation/validators/acceptable-value-validator";
import { DocumentlValidation } from "../../validation/validators/document-validator";
import { LengthlValidation } from "../../validation/validators/length-validator";

export const makeCheckElegibilityValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of [
    "numeroDoDocumento",
    "tipoDeConexao",
    "classeDeConsumo",
    "modalidadeTarifaria",
    "historicoDeConsumo",
  ]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new DocumentlValidation("numeroDoDocumento"));
  validations.push(
    new AcceptableValuesValidation("tipoDeConexao", [
      "monofasico",
      "bifasico",
      "trifasico",
    ])
  );
  validations.push(
    new AcceptableValuesValidation("classeDeConsumo", [
      "residencial",
      "industrial",
      "comercial",
      "rural",
      "poderPublico",
    ])
  );
  validations.push(
    new AcceptableValuesValidation("modalidadeTarifaria", [
      "azul",
      "branca",
      "verde",
      "convencional",
    ])
  );
  validations.push(new LengthlValidation("historicoDeConsumo", 3, 12));
  return new ValidationComposite(validations);
};
