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
import { ScrollableContent } from "./modal-scrollable-content"
import { TitleIconWrapper } from "./modal-title-icon"
import { FunctionComponent, PropsWithChildren } from "react"

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

const getModalWidth = (size: ModalSize, width?: string | number) => {
  if (width === undefined) {
    return getModalSize(size)
  }
  return typeof width === "number" ? `${width}px` : width
}

const getModalPadding = (size: ModalSize, padding?: number | string) => {
  if (padding === undefined) {
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

const listBulletStyle = css`
  &::marker {
    content: url('data:image/svg+xml,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle fill="%233B3F42" r="3.5" cx="5" cy="4"/></svg>');
  }
`

const Content = styled.div<{
  $layer: ModalLayer
  $size: ModalSize
  $width?: string | number
  $maxHeight?: string | number
  $gap?: string | number
  $padding?: string | number
}>`
  ${({ theme, $layer, $size, $padding, $width, $maxHeight, $gap }) => css`
    z-index: ${$layer};
    --modal-padding: ${getModalPadding($size, $padding)};
    --modal-width: ${getModalWidth($size, $width)};
    --modal-max-height: ${getModalMaxHeight($maxHeight)};
    --modal-gap: ${getModalGap($gap || theme.app.space.xl)};
  `}

  position: relative;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  p {
    font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
    text-align: center;
    color: ${({ theme }) => theme.app.color.grey1};
    letter-spacing: 0.02em;
    margin: 0;
    white-space: pre-line;
  }

  > p,
  ${ScrollableContent} > p {
    + p,
    + ul,
    + ol {
      margin-top: var(--gap-reducer);
    }
  }

  ul,
  ol {
    width: 100%;
    margin: 0;
    padding-left: 2.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    li {
      padding: 0.4rem 1.2rem 0.4rem 2.1rem;
      font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
      line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
      letter-spacing: 0.02em;
      color: ${({ theme }) => theme.app.color.grey1};
      text-align: left;
    }
  }

  ul {
    li {
      ${listBulletStyle};
    }
  }

  ol {
    padding-left: 3.5rem;
    li {
      padding-left: 1.5rem;
      &::marker {
        font-variant-numeric: tabular-nums;
      }
    }
  }

  *:has(${ScrollableContent}) {
    overflow: hidden;
    height: fit-content;
    display: flex;
    flex-direction: column;
  }
`

interface Props extends PropsWithChildren {
  layer?: ModalLayer
  size?: ModalSize
  width?: string | number
  maxHeight?: string | number
  gap?: string | number
  padding?: string | number
}

export const ModalContent: FunctionComponent<Props> = ({
  layer = ModalLayer.Default,
  size = ModalSize.Small,
  width,
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
      $maxHeight={maxHeight}
      $gap={gap}
      $padding={padding}
      data-testid={ModalTestId.Modal}
    >
      {children}
    </Content>
  )
}
