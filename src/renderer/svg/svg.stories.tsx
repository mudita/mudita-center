// @ts-nocheck
import { storiesOf } from "@storybook/react"
import * as React from "react"

const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}

const allSvgs = requireAll(require.context("..", true, /.svg$/))

storiesOf("Assets|Svg", module).add("Svg", () => {
  return (
    <div style={{ background: "black" }}>
      {allSvgs.map((Svg, index) => (
        <Svg key={index} />
      ))}
    </div>
  )
})
