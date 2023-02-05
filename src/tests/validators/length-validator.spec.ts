import { InvalidParamError } from "../../presentation/errors";
import { LengthlValidation } from "../../validation/validators/length-validator";

const sut = new LengthlValidation("test", 5, 10);

describe("Length Validation", () => {
  it("Should return an error if not min length is provided", () => {
    const validate = sut.validate({ test: ["a"] });
    expect(validate).toEqual(new InvalidParamError("test"));
  });

  it("Should return an error if not max length is provided", () => {
    const validate = sut.validate({
      test: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "w",
      ],
    });
    expect(validate).toEqual(new InvalidParamError("test"));
  });

  it("Should dont return if acceptable length is passed", () => {
    const validate = sut.validate({ test: ["a", "b", "c", "d", "e", "f"] });
    expect(validate).toEqual(undefined);
  });
});
