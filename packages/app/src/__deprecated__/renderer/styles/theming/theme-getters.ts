/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Theme } from "./theme"

export const textColor =
  (name: keyof Theme["color"]["text"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.color.text[name]

export const backgroundColor =
  (name: keyof Theme["color"]["background"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.color.background[name]

export const borderRadius =
  (name: keyof Theme["borderRadius"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.borderRadius[name] + "rem"

export const borderColor =
  (name: keyof Theme["color"]["border"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.color.border[name]

export const opacity =
  (name: keyof Theme["opacity"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.opacity[name]

export const fontWeight =
  (name: keyof Theme["fontWeight"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.fontWeight[name]

export const font =
  (name: keyof Theme["font"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.font[name]

export const height =
  (name: keyof Theme["height"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.height[name]

export const letterSpacing =
  (name: keyof Theme["letterSpacing"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.letterSpacing[name]

export const lineHeight =
  (name: keyof Theme["lineHeight"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.lineHeight[name]

export const minBreakpoint =
  (name: keyof Theme["breakpoint"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.breakpoint[name] + "rem"

export const maxBreakpoint =
  (name: keyof Theme["breakpoint"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.breakpoint[name] - 0.01 + "rem"

export const transitionTime =
  (name: keyof Theme["transitionTime"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.transitionTime[name]

export const boxShadowColor =
  (name: keyof Theme["color"]["boxShadow"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.color.boxShadow[name]

export const transitionTimingFunction =
  (name: keyof Theme["transitionTimingFunction"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.transitionTimingFunction[name]

export const width =
  (name: keyof Theme["width"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    theme.width[name] + "rem"

export const zIndex =
  (name: keyof Theme["zIndex"]) =>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ({ theme }: { theme: Theme }) =>
    theme.zIndex[name]
