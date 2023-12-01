/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "../../models/api-fc.types"

export const BlockVanilla: APIFC = (props) => {
  return <BoxWrapper {...props} />
}

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
`
