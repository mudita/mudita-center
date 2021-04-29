/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { noop } from "Renderer/utils/noop"
import RecoveryModeUI from "Renderer/modules/recovery-mode/recovery-mode-ui.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import React from "react"
import { useContactSupport } from "Renderer/utils/contact-support/use-contact-support"
import ContactSupportModalFlow from "App/contacts/components/contact-modal/contact-support-modal-flow.component"

const RecoveryMode: FunctionComponent<{}> = () => {
  const {
    openModal,
    openContactSupportModal,
    sendForm,
    sending,
    log,
    closeContactModal,
    closeSuccessModal,
    closeFailModal,
  } = useContactSupport()
  return (
    <>
      <ContactSupportModalFlow
        config={openModal}
        sendForm={sendForm}
        sending={sending}
        log={log}
        closeContactModal={closeContactModal}
        closeSuccessModal={closeSuccessModal}
        closeFailModal={closeFailModal}
      />
      <RecoveryModeUI
        onBackupClick={noop}
        onRebootOsClick={noop}
        onRestoreClick={noop}
        onFactoryResetClick={noop}
        onSupportButtonClick={openContactSupportModal}
      />
    </>
  )
}

export default RecoveryMode
