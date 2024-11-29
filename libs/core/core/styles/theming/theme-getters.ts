/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppTheme } from "Root/app-theme"

export const textColor =
  (name: keyof AppTheme["core"]["color"]["text"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.color.text[name]

export const backgroundColor =
  (name: keyof AppTheme["core"]["color"]["background"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.color.background[name]

export const borderRadius =
  (name: keyof AppTheme["core"]["borderRadius"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.core.borderRadius[name] + "rem"

export const borderColor =
  (name: keyof AppTheme["core"]["color"]["border"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.color.border[name]

export const opacity =
  (name: keyof AppTheme["core"]["opacity"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.opacity[name]

export const fontWeight =
  (name: keyof AppTheme["core"]["fontWeight"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.fontWeight[name]

export const font =
  (name: keyof AppTheme["core"]["font"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.font[name]

export const height =
  (name: keyof AppTheme["core"]["height"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.height[name]

export const letterSpacing =
  (name: keyof AppTheme["core"]["letterSpacing"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.letterSpacing[name]

export const lineHeight =
  (name: keyof AppTheme["core"]["lineHeight"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.lineHeight[name]

export const minBreakpoint =
  (name: keyof AppTheme["core"]["breakpoint"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.core.breakpoint[name] + "rem"

export const maxBreakpoint =
  (name: keyof AppTheme["core"]["breakpoint"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.core.breakpoint[name] - 0.01 + "rem"

export const transitionTime =
  (name: keyof AppTheme["core"]["transitionTime"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.transitionTime[name]

export const boxShadowColor =
  (name: keyof AppTheme["core"]["color"]["boxShadow"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.color.boxShadow[name]

export const transitionTimingFunction =
  (name: keyof AppTheme["core"]["transitionTimingFunction"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.transitionTimingFunction[name]

export const width =
  (name: keyof AppTheme["core"]["width"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.core.width[name] + "rem"

export const zIndex =
  (name: keyof AppTheme["core"]["zIndex"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: AppTheme }) =>
    theme.core.zIndex[name]
