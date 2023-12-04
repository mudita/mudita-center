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

export const BlockBox: APIFC<{}, BlockBoxParameters> = ({
  config,
  data,
  children,
  ...props
}) => {
  return (
    <BoxWrapper {...props}>
      {config?.title && <h1>{config.title}</h1>}
      {children}
    </BoxWrapper>
  )
}

const BoxWrapper = styled.div`
  background-color: #ccc;
`
