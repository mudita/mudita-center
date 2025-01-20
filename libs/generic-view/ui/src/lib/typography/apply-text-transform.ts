/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatBytes } from "./format-bytes"
import { TextTransformOptions, TextTransformTypes } from "generic-view/models"

export const applyTextTransform = (
  text = "",
  transformType?: TextTransformTypes,
  textTransformOptions?: TextTransformOptions
): string => {
  switch (transformType) {
    case "format-bytes":
      return formatBytes(Number(text), textTransformOptions)
    default:
      return text
  }
}
