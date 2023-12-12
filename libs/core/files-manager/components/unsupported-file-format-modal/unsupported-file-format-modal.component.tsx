/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ModalContent,
  ModalDialog,
  RoundIconWrapper,
} from "Core/ui/components/modal-dialog"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"

import React from "react"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import { useSelector, useDispatch } from "react-redux"
import { resetUploadingState } from "Core/files-manager/actions/base.action"
import { getFilesManagerError } from "Core/files-manager/selectors/get-files-manager-error.selector"
import { FilesManagerError } from "Core/files-manager/constants/errors.enum"

const messages = defineMessages({
  unsupportedFileFormatUploadModalTitle: {
    id: "module.filesManager.unsupportedFileFormatUploadModalTitle",
  },
  unsupportedFileFormatUploadModalHeader: {
    id: "module.filesManager.unsupportedFileFormatUploadModalHeader",
  },
  unsupportedFileFormatUploadModalTextInfo: {
    id: "module.filesManager.unsupportedFileFormatUploadModalTextInfo",
  },
  unsupportedFileFormatUploadModalActionButton: {
    id: "module.filesManager.unsupportedFileFormatUploadModalActionButton",
  },
})

const DuplicatedFilesDetailText = styled(Text)`
  margin-top: 0.8rem;
`

const UnsupportedFileFormatModal: FunctionComponent = ({ ...props }) => {
  const filesManagerError = useSelector(getFilesManagerError)

  const dispatch = useDispatch()

  if (filesManagerError?.type !== FilesManagerError.UnsupportedFileFormat) {
    return null
  }

  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.unsupportedFileFormatUploadModalTitle)}
      open
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.unsupportedFileFormatUploadModalActionButton
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
          message={messages.unsupportedFileFormatUploadModalHeader}
        />
        <DuplicatedFilesDetailText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.unsupportedFileFormatUploadModalTextInfo}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default UnsupportedFileFormatModal
