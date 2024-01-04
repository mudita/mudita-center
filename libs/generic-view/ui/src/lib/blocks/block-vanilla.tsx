/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"

export const BlockVanilla: APIFC = ({ config, data, ...props }) => {
  return <BoxWrapper {...props} />
}

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
`
