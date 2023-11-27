/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "App/api-demo/models/api-fc.types"
import React from "react"
import styled from "styled-components"

interface BoxProperties {
  title?: string
}

export const BlockBox: APIFC<BoxProperties> = ({ parameters, children }) => {
  return (
    <BoxWrapper>
      {parameters.title && <h1>{parameters.title}</h1>}
      {children}
    </BoxWrapper>
  )
}

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #9fc7ef;
`
