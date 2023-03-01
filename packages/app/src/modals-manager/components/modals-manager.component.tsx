/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ModalsManagerState } from "App/modals-manager/reducers"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  CollectingDataModalContainer,
  AppForcedUpdateFlowContainer,
  AppUpdateFlowContainer,
} from "App/settings/components"
import ContactSupportFlow from "App/contact-support/containers/contact-support-flow.container"
import { UpdateOsInterruptedFlowContainer } from "App/update/components/update-os-interrupted-flow"

type Props = ModalsManagerState

const ModalsManager: FunctionComponent<Props> = ({
  collectingDataModalShow,
  appForcedUpdateFlowShow,
  appUpdateFlowShow,
  contactSupportFlowShow,
}) => {
  return (
    <>
      <CollectingDataModalContainer open={collectingDataModalShow} />
      {appForcedUpdateFlowShow && <AppForcedUpdateFlowContainer />}
      {appUpdateFlowShow && <AppUpdateFlowContainer />}
      {contactSupportFlowShow && <ContactSupportFlow />}
      <UpdateOsInterruptedFlowContainer />
    </>
  )
}

export default ModalsManager
