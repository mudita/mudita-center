/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "generic-view/utils"
import React from "react"

interface Data {
  src: string
  alt?: string
}

export const Image: APIFC<Data, Data> = ({ data, config }) => {
  const { src, alt } = data || config || {}
  if (!src) return null
  return <img src={src} alt={alt} />
}

export default Image
