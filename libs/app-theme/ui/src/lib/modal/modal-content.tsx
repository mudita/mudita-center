/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  ModalSizeControllerLarge,
  ModalSizeControllerMedium,
  ModalSizeControllerSmall,
} from "./modal-size-controller"
import { ModalLayer, ModalSize, ModalTestId } from "app-theme/models"
import { ModalVisibilityControllerHidden } from "./modal-visibility-controller"
import {
  ScrollableContent,
  ScrollableContentHeader,
} from "./modal-scrollable-content"
import { TitleIconWrapper } from "./modal-title-icon"
import { FunctionComponent, PropsWithChildren } from "react"
import { ModalClose } from "./modal-close-button"

const getModalSize = (size: ModalSize) => {
  switch (size) {
    case "medium":
      return "48.8rem"
    case "large":
      return "61.4rem"
    case "small":
    default:
      return "38.4rem"
  }
}

const getModalWidth = (size: ModalSize | number, width?: string | number) => {
  if (typeof size === "number") {
    return `${size}rem`
  }
  if (width === undefined) {
    return getModalSize(size)
  }
  return typeof width === "number" ? `${width}px` : width
}

const getModalPadding = (
  size: ModalSize | number,
  padding?: number | string
) => {
  if (padding === undefined) {
    if (typeof size === "number") {
      return 0
    }

    switch (size) {
      case "large":
        return "4.8rem"
      case "small":
      case "medium":
      default:
        return "2.4rem"
    }
  }
  return typeof padding === "number" ? `${padding}px` : padding
}

const getModalMaxHeight = (maxHeight?: string | number) => {
  if (maxHeight === undefined) {
    return "576px"
  }
  return typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
}

const getModalGap = (gap?: string | number) => {
  return typeof gap === "number" ? `${gap}px` : gap
}

const Content = styled.div<{
  $layer: ModalLayer
  $size: ModalSize | number
  $width?: string | number
  $height?: string | number
  $maxHeight?: string | number
  $gap?: string | number
  $padding?: string | number
  $alignItems?: string
}>`
  ${({
    theme,
    $layer,
    $size,
    $padding,
    $width,
    $height,
    $maxHeight,
    $gap,
  }) => css`
    z-index: ${$layer};
    --modal-padding: ${getModalPadding($size, $padding)};
    --modal-width: ${getModalWidth($size, $width)};
    --modal-max-height: ${getModalMaxHeight($maxHeight)};
    --modal-gap: ${getModalGap($gap || theme.app.space.xl)};
    ${$height &&
    css`
      height: ${getModalMaxHeight($height)};
    `};
  `}

  position: relative;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignItems }) => $alignItems};
  padding: var(--modal-padding);
  width: var(--modal-width);
  max-height: var(--modal-max-height);
  opacity: var(--modal-opacity);
  visibility: var(--modal-visibility);
  transition-duration: var(--modal-transition-duration);
  transition-timing-function: var(--modal-transition-timing-function);
  transition-property: opacity, visibility;
  background-color: ${({ theme }) => theme.app.color.white};
  box-shadow: 0 1rem 5rem ${({ theme }) => theme.app.color.blackAlpha.light};
  border-radius: ${({ theme }) => theme.app.radius.sm};

  overflow: hidden;
  gap: var(--modal-gap);
  --gap-reducer: calc(var(--modal-gap) * -1 / 2.4);

  &:has(${ModalSizeControllerSmall}) {
    --modal-width: ${getModalSize(ModalSize.Small)};
  }
  &:has(${ModalSizeControllerMedium}) {
    --modal-width: ${getModalSize(ModalSize.Medium)};
  }
  &:has(${ModalSizeControllerLarge}) {
    --modal-width: ${getModalSize(ModalSize.Large)};
  }

  &:has(${ModalVisibilityControllerHidden}) {
    --modal-opacity: 0;
    --modal-visibility: hidden;
  }

  ${TitleIconWrapper} {
    margin-bottom: var(--gap-reducer);
  }

  > p,
  ${ScrollableContent} > p {
    + p,
    + ul,
    + ol {
      margin-top: var(--gap-reducer);
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li {
    color: ${({ theme }) => theme.app.color.grey1};
  }

  *:not(.text-input) + .text-input[data-variant="filled"] {
    margin-top: var(--modal-gap);
  }

  p {
    text-align: center;
  }

  *:has(${ScrollableContent}) {
    overflow: hidden;
    height: fit-content;
    display: flex;
    flex-direction: column;
  }

  &:has(${ScrollableContentHeader}):not(:has(${ModalClose})) {
    ${ScrollableContentHeader} {
      display: none !important;
    }
  }
`

interface Props extends PropsWithChildren {
  layer?: ModalLayer
  size?: ModalSize | number
  width?: string | number
  height?: string | number
  maxHeight?: string | number
  gap?: string | number
  padding?: string | number
  alignItems?: string
}

export const ModalContent: FunctionComponent<Props> = ({
  layer = ModalLayer.Default,
  size = ModalSize.Small,
  alignItems = "center",
  width,
  height,
  maxHeight,
  gap,
  padding,
  children,
}) => {
  return (
    <Content
      $layer={layer}
      $size={size}
      $width={width}
      $height={height}
      $maxHeight={maxHeight}
      $gap={gap}
      $padding={padding}
      $alignItems={alignItems}
      data-testid={ModalTestId.Modal}
    >
      {children}
    </Content>
  )
}
