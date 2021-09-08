/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RegisterOptions } from "react-hook-form/dist/types"
import { intl } from "Renderer/utils/intl"

export const phoneNumberRegexp = /^(\+?)(\d(\s?\d)+)$/im

export const primaryPhoneNumberValidator = (
  fields: Record<any, any>
): RegisterOptions => ({
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
    value: phoneNumberRegexp,
    message: intl.formatMessage({
      id: "component.formErrorNumbersAndSpacesOnly",
    }),
  },
  validate: (value): string | undefined => {
    if (value === fields.secondaryPhoneNumber) {
      return intl.formatMessage({
        id: "component.formErrorNumberUnique",
      })
    }

    return
  },
})

export const secondaryPhoneNumberValidator = (
  fields: Record<any, any>
): RegisterOptions => ({
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
    value: phoneNumberRegexp,
    message: intl.formatMessage({
      id: "component.formErrorNumbersAndSpacesOnly",
    }),
  },
  validate: (value): string | undefined => {
    if (value === fields.primaryPhoneNumber) {
      return intl.formatMessage({
        id: "component.formErrorNumberUnique",
      })
    }

    return
  },
})

export const emailValidator: RegisterOptions = {
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: intl.formatMessage({ id: "component.formErrorInvalidEmail" }),
  },
  required: intl.formatMessage({ id: "component.formErrorRequiredEmail" }),
}
