import theme from "Renderer/styles/theming/theme"

/**
 * Util returning transition propety taken from theme defaults.
 * Easy to everwrite.
 *
 * @param property - propety that should be transitioned
 * @param time - transition time in ms
 * @param timingFunction - transition timing function
 */
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
