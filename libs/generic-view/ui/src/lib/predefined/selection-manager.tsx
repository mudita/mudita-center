/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { SelectionManagerConfig } from "generic-view/models"

export const SelectionManager: APIFC<undefined, SelectionManagerConfig> = ({
  data,
  config,
  ...props
}) => {
  return <SelectionManagerWrapper {...props} />
}

const SelectionManagerWrapper = styled.div`
  background: ${({ theme }) => theme.generic.color.grey5};
  border: solid 0.1rem ${({ theme }) => theme.generic.color.grey4};
  border-radius: ${({ theme }) => theme.generic.radius.sm};
`
