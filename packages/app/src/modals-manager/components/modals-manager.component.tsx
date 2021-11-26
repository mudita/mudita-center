/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CollectingDataModal from "Renderer/modules/settings/containers/collecting-data-modal.container"
import AppForcedUpdateFlow from "Renderer/modules/settings/containers/app-forced-update-flow.container"
import AppUpdateFlow from "Renderer/modules/settings/containers/app-update-flow.container"
import { ModalsManagerState } from "App/modals-manager/reducers"

type Props = ModalsManagerState

const ModalsManager: FunctionComponent<Props> = ({
  collectingDataModalShow,
  appForcedUpdateFlowShow,
  appUpdateFlowShow,
}) => {
  return (
    <>
      <CollectingDataModal open={collectingDataModalShow} />
      {appForcedUpdateFlowShow && <AppForcedUpdateFlow />}
      {appUpdateFlowShow && <AppUpdateFlow />}
    </>
  )
}

export default ModalsManager
