/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DefaultTheme } from "styled-components"

export const textColor =
  (name: keyof DefaultTheme["legacy"]["color"]["text"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.color.text[name]

export const backgroundColor =
  (name: keyof DefaultTheme["legacy"]["color"]["background"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.color.background[name]

export const borderRadius =
  (name: keyof DefaultTheme["legacy"]["borderRadius"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.borderRadius[name] + "rem"

export const borderColor =
  (name: keyof DefaultTheme["legacy"]["color"]["border"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.color.border[name]

export const opacity =
  (name: keyof DefaultTheme["legacy"]["opacity"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.opacity[name]

export const fontWeight =
  (name: keyof DefaultTheme["legacy"]["fontWeight"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.fontWeight[name]

export const font =
  (name: keyof DefaultTheme["legacy"]["font"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.font[name]

export const height =
  (name: keyof DefaultTheme["legacy"]["height"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.height[name]

export const letterSpacing =
  (name: keyof DefaultTheme["legacy"]["letterSpacing"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.letterSpacing[name]

export const lineHeight =
  (name: keyof DefaultTheme["legacy"]["lineHeight"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.lineHeight[name]

export const minBreakpoint =
  (name: keyof DefaultTheme["legacy"]["breakpoint"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.breakpoint[name] + "rem"

export const maxBreakpoint =
  (name: keyof DefaultTheme["legacy"]["breakpoint"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.breakpoint[name] - 0.01 + "rem"

export const transitionTime =
  (name: keyof DefaultTheme["legacy"]["transitionTime"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.transitionTime[name]

export const boxShadowColor =
  (name: keyof DefaultTheme["legacy"]["color"]["boxShadow"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.color.boxShadow[name]

export const transitionTimingFunction =
  (name: keyof DefaultTheme["legacy"]["transitionTimingFunction"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.transitionTimingFunction[name]

export const width =
  (name: keyof DefaultTheme["legacy"]["width"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.width[name] + "rem"

export const zIndex =
  (name: keyof DefaultTheme["legacy"]["zIndex"]) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.legacy.zIndex[name]
