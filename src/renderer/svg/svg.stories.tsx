/* TODO: load all .svg files from ./svg directory and render them in story */
// @ts-nocheck
import { storiesOf } from "@storybook/react"
import * as React from "react"

const req = require.context(".", true, /.svg$/)

storiesOf("Assets|Svg", module).add("Svg", () => {
  req.keys().forEach(svg => {
    const Component = require.context(svg).default
    console.log(Component)

    return <Component height={25} width={25} />
  })
})
