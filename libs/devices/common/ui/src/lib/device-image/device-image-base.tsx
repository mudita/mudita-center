/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import {
  DeviceImageColor,
  DeviceImageSize,
  DeviceImageType,
} from "devices/common/models"
import { devicesImages } from "./img"

type Props = {
  type: DeviceImageType
  color?: DeviceImageColor
  size?: DeviceImageSize
} & Omit<ComponentProps<typeof Image>, "$size">

export const DeviceImageBase: FunctionComponent<Props> = ({
  type,
  color,
  size,
  ...rest
}) => {
  if (!devicesImages[type]) {
    return null
  }
  const colors = devicesImages[type]
  const imageSize = size || DeviceImageSize.Big
  const imageColor = (
    color && color in colors ? color : Object.keys(colors)[0]
  ) as keyof typeof colors

  return <Image src={devicesImages[type][imageColor][imageSize]} {...rest} />
}

const Image = styled.img`
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
`
