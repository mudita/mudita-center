/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// eslint-disable-next-line @nx/enforce-module-boundaries
import { legacyTheme } from "../../../../app-theme/feature/src/lib/legacy-theme"

/**
 * Util returning transition property taken from theme defaults.
 * Easy to overwrite.
 *
 * @param property - property that should be transitioned
 * @param time - transition time in ms
 * @param timingFunction - transition timing function
 */
export const transition = (
  property: string,
  time: string = legacyTheme.transitionTime.standard,
  timingFunction: string = legacyTheme.transitionTimingFunction.standard
) => {
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
