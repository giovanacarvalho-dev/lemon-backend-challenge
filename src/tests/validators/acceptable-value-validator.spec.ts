import { InvalidParamError } from "../../presentation/errors";
import { AcceptableValuesValidation } from "../../validation/validators/acceptable-value-validator";

const sut = new AcceptableValuesValidation("test", ["a", "b", "c"]);

describe("Acceptable Value Validation", () => {
  it("Should return an error if not acceptable document is provided", () => {
    const validate = sut.validate({ test: "d" });
    expect(validate).toEqual(new InvalidParamError("test"));
  });

  it("Should dont return if acceptable value is passed", () => {
    const validate = sut.validate({ test: "a" });
    expect(validate).toEqual(undefined);
  });
});
