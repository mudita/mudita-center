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
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"

import React from "react"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { useSelector, useDispatch } from "react-redux"
import { resetUploadingState } from "App/files-manager/actions/base.action"
import { getFilesManagerError } from "App/files-manager/selectors/get-files-manager-error.selector"
import { FilesManagerError } from "App/files-manager/constants/errors.enum"

const messages = defineMessages({
  unsupportedFileSizeFilesUploadModalTitle: {
    id: "module.filesManager.unsupportedFileSizeFilesUploadModalTitle",
  },
  unsupportedFileSizeFilesUploadModalHeader: {
    id: "module.filesManager.unsupportedFileSizeFilesUploadModalHeader",
  },
  unsupportedFileSizeFilesUploadModalTextInfo: {
    id: "module.filesManager.unsupportedFileSizeFilesUploadModalTextInfo",
  },
  unsupportedFileSizeFilesUploadModalActionButton: {
    id: "module.filesManager.unsupportedFileSizeFilesUploadModalActionButton",
  },
})

const UnsupportedFileSizeDetailText = styled(Text)`
  margin-top: 0.8rem;
`

const UnsupportedFileSizeModal: FunctionComponent = ({ ...props }) => {
  const filesManagerError = useSelector(getFilesManagerError)

  const dispatch = useDispatch()

  if (filesManagerError?.type !== FilesManagerError.UnsupportedFileSize) {
    return null
  }

  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(
        messages.unsupportedFileSizeFilesUploadModalTitle
      )}
      open
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.unsupportedFileSizeFilesUploadModalActionButton
      )}
      onActionButtonClick={() => {
        dispatch(resetUploadingState())
      }}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.Info} width={3.2} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          color="secondary"
          message={messages.unsupportedFileSizeFilesUploadModalHeader}
        />
        <UnsupportedFileSizeDetailText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.unsupportedFileSizeFilesUploadModalTextInfo}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default UnsupportedFileSizeModal
