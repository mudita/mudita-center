/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ContactSupportModal from "./contact-support-modal.component"
import { ContactSupportModalSuccess } from "./contact-support-modal-success.component"
import { ContactSupportModalError } from "./contact-support-modal-error.component"
import { ContactSupportFlowTestIds } from "Core/contact-support/components/contact-support-flow-test-ids.component"
import { SendTicketState } from "Core/contact-support/reducers"
import { SendTicketPayload } from "Core/contact-support/actions/send-ticket.action"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { GenericThemeProvider } from "generic-view/theme"
import { Modal } from "generic-view/ui"

interface Props
  extends Pick<ComponentProps<typeof ContactSupportModal>, "files"> {
  state: SendTicketState | null
  sendTicket: (payload: SendTicketPayload) => void
  closeContactSupportFlow: () => void
  layer?: ModalLayers
}

const ContactSupportFlow: FunctionComponent<Props> = ({
  state,
  files,
  sendTicket,
  closeContactSupportFlow,
  layer = ModalLayers.ContactSupport,
}) => {
  return (
    <>
      <ContactSupportModal
        layer={layer}
        testId={ContactSupportFlowTestIds.ContactSupportModal}
        open={state === null || SendTicketState.Sending === state}
        closeModal={closeContactSupportFlow}
        onSubmit={sendTicket}
        sending={SendTicketState.Sending === state}
        files={files}
      />
      <GenericThemeProvider>
        <Modal
          config={{
            size: "small",
            closeButtonAction: {
              type: "custom",
              callback: closeContactSupportFlow,
            },
            defaultOpened: state === SendTicketState.Success,
            modalLayer: layer,
          }}
          componentKey={"contact-support-modal-success"}
        >
          <ContactSupportModalSuccess
            closeContactSupportFlow={closeContactSupportFlow}
          />
        </Modal>
        <Modal
          config={{
            size: "small",
            closeButtonAction: {
              type: "custom",
              callback: closeContactSupportFlow,
            },
            defaultOpened: state === SendTicketState.Error,
            modalLayer: layer,
          }}
          componentKey={"contact-support-modal-error"}
        >
          <ContactSupportModalError
            closeContactSupportFlow={closeContactSupportFlow}
          />
        </Modal>
      </GenericThemeProvider>
    </>
  )
}

export default ContactSupportFlow
