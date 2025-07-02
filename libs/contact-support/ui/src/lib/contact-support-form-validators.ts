/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { RegisterOptions } from "react-hook-form"
import { formatMessage } from "app-localize/utils"

const messages = defineMessages({
  emailErrorInvalid: {
    id: "general.contactSupport.formModal.emailErrorInvalid",
  },
  emailErrorRequired: {
    id: "general.contactSupport.formModal.emailErrorRequired",
  },
})

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const contactSupportEmailValidator: RegisterOptions = {
  pattern: {
    value: emailRegexp,
    message: formatMessage(messages.emailErrorInvalid),
  },
  required: formatMessage(messages.emailErrorRequired),
}
