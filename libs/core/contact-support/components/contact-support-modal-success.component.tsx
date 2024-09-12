/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { E2eTestIds } from "e2e-test-ids"
import { Modal } from "generic-view/ui"
import { IconType } from "generic-view/utils"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ButtonSecondary } from "../../../generic-view/ui/src/lib/buttons/button-secondary"

const messages = defineMessages({
  title: { id: "component.supportModalSuccessTitle" },
  body: { id: "component.supportModalSuccessBody" },
  closeButtonLabel: { id: "component.supportModalSuccessButtonLabel" },
})

interface Props {
  closeContactSupportFlow: VoidFunction
}

export const ContactSupportModalSuccess: FunctionComponent<Props> = ({
  closeContactSupportFlow,
}) => (
  <>
    <Modal.TitleIcon config={{ type: IconType.Success }} />
    <Modal.Title data-testid={E2eTestIds.ContactSupportModalSuccessTitle}>
      {intl.formatMessage(messages.title)}
    </Modal.Title>
    <p data-testid={E2eTestIds.ContactSupportModalSuccessDescription}>
      {intl.formatMessage(messages.body)}
    </p>
    <Modal.Buttons config={{ vertical: true }}>
      <ButtonSecondary
        data-testid={E2eTestIds.ContactSupportModalSuccessCloseButton}
        config={{
          text: intl.formatMessage(messages.closeButtonLabel),
          action: {
            type: "custom",
            callback: closeContactSupportFlow,
          },
        }}
      />
    </Modal.Buttons>
  </>
)
