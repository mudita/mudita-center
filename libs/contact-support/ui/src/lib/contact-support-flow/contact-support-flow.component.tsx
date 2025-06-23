/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Modal } from "app-theme/ui"
import { ModalLayer, ModalSize } from "app-theme/models"
import {
  ContactSupportFlowTestIds,
  SendTicketStatus,
} from "contact-support/models"
import { ContactSupportModalSuccess } from "./contact-support-modal-success.component"
import { ContactSupportModalError } from "./contact-support-modal-error.component"
import { ContactSupportModal } from "./contact-support-modal.component"

interface Props {
  files: { name: string }[]
  status: SendTicketStatus | null
  sendTicket: (payload: any) => void
  closeContactSupportFlow: () => void
  layer?: ModalLayer
}

export const ContactSupportFlow: FunctionComponent<Props> = ({
  status,
  files,
  sendTicket,
  closeContactSupportFlow,
  layer = ModalLayer.ContactSupport,
}) => {
  const isSending = status === SendTicketStatus.Sending
  const isSuccess = status === SendTicketStatus.Success
  const isError = status === SendTicketStatus.Error

  return (
    <>
      <Modal
        opened={status === null || isSending}
        layer={layer}
        size={
          isSending
            ? ModalSize.Small
            : isSuccess || isError
              ? ModalSize.Medium
              : ModalSize.Large
        }
        data-testid={ContactSupportFlowTestIds.ContactSupportModal}
      >
        <ContactSupportModal
          files={files}
          sending={isSending}
          onSubmit={sendTicket}
          onClose={closeContactSupportFlow}
        />
      </Modal>

      <Modal
        opened={isSuccess}
        layer={layer}
        size={ModalSize.Small}
        data-testid={ContactSupportFlowTestIds.ContactSupportModalSuccess}
      >
        <ContactSupportModalSuccess
          closeContactSupportFlow={closeContactSupportFlow}
        />
      </Modal>

      <Modal
        opened={isError}
        layer={layer}
        size={ModalSize.Small}
        data-testid={ContactSupportFlowTestIds.ContactSupportModalError}
      >
        <ContactSupportModalError
          closeContactSupportFlow={closeContactSupportFlow}
        />
      </Modal>
    </>
  )
}
