/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useState } from "react"
import { format } from "date-fns"
import { AppResult } from "app-utils/models"
import { ContactSupportErrorModal } from "./contact-support-error-modal"
import {
  ContactSupportFieldValues,
  ContactSupportFormModal,
  ContactSupportModalProps,
} from "./contact-support-form-modal"
import { ContactSupportSendingModal } from "./contact-support-sending-modal"
import { ContactSupportSuccessModal } from "./contact-support-success-modal"

type ContactSupportFlowMessages = ContactSupportModalProps["messages"]

export interface ContactSupportFlowProps {
  opened: boolean
  onClose: VoidFunction
  messages?: ContactSupportFlowMessages
  createTicket: (data: ContactSupportFieldValues) => Promise<AppResult>
  formIcon?: ContactSupportModalProps["formIcon"]
}

enum ContactSupportFlowState {
  Idle,
  Form,
  Sending,
  Success,
  Error,
}

const todayFormatDate = format(new Date(), "dd-MM-yy")
const zippedLogsFileName = `${todayFormatDate} Mudita Center.zip`

export const ContactSupportFlow: FunctionComponent<ContactSupportFlowProps> = ({
  opened,
  onClose,
  messages,
  createTicket,
  formIcon,
}) => {
  const [previousOpened, setPreviousOpened] = useState(opened)
  const [flowState, setFlowState] = useState<ContactSupportFlowState>()

  if (previousOpened !== opened) {
    setPreviousOpened(opened)
    setFlowState(opened ? ContactSupportFlowState.Form : undefined)
  }

  const onSubmit = useCallback(
    async (data: ContactSupportFieldValues) => {
      setFlowState(ContactSupportFlowState.Sending)
      const result = await createTicket(data)
      if (result.ok) {
        setFlowState(ContactSupportFlowState.Success)
      } else {
        setFlowState(ContactSupportFlowState.Error)
      }
    },
    [createTicket]
  )

  const onFileButtonClick = useCallback((fileName: string) => {
    // TODO: Implement the logic to handle file button click
    console.log(`File button clicked for file: ${fileName}`)
  }, [])

  return (
    <>
      <ContactSupportFormModal
        opened={flowState === ContactSupportFlowState.Form}
        files={[{ name: zippedLogsFileName }]}
        onSubmit={onSubmit}
        onClose={onClose}
        onFileButtonClick={onFileButtonClick}
        messages={messages}
        formIcon={formIcon}
      />
      <ContactSupportSendingModal
        opened={flowState === ContactSupportFlowState.Sending}
      />
      <ContactSupportSuccessModal
        opened={flowState === ContactSupportFlowState.Success}
        onClose={onClose}
      />
      <ContactSupportErrorModal
        opened={flowState === ContactSupportFlowState.Error}
        onClose={onClose}
      />
    </>
  )
}
