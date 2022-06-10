/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Image from "App/__deprecated__/renderer/components/core/image/image.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { AvatarTestIds } from "App/__deprecated__/renderer/components/core/avatar/avatar-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export enum AvatarSize {
  Small,
  Medium,
  Big,
}

export const getAvatarSize = (size: AvatarSize): number => {
  switch (size) {
    case AvatarSize.Small:
      return 2.4
    case AvatarSize.Medium:
      return 4
    case AvatarSize.Big:
      return 4.8
  }
}

const getAvatarTextStyle = (size: AvatarSize): TextDisplayStyle => {
  switch (size) {
    case AvatarSize.Small:
      return TextDisplayStyle.Headline5
    case AvatarSize.Medium:
      return TextDisplayStyle.Headline5
    case AvatarSize.Big:
      return TextDisplayStyle.Headline4
  }
}

export const basicAvatarStyles = css<{ size?: AvatarSize }>`
  display: flex;
  width: ${({ size = AvatarSize.Small }) => getAvatarSize(size)}rem;
  height: ${({ size = AvatarSize.Small }) => getAvatarSize(size)}rem;
  border-radius: 50%;
  background-color: ${backgroundColor("minor")};
`

const AvatarImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
`

const AvatarWrapper = styled.div<{ size: AvatarSize; light?: boolean }>`
  ${basicAvatarStyles};

  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ light }) =>
    light ? backgroundColor("row") : backgroundColor("minor")};
  text-transform: uppercase;
  transition: background-color ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};
`

export interface User {
  firstName?: string
  lastName?: string
}

export interface AvatarProps {
  size?: AvatarSize
  light?: boolean
  imageSrc?: string
  user?: User
}

const Avatar: FunctionComponent<AvatarProps> = ({
  className,
  size = AvatarSize.Medium,
  imageSrc,
  light,
  user,
}) => (
  <AvatarWrapper className={className} size={size} light={light}>
    {imageSrc ? (
      <AvatarImage data-testid={AvatarTestIds.AvatarImage} src={imageSrc} />
    ) : user?.firstName || user?.lastName ? (
      <Text
        displayStyle={getAvatarTextStyle(size)}
        data-testid={AvatarTestIds.AvatarText}
        color="disabled"
      >
        {user.firstName?.charAt(0)}
        {user.lastName?.charAt(0)}
      </Text>
    ) : (
      <Icon type={IconType.ContactFilled} width={getAvatarSize(size) / 1.8} />
    )}
  </AvatarWrapper>
)

export default Avatar
