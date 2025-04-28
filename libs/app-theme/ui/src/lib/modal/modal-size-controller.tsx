/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"

export const ModalSizeControllerSmall = styled.div`
  display: none;
`

export const ModalSizeControllerMedium = styled.div`
  display: none;
`

export const ModalSizeControllerLarge = styled.div`
  display: none;
`

interface Props {
  size?: "small" | "medium" | "large"
}

export const ModalSizeController: FunctionComponent<Props> = ({ size }) => {
  switch (size) {
    case "small":
      return <ModalSizeControllerSmall />
    case "medium":
      return <ModalSizeControllerMedium />
    case "large":
      return <ModalSizeControllerLarge />
    default:
      return null
  }
}
