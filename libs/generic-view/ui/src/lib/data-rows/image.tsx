/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "generic-view/utils"
import React from "react"
import { withData } from "../utils/with-data"
import { withConfig } from "../utils/with-config"

interface Data {
  src: string
  alt?: string
}

export const Image: APIFC<Data, Data> = ({ data, config }) => {
  const { src, alt } = data || config || {}
  if (!src) return null
  return <img src={src} alt={alt} />
}

export default withConfig(withData(Image))
