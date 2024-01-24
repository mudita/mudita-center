/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, withData } from "generic-view/utils"
import React from "react"

interface Data {
  src: string
  alt?: string
}

export const Image: APIFC<Data> = ({ data }) => {
  return <img src={data?.src} alt={data?.alt} />
}

export default withData(Image)
