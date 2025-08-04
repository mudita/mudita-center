/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { Icon } from "app-theme/ui"
import { IconSize, IconType } from "app-theme/models"
import { DeviceImageSize } from "devices/common/models"
import { DeviceImageBase } from "./device-image-base"

interface Props extends ComponentProps<typeof DeviceImageBase> {
  spinner?: boolean
}

export const DeviceImage: FunctionComponent<Props> = ({
  spinner = false,
  className,
  type,
  color,
  size = DeviceImageSize.Small,
}) => {
  return (
    <Wrapper className={className} $size={size}>
      {spinner ? (
        <Icon type={IconType.Spinner} size={IconSize.Large} />
      ) : (
        <Image size={size} color={color} type={type} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $size: string }>`
  height: ${({ $size }) => ($size === "big" ? "100%" : "9.6rem")};
  width: ${({ $size }) => ($size === "big" ? "100%" : "9.1rem")};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled(DeviceImageBase)`
  ${({ size }) =>
    size === "big" &&
    css`
      align-self: end;
      object-position: center bottom;
    `}
`
