/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { ModalDialog, RoundIconWrapper } from "Core/ui/components/modal-dialog"
import { AgreementModalProps } from "Core/eula-agreement/components/agreement-modal/agreement-modal.interface"
import { ModalContent } from "Core/eula-agreement/components/agreement-modal/agreement-modal.styled"
import { AgreementModalIds } from "Core/eula-agreement/components/agreement-modal/agreement-modal-test-ids.enum"

// DEPRECATED
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import styled from "styled-components"

const messages = defineMessages({
  actionButton: {
    id: "module.eula.actionButton",
  },
  title: {
    id: "module.eula.modalTitle",
  },
  description: {
    id: "module.eula.modalDescription",
  },
})

export const DescriptionText = styled(Text)`
  text-align: center;
  margin-bottom: -1.6rem;
`
export const AgreementModal: FunctionComponent<AgreementModalProps> = ({
  open,
  onActionButtonClick,
  closeModal
}) => {
  return (
    <ModalDialog
      layer={ModalLayers.EULA}
      open={open}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      testId={AgreementModalIds.Modal}
      actionButtonLabel={intl.formatMessage(messages.actionButton)}
      onActionButtonClick={onActionButtonClick}
      closeModal={closeModal}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.Exclamation} width={4.8} />
        </RoundIconWrapper>
        <DescriptionText
          testId={AgreementModalIds.Text}
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.description}
        />
      </ModalContent>
    </ModalDialog>
  )
}
