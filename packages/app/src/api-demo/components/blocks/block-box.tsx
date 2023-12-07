/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "../../models/api-fc.types"

interface BlockBoxParameters {
  title?: string
}

export const BlockBox: APIFC<undefined, BlockBoxParameters> = ({
  config,
  data,
  children,
  ...props
}) => {
  return (
    <BoxWrapper {...props} className={"custom"}>
      {config?.title && <h1>{config.title}</h1>}
      {children}
    </BoxWrapper>
  )
}

const BoxWrapper = styled.div`
  &.custom {
    height: 90%;
  }

  background-color: #ccc;
`
