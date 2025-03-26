/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { LegacyImage } from "app-theme/models"

export interface SvgProps {
  Image: FunctionComponent<LegacyImage>
  className?: string
}

export const LegacySvg: FunctionComponent<SvgProps> = ({
  className,
  Image,
}) => {
  return <Image className={className} />
}
