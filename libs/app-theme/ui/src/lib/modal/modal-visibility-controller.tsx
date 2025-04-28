/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"

export const ModalVisibilityControllerHidden = styled.div`
  display: none;
`

interface Props {
  visible?: boolean
}

export const ModalVisibilityController: FunctionComponent<Props> = ({
  visible,
}) => {
  if (!visible) {
    return <ModalVisibilityControllerHidden />
  }
  return null
}
