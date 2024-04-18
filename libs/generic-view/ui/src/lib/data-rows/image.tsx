/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "generic-view/utils"
import React from "react"
import { ImageConfig, ImageData } from "generic-view/models"

export const Image: APIFC<ImageData, ImageConfig> = ({ data, config }) => {
  const { src, alt } = data || config || {}
  if (!src) return null
  return <img src={src} alt={alt} />
}
