/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Children,
  cloneElement,
  ElementType,
  FunctionComponent,
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
} from "react"
import { css } from "styled-components"
import { get } from "lodash"
import { AppColor } from "app-theme/utils"
import { formatMessage } from "app-localize/utils"
import {
  TypographyAlign,
  TypographyModifier,
  TypographyTransform,
  TypographyWeight,
} from "app-theme/models"
import { Translation } from "../shared/translation.type"
import { BytesFormatter } from "./bytes-formatter/bytes-formatter"
import { useOverflowTitle } from "./use-overflow-title"

type Modifier =
  | {
      modifier: TypographyModifier.FormatBytes
      minUnit?: "B" | "KB" | "MB" | "GB" | "TB"
    }
  | {
      modifier?: undefined
      minUnit?: undefined
    }

export type BaseTypographyProps = {
  lines?: number
  textTransform?: TypographyTransform
  textAlign?: TypographyAlign
  weight?: TypographyWeight | "inherit"
  color?: AppColor | "currentColor"
  title?: string
  as?: ElementType
  className?: string
} & Modifier &
  Translation

export const BaseTypography: FunctionComponent<BaseTypographyProps> = memo(
  ({ children, modifier, message, values, ...props }) => {
    const { title, ref } = useOverflowTitle()

    const typography = Children.only(children) as ReactElement<
      BaseTypographyProps &
        PropsWithChildren & { ref?: RefObject<HTMLElement | null> }
    >
    const content = typography?.props?.children
    const modifierEnabled = Boolean(modifier) && Boolean(content)
    const translationEnabled = Boolean(message)

    const parseChildContent = useCallback(
      (content: ReactNode) => {
        switch (modifier) {
          case TypographyModifier.FormatBytes:
            return <BytesFormatter {...props}>{content}</BytesFormatter>
          default:
            return content
        }
      },
      [modifier, props]
    )

    return cloneElement(typography, {
      ref,
      ...props,
      title: props.title ?? title,
      ...(modifierEnabled && {
        children: Children.map(content, parseChildContent),
      }),
      ...(translationEnabled && {
        children: formatMessage({ id: message }, values),
      }),
    })
  }
)

export const baseTypographyStyles = css<BaseTypographyProps>`
  white-space: pre-wrap;

  ${({ lines }) =>
    lines &&
    lines > 0 &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${lines};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}

  ${({ textTransform }) =>
    textTransform &&
    css`
      text-transform: ${textTransform ===
      TypographyTransform.CapitalizeFirstLetter
        ? "lowercase"
        : textTransform} !important;
    `};

  ${({ textTransform }) =>
    textTransform === TypographyTransform.CapitalizeFirstLetter &&
    css`
      &:first-letter {
        text-transform: uppercase !important;
      }
    `}

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign} !important;
    `};

  ${({ weight, theme }) =>
    weight &&
    css`
      font-weight: ${theme.app.fontWeight[
        weight as keyof typeof theme.app.fontWeight
      ]} !important;
    `};

  ${({ theme, color }) =>
    color &&
    css`
      color: ${color === "currentColor"
        ? "currentColor"
        : get(theme.app.color, color)} !important;
    `};
`
