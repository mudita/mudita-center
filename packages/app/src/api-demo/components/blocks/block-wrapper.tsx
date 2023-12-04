/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "../../models/api-fc.types"
import styled from "styled-components"

export const BlockWrapper: APIFC = ({ config, data, ...props }) => {
  return <Wrapper {...props} />
}

const Wrapper = styled.div``
