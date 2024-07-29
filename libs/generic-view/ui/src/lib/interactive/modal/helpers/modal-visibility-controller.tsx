/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import {
  ModalVisibilityControllerConfig,
  ModalVisibilityControllerData,
} from "generic-view/models"

export const ModalVisibilityControllerHidden = styled.div`
  display: none;
`

export const ModalVisibilityController: APIFC<
  ModalVisibilityControllerData,
  ModalVisibilityControllerConfig
> = ({ data, config }) => {
  if (!config && !data) return null
  if (!data?.visible || !config?.visible) {
    return <ModalVisibilityControllerHidden />
  }
  return null
}
