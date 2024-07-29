/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { ModalSizeControllerConfig } from "generic-view/models"

export const ModalSizeControllerSmall = styled.div`
  display: none;
`

export const ModalSizeControllerMedium = styled.div`
  display: none;
`

export const ModalSizeControllerLarge = styled.div`
  display: none;
`

export const ModalSizeController: APIFC<
  undefined,
  ModalSizeControllerConfig
> = ({ config }) => {
  switch (config?.size) {
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
