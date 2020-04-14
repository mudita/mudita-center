import React from "react"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Image from "Renderer/components/core/image/image.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

export enum AvatarSize {
  Small,
  Medium,
  Big,
}

export const getSize = (size: AvatarSize) => {
  switch (size) {
    case AvatarSize.Small:
      return 3.2
    case AvatarSize.Medium:
      return 4
    case AvatarSize.Big:
      return 4.8
  }
}

const AvatarImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
`

const AvatarWrapper = styled.div<{ size: AvatarSize; light?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => getSize(size)}rem;
  height: ${({ size }) => getSize(size)}rem;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${({ light }) =>
    light ? backgroundColor("avatarLight") : backgroundColor("avatarDark")};
  text-transform: uppercase;
`

interface User extends Object {
  firstName: string
  lastName: string
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
    ) : user ? (
      <Text
        displayStyle={
          size === AvatarSize.Big
            ? TextDisplayStyle.LargeFadedDimTextCapitalLetters
            : TextDisplayStyle.SmallFadedDimText
        }
      >
        {user.firstName.charAt(0)}
        {user.lastName.charAt(0)}
      </Text>
    ) : (
      <Icon type={Type.Contacts} width={getSize(size) / 2.5} />
    )}
  </AvatarWrapper>
)

export default Avatar
