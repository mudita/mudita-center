/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"
import ContactSupportModalFlow, {
  ContactSupportModalFlowState,
} from "App/renderer/components/rest/contact-support-modal/contact-support-modal-flow.component"
import useCreateBugTicket, {
  files,
} from "App/renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket"
import { ContactSupportFieldValues } from "App/renderer/components/rest/contact-support-modal/contact-support-modal.component"
import { CreateBugTicketResponseStatus } from "App/renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket-builder"
import logger from "App/main/utils/logger"

const Troubleshooting = () => {
  const history = useHistory()
  const [
    contactSupportOpenState,
    setContactSupportOpenState,
  ] = useState<ContactSupportModalFlowState>()
  const [sendBugTicketRequest, sending] = useCreateBugTicket()

  const openContactSupportModalFlow = () => {
    setContactSupportOpenState(ContactSupportModalFlowState.Form)
  }

  const closeContactSupportModalFlow = () => {
    setContactSupportOpenState(undefined)
  }

  const sendBugTicket = async ({
    email,
    description,
  }: ContactSupportFieldValues) => {
    const response = await sendBugTicketRequest({
      email,
      description,
      subject: `Error - Troubleshooting_XXXX`,
    })
    if (response.status === CreateBugTicketResponseStatus.Ok) {
      setContactSupportOpenState(ContactSupportModalFlowState.Success)
    } else {
      setContactSupportOpenState(ContactSupportModalFlowState.Fail)
      logger.error(`Troubleshooting: ${response.error?.message}`)
    }
  }

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }

  return (
    <>
      {contactSupportOpenState && (
        <ContactSupportModalFlow
          openState={contactSupportOpenState}
          files={files}
          onSubmit={sendBugTicket}
          sending={sending}
          closeModal={closeContactSupportModalFlow}
        />
      )}
      <OnboardingTroubleshooting
        onRetry={onRetry}
        onContact={openContactSupportModalFlow}
      />
    </>
  )
}

export default Troubleshooting
