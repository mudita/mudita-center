import { RegisterOptions } from "react-hook-form/dist/types"
import { intl } from "Renderer/utils/intl"

export const phoneNumberValidator: RegisterOptions = {
  minLength: {
    value: 5,
    message: intl.formatMessage(
      { id: "form.error.tooShort" },
      { minLength: 5 }
    ),
  },
  maxLength: {
    value: 15,
    message: intl.formatMessage(
      { id: "form.error.tooLong" },
      { maxLength: 15 }
    ),
  },
  pattern: {
    value: /^(\+?)(\d(\s?\d)+)$/im,
    message: intl.formatMessage({
      id: "form.error.phoneNumber.numbersAndSpacesOnly",
    }),
  },
}

export const emailValidator: RegisterOptions = {
  pattern: {
    value: /^\S+@\S+(\.\S+)+$/im,
    message: intl.formatMessage({ id: "form.error.invalidEmail" }),
  },
}
