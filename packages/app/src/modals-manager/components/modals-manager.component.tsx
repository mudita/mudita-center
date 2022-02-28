/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ModalsManagerState } from "App/modals-manager/reducers"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CollectingDataModal from "Renderer/modules/settings/containers/collecting-data-modal.container"
import AppForcedUpdateFlow from "Renderer/modules/settings/containers/app-forced-update-flow.container"
import AppUpdateFlow from "Renderer/modules/settings/containers/app-update-flow.container"
import ContactSupportFlow from "App/contact-support/containers/contact-support-flow.container"

type Props = ModalsManagerState

const ModalsManager: FunctionComponent<Props> = ({
  collectingDataModalShow,
  appForcedUpdateFlowShow,
  appUpdateFlowShow,
  contactSupportFlowShow,
}) => {
  return (
    <>
      <CollectingDataModal open={collectingDataModalShow} />
      {appForcedUpdateFlowShow && <AppForcedUpdateFlow />}
      {appUpdateFlowShow && <AppUpdateFlow />}
      {contactSupportFlowShow && <ContactSupportFlow />}
    </>
  )
}

export default ModalsManager
