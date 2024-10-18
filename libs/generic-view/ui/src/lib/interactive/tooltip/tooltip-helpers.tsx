/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TooltipPlacement } from "device/models"

type PlacementMap = { [key in TooltipPlacement]: TooltipPlacement }

const VERTICAL_FLIP_MAP: PlacementMap = {
  "bottom-right": "top-right",
  "bottom-left": "top-left",
  "top-right": "bottom-right",
  "top-left": "bottom-left",
}

const HORIZONTAL_FLIP_MAP: PlacementMap = {
  "bottom-right": "bottom-left",
  "bottom-left": "bottom-right",
  "top-right": "top-left",
  "top-left": "top-right",
}

export const flipVertical = (placement: TooltipPlacement): TooltipPlacement => {
  return VERTICAL_FLIP_MAP[placement]
}

export const flipHorizontal = (
  placement: TooltipPlacement
): TooltipPlacement => {
  return HORIZONTAL_FLIP_MAP[placement]
}

export const flipTooltipPlacement = (
  placement: TooltipPlacement
): TooltipPlacement => {
  return flipHorizontal(flipVertical(placement))
}

export const getFlipStatus = (
  original: TooltipPlacement,
  current: TooltipPlacement
): { isFlippedVertically: boolean; isFlippedHorizontally: boolean } => {
  const isFlippedVertically = VERTICAL_FLIP_MAP[original] === current
  const isFlippedHorizontally = HORIZONTAL_FLIP_MAP[original] === current

  return { isFlippedVertically, isFlippedHorizontally }
}
