/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import { devicesImages } from "./img"
import {
  DeviceImageColor,
  DeviceImageSize,
  DeviceImageType,
} from "devices/common/models"

type Props = {
  type: DeviceImageType
  color?: DeviceImageColor
  size?: DeviceImageSize
} & Omit<ComponentProps<typeof Image>, "$size">

export const DeviceImage: FunctionComponent<Props> = ({
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

  return (
    <Image
      src={devicesImages[type][imageColor][imageSize]}
      $size={imageSize}
      {...rest}
    />
  )
}

const Image = styled.img<{ $size: string }>`
  height: ${({ $size }) => ($size === "big" ? "100%" : "9.6rem")};
  width: ${({ $size }) => ($size === "big" ? "100%" : "9.1rem")};
  max-height: 100%;
  max-width: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
`
