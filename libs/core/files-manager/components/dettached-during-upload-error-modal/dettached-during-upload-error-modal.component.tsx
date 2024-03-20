/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { defineMessages } from "react-intl"
import {
  ModalContent,
  ModalDialog,
  RoundIconWrapper,
} from "Core/ui/components/modal-dialog"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { resetUploadingState } from "Core/files-manager/actions/base.action"

const messages = defineMessages({
  detachedDuringUploadErrorModalTitle: {
    id: "module.filesManager.detachedDuringUploadErrorModalTitle",
  },
  detachedDuringUploadErrorModalHeader: {
    id: "module.filesManager.detachedDuringUploadErrorModalHeader",
  },
  detachedDuringUploadErrorModalTextInfo: {
    id: "module.filesManager.detachedDuringUploadErrorModalTextInfo",
  },
  detachedDuringUploadErrorModalActionButton: {
    id: "module.filesManager.detachedDuringUploadErrorModalActionButton",
  },
})

const DuplicatedFilesDetailText = styled(Text)`
  margin-top: 0.8rem;
`

const DetachedDuringUploadErrorModal: FunctionComponent = ({ ...props }) => {
  const dispatch = useDispatch()

  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.detachedDuringUploadErrorModalTitle)}
      open
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.detachedDuringUploadErrorModalActionButton
      )}
      onActionButtonClick={() => {
        dispatch(resetUploadingState())
      }}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.ThinFail} width={3.2} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          color="secondary"
          message={messages.detachedDuringUploadErrorModalHeader}
        />
        <DuplicatedFilesDetailText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.detachedDuringUploadErrorModalTextInfo}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default DetachedDuringUploadErrorModal
