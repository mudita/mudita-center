/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ContactSupportModal from "App/contacts/components/contact-support-modal/contact-support-modal.component"
import ContactSupportModalSuccess from "App/contacts/components/contact-support-modal/contact-support-modal-success.component"
import ContactSupportModalFail from "App/contacts/components/contact-support-modal/contact-support-modal-fail.component"
import { ContactSupportModalFlowTestIds } from "App/contacts/components/contact-support-modal/contact-support-modal-flow-test-ids.component"

export enum ContactSupportModalFlowState {
  Form = "form",
  Success = "success",
  Fail = "fail",
}

interface Props
  extends Omit<ComponentProps<typeof ContactSupportModal>, "open"> {
  openState?: ContactSupportModalFlowState
}

const ContactSupportModalFlow: FunctionComponent<Props> = ({
  openState = ContactSupportModalFlowState.Form,
  files,
  onSubmit,
  sending,
  closeModal,
}) => {
  return (
    <>
      <ContactSupportModal
        testId={ContactSupportModalFlowTestIds.ContactSupportModal}
        open={ContactSupportModalFlowState.Form === openState}
        closeModal={closeModal}
        onSubmit={onSubmit}
        sending={sending}
        files={files}
      />
      <ContactSupportModalSuccess
        testId={ContactSupportModalFlowTestIds.ContactSupportModalSuccess}
        open={ContactSupportModalFlowState.Success === openState}
        closeModal={closeModal}
      />
      <ContactSupportModalFail
        testId={ContactSupportModalFlowTestIds.ContactSupportModalFail}
        open={ContactSupportModalFlowState.Fail === openState}
        closeModal={closeModal}
      />
    </>
  )
}

export default ContactSupportModalFlow
