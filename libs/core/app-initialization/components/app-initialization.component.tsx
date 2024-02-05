/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import USBAccessFlowContainer from "Core/settings/components/usb-access/usb-access-flow.container"
import { ModalsManagerState } from "Core/modals-manager/reducers/modals-manager.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

const AppInitialization: FunctionComponent = () => {
  const { usbAccessFlowShow } = useSelector(
    (state: ReduxRootState): ModalsManagerState => state.modalsManager
  )

  if (usbAccessFlowShow) {
    return <USBAccessFlowContainer />
  }

  return <></>
}

export default AppInitialization
