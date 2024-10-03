/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TooltipPlacement } from "device/models"

export const flipVertical = (placement: TooltipPlacement): TooltipPlacement => {
  return placement.startsWith("bottom")
    ? (`top-${placement.split("-")[1]}` as TooltipPlacement)
    : (`bottom-${placement.split("-")[1]}` as TooltipPlacement)
}

export const flipHorizontal = (
  placement: TooltipPlacement
): TooltipPlacement => {
  return placement.endsWith("right")
    ? (`-${placement.replace("right", "left")}` as TooltipPlacement)
    : (`-${placement.replace("left", "right")}` as TooltipPlacement)
}

export const flipTooltipPlacement = (
  placement: TooltipPlacement
): TooltipPlacement => {
  const [vertical, horizontal] = placement.split("-")
  const flippedVertical = vertical === "bottom" ? "top" : "bottom"
  const flippedHorizontal = horizontal === "right" ? "left" : "right"
  return `${flippedVertical}-${flippedHorizontal}` as TooltipPlacement
}
