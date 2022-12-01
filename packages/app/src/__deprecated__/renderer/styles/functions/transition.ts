/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import theme from "App/__deprecated__/renderer/styles/theming/theme"

/**
 * Util returning transition property taken from theme defaults.
 * Easy to overwrite.
 *
 * @param property - property that should be transitioned
 * @param time - transition time in ms
 * @param timingFunction - transition timing function
 */
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function transition(
  property: string,
  time: string = theme.transitionTime.standard,
  timingFunction: string = theme.transitionTimingFunction.standard
) {
  if (property && property !== "all") {
    return `${property} ${time} ${timingFunction}`
  }
  if (property === "all") {
    console.warn("transition: property can't be all")
    return
  }
  console.warn("transition: pass property")
  return
}
