/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ImgHTMLAttributes } from "react"
import Image from "App/__deprecated__/renderer/components/core/image/image.component"
import Gif from "App/__deprecated__/renderer/images/loader-transparent.gif"
import styled from "styled-components"

const LoaderImage = styled(Image)`
  object-fit: contain;
`

const LoaderLogo: FunctionComponent<
  ImgHTMLAttributes<HTMLImageElement> & {
    size?: number
  }
> = ({ size = 10, width, height, ...rest }) => (
  <LoaderImage
    data-testid="loader-logo"
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    src={Gif}
    width={width || size * 10}
    height={height || size * 10}
    {...rest}
  />
)

export default LoaderLogo
