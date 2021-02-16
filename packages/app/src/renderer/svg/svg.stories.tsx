/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"

import Svg from "Renderer/components/core/svg/svg.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"

const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  border: 0.1rem solid #000;
`

const BlackSvg = styled(Svg)`
  margin: 1rem;
`

/**
 * any is sick and should be banned, but here importing RequireContext from Webpack triggers * errors.
 */
const requireAll = (requireContext: any) => {
  return requireContext.keys().map((fileName: string) => {
    return {
      fileName,
      component: requireContext(fileName),
    }
  }) as { fileName: string; component: FunctionComponent }[]
}

const allSvgs = requireAll(require.context("..", true, /.svg$/))

storiesOf("Assets/Svg", module).add("Svg", () => {
  return (
    <div style={{ fontSize: "16px" }}>
      {allSvgs.map((svg, index) => {
        return (
          <SvgWrapper key={index}>
            <BlackSvg Image={svg.component} />
            {svg.fileName}
          </SvgWrapper>
        )
      })}
    </div>
  )
})
