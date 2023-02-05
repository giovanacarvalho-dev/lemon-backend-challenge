import { InvalidParamError } from "../../presentation/errors";
import { DocumentlValidation } from "../../validation/validators/document-validator";

const sut = new DocumentlValidation("document");

describe("Document Validation", () => {
  it("Should return an error if not numeric document is provided", () => {
    const validate = sut.validate({ document: "asdf" });
    expect(validate).toEqual(new InvalidParamError("document"));
  });

  it("Should return an error if document with invalid length is provided", () => {
    const validate = sut.validate({ document: "123" });
    expect(validate).toEqual(new InvalidParamError("document"));
  });

  it("Should dont return if document with 11 numbers is provided", () => {
    const validate = sut.validate({ document: "12345123456" });
    expect(validate).toEqual(undefined);
  });

  it("Should dont return if document with 14 numbers is provided", () => {
    const validate = sut.validate({ document: "12345123456123" });
    expect(validate).toEqual(undefined);
  });
});
