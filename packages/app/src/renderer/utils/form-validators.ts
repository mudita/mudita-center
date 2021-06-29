/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RegisterOptions } from "react-hook-form/dist/types"
import { intl } from "Renderer/utils/intl"

export const phoneNumberValidator: RegisterOptions = {
  minLength: {
    value: 5,
    message: intl.formatMessage(
      { id: "component.formErrorTooShort" },
      { minLength: 5 }
    ),
  },
  maxLength: {
    value: 15,
    message: intl.formatMessage(
      { id: "component.formErrorTooLong" },
      { maxLength: 15 }
    ),
  },
  pattern: {
    value: /^(\+?)(\d(\s?\d)+)$/im,
    message: intl.formatMessage({
      id: "component.formErrorNumbersAndSpacesOnly",
    }),
  },
}

export const emailValidator: RegisterOptions = {
  pattern: {
    value: /^\S+@\S+(\.\S+)+$/im,
    message: intl.formatMessage({ id: "component.formErrorInvalidEmail" }),
  },
  required: intl.formatMessage({ id: "component.formErrorRequiredEmail" }),
}
