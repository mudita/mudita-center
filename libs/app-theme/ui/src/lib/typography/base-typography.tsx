/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Children,
  cloneElement,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  RefObject,
} from "react"
import { css } from "styled-components"
import { AppColor } from "app-theme/utils"
import { get } from "lodash"
import {
  TypographyAlign,
  TypographyModifier,
  TypographyTransform,
} from "app-theme/models"
import { BytesFormatter } from "./bytes-formatter/bytes-formatter"
import { useOverflowTitle } from "./use-overflow-title"

type Modifier = {
  modifier?: TypographyModifier.FormatBytes
  minUnit?: "B" | "KB" | "MB" | "GB" | "TB"
}

export type BaseTypographyProps = Modifier & {
  singleLine?: boolean
  textTransform?: TypographyTransform
  textAlign?: TypographyAlign
  unbold?: boolean
  color?: AppColor
  title?: string
}

export const BaseTypography: FunctionComponent<
  BaseTypographyProps & PropsWithChildren
> = ({ children, modifier, ...props }) => {
  const { title, ref } = useOverflowTitle()

  const child = Children.only(children) as ReactElement<
    BaseTypographyProps &
      PropsWithChildren & { ref?: RefObject<HTMLElement | null> }
  >
  if (!child) return null

  const content = child?.props?.children
  let innerChildren: ReactNode

  switch (modifier) {
    case TypographyModifier.FormatBytes:
      innerChildren = <BytesFormatter {...props}>{content}</BytesFormatter>
      break
    default:
      innerChildren = content
  }

  return cloneElement(child, {
    ref,
    ...props,
    title: props.title ?? title,
    children: innerChildren,
  })
}

export const baseTypographyStyles = css<BaseTypographyProps>`
  ${({ singleLine }) =>
    singleLine &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}

  text-transform: ${({ textTransform = "inherit" }) =>
    textTransform === TypographyTransform.CapitalizeFirstLetter
      ? "lowercase"
      : textTransform} !important;

  ${({ textTransform }) =>
    textTransform === TypographyTransform.CapitalizeFirstLetter &&
    css`
      &:first-letter {
        text-transform: uppercase !important;
      }
    `}

  text-align: ${({ textAlign = "inherit" }) => textAlign} !important;

  ${({ unbold }) =>
    unbold &&
    css`
      font-weight: ${({ theme }) => theme.app.fontWeight.regular} !important;

      b,
      strong {
        font-weight: ${({ theme }) => theme.app.fontWeight.bold} !important;
      }
    `}

  ${({ theme, color }) =>
    color &&
    css`
      color: ${get(theme.app.color, color)} !important;
    `};
`
