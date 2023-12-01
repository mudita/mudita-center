/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ImgHTMLAttributes } from "react"
import * as React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"

const Image: FunctionComponent<ImgHTMLAttributes<HTMLImageElement>> = ({
  alt = "",
  ...rest
}) => <img alt={alt} {...rest} />

export default Image
