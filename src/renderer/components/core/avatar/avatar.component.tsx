import React from "react"
import { AvatarProps } from "Renderer/components/core/avatar/avatar.interface"
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

const AvatarWrapper = styled.div<{ size: AvatarSize; light: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => getSize(size)}rem;
  height: ${({ size }) => getSize(size)}rem;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${backgroundColor("avatarDark")};
  text-transform: uppercase;
`

const Avatar: FunctionComponent<AvatarProps> = ({
  className,
  size = AvatarSize.Medium,
  text,
  imageSrc,
  light,
}) => (
  <AvatarWrapper className={className} size={size} light={Boolean(light)}>
    {Boolean(text) ? (
      <Text
        displayStyle={
          size === AvatarSize.Big
            ? TextDisplayStyle.LargeFadedDimTextCapitalLetters
            : TextDisplayStyle.SmallFadedDimText
        }
      >
        {text}
      </Text>
    ) : Boolean(imageSrc) ? (
      <AvatarImage data-testid="avatar-image" src={imageSrc} />
    ) : (
      <Icon type={Type.Contacts} width={getSize(size) / 2.5} />
    )}
  </AvatarWrapper>
)

export default Avatar
