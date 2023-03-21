/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ModalContent,
  ModalDialog,
  RoundIconWrapper,
} from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"

import React from "react"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import { fontWeight } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { PendingUploadModalProps } from "App/files-manager/components/pending-upload-modal/pending-upload-modal.interface"

const messages = defineMessages({
  pendingUploadModalTitle: {
    id: "module.filesManager.pendingUploadModalTitle",
  },
  pendingUploadModalHeader: {
    id: "module.filesManager.pendingUploadModalHeader",
  },
  pendingUploadModalTextInfo: {
    id: "module.filesManager.pendingUploadModalTextInfo",
  },
  pendingUploadModalTextDetailsInfo: {
    id: "module.filesManager.pendingUploadModalTextDetailsInfo",
  },
  pendingUploadModalActionButton: {
    id: "module.filesManager.pendingUploadModalActionButton",
  },
})

const PendingUploadDetailText = styled(Text)`
  font-weight: ${fontWeight("default")};
  width: 25rem;
`

const PendingUploadModal: React.FC<PendingUploadModalProps> = ({
  filesCount,
  onClose,
  onOk,
  ...props
}) => {
  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.pendingUploadModalTitle)}
      open
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.pendingUploadModalActionButton
      )}
      onActionButtonClick={() => {
        onOk()
      }}
      closeModal={() => {
        onClose()
      }}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.Download} width={3.2} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          color="secondary"
          message={messages.pendingUploadModalHeader}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.pendingUploadModalTextInfo}
        />
        <PendingUploadDetailText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={{
            ...messages.pendingUploadModalTextDetailsInfo,
            values: { ...textFormatters, count: filesCount },
          }}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default PendingUploadModal
