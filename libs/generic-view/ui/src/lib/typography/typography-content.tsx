/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { isEmpty } from "lodash"
import { APIFC } from "generic-view/utils"
import {
  isValidFormatMessageConfig,
  isValidFormatMessageData,
  TypographyConfig,
  TypographyData,
} from "generic-view/models"
import { applyTextTransform } from "./apply-text-transform"
import { FormatMessage } from "../interactive/format-message"

export const TypographyContent: APIFC<TypographyData, TypographyConfig> = ({
  config,
  data,
  children,
}) => {
  if (!isEmpty(children)) {
    return children
  }

  if (isValidFormatMessageConfig(config) && isValidFormatMessageData(data)) {
    return <FormatMessage config={config} data={data} />
  }

  const text = data?.text ?? config?.text

  return applyTextTransform(
    text,
    config?.textTransform,
    config?.textTransformOptions
  )
}
