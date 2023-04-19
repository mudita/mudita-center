/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RegisterOptions } from "react-hook-form/dist/types"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { AddressNameLength, MaxNameLength } from "App/contacts/constants"
import { Contact } from "App/contacts/reducers/contacts.interface"

export const phoneNumberRegexp = /^[+\d]*$/im

export const passwordRegexp =
  /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

export const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const primaryPhoneNumberValidator = (
  fields: Contact
): RegisterOptions => ({
  minLength: {
    value: 1,
    message: intl.formatMessage(
      { id: "component.formErrorTooShort" },
      { minLength: 1 }
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
      id: "component.formErrorDigitsAndPlusOnly",
    }),
  },
  validate: (value: string): string | undefined => {
    if (value.length > 0 && value === fields.secondaryPhoneNumber) {
      return intl.formatMessage({
        id: "component.formErrorNumberUnique",
      })
    }

    return
  },
})

export const secondaryPhoneNumberValidator = (
  fields: Contact
): RegisterOptions => ({
  minLength: {
    value: 1,
    message: intl.formatMessage(
      { id: "component.formErrorTooShort" },
      { minLength: 1 }
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
      id: "component.formErrorDigitsAndPlusOnly",
    }),
  },
  validate: (value: string): string | undefined => {
    if (value.length > 0 && value === fields.primaryPhoneNumber) {
      return intl.formatMessage({
        id: "component.formErrorNumberUnique",
      })
    }

    return
  },
})

export const emailValidator: RegisterOptions = {
  pattern: {
    value: emailRegexp,
    message: intl.formatMessage({ id: "component.formErrorInvalidEmail" }),
  },
  required: intl.formatMessage({ id: "component.formErrorRequiredEmail" }),
}

export const emailValidatorNotRequired: RegisterOptions = {
  pattern: {
    value: emailRegexp,
    message: intl.formatMessage({ id: "component.formErrorInvalidEmail" }),
  },
}

export const backupSecretKeyValidator = {
  required: {
    value: true,
    message: intl.formatMessage({
      id: "module.overview.backupSecretKeyRequired",
    }),
  },
  pattern: {
    value: passwordRegexp,
    message: intl.formatMessage({
      id: "module.overview.backupSecretKeyValidation",
    }),
  },
}

export const nameValidator: RegisterOptions = {
  maxLength: {
    value: MaxNameLength,
    message: intl.formatMessage(
      {
        id: "component.formErrorTooLong",
      },
      { maxLength: MaxNameLength }
    ),
  },
}

export const addressValidator: RegisterOptions = {
  maxLength: {
    value: AddressNameLength,
    message: intl.formatMessage(
      {
        id: "component.formErrorTooLong",
      },
      { maxLength: AddressNameLength }
    ),
  },
}
