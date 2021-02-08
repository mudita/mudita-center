import React from "react"
import styled, { css } from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import Image from "Renderer/components/core/image/image.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

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
      return 3.2
    case AvatarSize.Big:
      return 4.8
  }
}

const getAvatarTextStyle = (size: AvatarSize): TextDisplayStyle => {
  switch (size) {
    case AvatarSize.Small:
      return TextDisplayStyle.SmallFadedDimText
    case AvatarSize.Medium:
      return TextDisplayStyle.SmallFadedDimText
    case AvatarSize.Big:
      return TextDisplayStyle.LargeFadedDimTextCapitalLetters
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
  id?: string
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
      <AvatarImage data-testid="avatar-image" src={imageSrc} />
    ) : user?.firstName || user?.lastName ? (
      <Text displayStyle={getAvatarTextStyle(size)}>
        {user.firstName?.charAt(0)}
        {user.lastName?.charAt(0)}
      </Text>
    ) : (
      <Icon type={Type.Contact} width={getAvatarSize(size) / 1.5} />
    )}
  </AvatarWrapper>
)

export default Avatar
