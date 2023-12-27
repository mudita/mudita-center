/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, withConfig } from "generic-view/utils"

interface BlockBoxParameters {
  title?: string
}

const BlockBox: APIFC<undefined, BlockBoxParameters> = ({
  config,
  data,
  children,
  className,
  ...props
}) => {
  return (
    <BoxWrapper {...props} className={`${className} custom`}>
      {config?.title && <h1>{config.title}</h1>}
      {children}
    </BoxWrapper>
  )
}

export default withConfig(BlockBox)

const BoxWrapper = styled.div`
  &.custom {
    height: 90%;
  }

  background-color: #ccc;
`
