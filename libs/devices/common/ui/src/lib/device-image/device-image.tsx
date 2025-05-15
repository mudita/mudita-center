/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { devicesImages } from "./img"
import {
  DeviceImageColor,
  DeviceImageSize,
  DeviceImageType,
} from "devices/common/models"

interface Kompakt {
  device: DeviceImageType.Kompakt
  color?: DeviceImageColor.Black
}

interface Harmony1 {
  device: DeviceImageType.Harmony1
  color?: DeviceImageColor.White
}

interface Harmony2 {
  device: DeviceImageType.Harmony2
  color?: DeviceImageColor.Black
}

interface Pure {
  device: DeviceImageType.Pure
  color?: DeviceImageColor
}

type Props = (Kompakt | Harmony1 | Harmony2 | Pure) & {
  size?: DeviceImageSize
}

export const DeviceImage: FunctionComponent<Props> = (device) => {
  if (!devicesImages[device.device]) {
    return null
  }
  const colors = devicesImages[device.device]
  const size = device.size || DeviceImageSize.Big
  const color = (
    device.color && device.color in colors
      ? device.color
      : Object.keys(colors)[0]
  ) as keyof typeof colors

  return <Image src={devicesImages[device.device][color][size]} $size={size} />
}

const Image = styled.img<{ $size: string }>`
  height: ${({ $size }) => ($size === "big" ? "100%" : "9.6rem")};
  width: ${({ $size }) => ($size === "big" ? "100%" : "9.1rem")};
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: block;
  object-fit: contain;
  object-position: center;
`
