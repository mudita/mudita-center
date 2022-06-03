/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RegisterOptions } from "react-hook-form/dist/types"
import { intl } from "Renderer/utils/intl"

export const byteLengthValidator = (): RegisterOptions => ({
  required: intl.formatMessage({ id: "module.templates.required" }),
  validate: (value: string): string | undefined => {
    if (new Blob([value]).size > 469) {
      return intl.formatMessage({ id: "module.templates.tooLong" })
    }
    return
  },
})
