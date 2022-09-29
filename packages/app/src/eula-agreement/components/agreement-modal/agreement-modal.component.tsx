/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { AgreementModalProps } from "App/eula-agreement/components/agreement-modal/agreement-modal.interface"
import { ModalContent } from "App/eula-agreement/components/agreement-modal/agreement-modal.styled"
import { AgreementModalIds } from "App/eula-agreement/components/agreement-modal/agreement-modal-test-ids.enum"

// DEPRECATED
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { zIndex } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import theme from "App/__deprecated__/renderer/styles/theming/theme"

const messages = defineMessages({
  title: {
    id: "module.eula.modalTitle",
  },
  description: {
    id: "module.eula.modalDescription",
  },
})

export const AgreementModal: FunctionComponent<AgreementModalProps> = ({
  open,
}) => {
  return (
    <ModalDialog
      open={open}
      zIndex={zIndex("agreementModal")({ theme })}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      testId={AgreementModalIds.Modal}
    >
      <ModalContent>
        <Text
          testId={AgreementModalIds.Text}
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.description}
        />
      </ModalContent>
    </ModalDialog>
  )
}
