/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"

interface Image {
  width?: string
  height?: string
  viewBox?: string
  className?: string
}

export interface SvgProps {
  Image: FunctionComponent<Image>
  className?: string
}

export const LegacySvg: FunctionComponent<SvgProps> = ({
  className,
  Image,
}) => {
  const viewBoxData = Image.defaultProps?.viewBox?.split(" ")
  if (!viewBoxData) {
    return <Image className={className} />
  }
  const [, , width, height] = viewBoxData
  return <Image className={className} width={width} height={height} />
}
