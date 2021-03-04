/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"

export interface SvgProps {
  Image: FunctionComponent<ImageInterface>
}

const Svg: FunctionComponent<SvgProps> = ({ className, Image }) => {
  const viewBoxData = Image.defaultProps?.viewBox?.split(" ")
  if (!viewBoxData) {
    return <Image className={className} />
  }
  const [, , width, height] = viewBoxData
  return <Image className={className} width={width} height={height} />
}

export default Svg
