/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { ThemeProps } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
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
import { getDuplicatedFiles } from "Core/files-manager/selectors/get-duplicated-files.selector"
import { getFilesManagerError } from "Core/files-manager/selectors/get-files-manager-error.selector"
import { FilesManagerError } from "Core/files-manager/constants/errors.enum"
import { AppTheme } from "Root/app-theme"

const messages = defineMessages({
  duplicatedFilesUploadModalTitle: {
    id: "module.filesManager.duplicatedFilesUploadModalTitle",
  },
  duplicatedFilesUploadModalHeader: {
    id: "module.filesManager.duplicatedFilesUploadModalHeader",
  },
  duplicatedFilesUploadModalTextInfo: {
    id: "module.filesManager.duplicatedFilesUploadModalTextInfo",
  },
  duplicatedFilesUploadModalPendingFilesTextInfo: {
    id: "module.filesManager.duplicatedFilesUploadModalPendingFilesTextInfo",
  },
  duplicatedFilesUploadModalActionButton: {
    id: "module.filesManager.duplicatedFilesUploadModalActionButton",
  },
  duplicatedFilesUploadModalListTitle: {
    id: "module.filesManager.duplicatedFilesUploadModalListTitle",
  },
})

const DuplicatedFilesDetailText = styled(Text)`
  margin-top: 0.8rem;
`

const DuplicatedFilesListWrapper = styled.div`
  width: 100%;
  margin-top: 2.4rem;
`
const DuplicatedFilesListItems = styled.div`
  max-height: 10rem;
  overflow: auto;
`

const DuplicatedFilesListTitleText = styled(Text)`
  margin-bottom: 1.1rem;
  border-width: 0 0 0.1rem 0;
  border-style: solid;
  border-color: ${({ theme }: ThemeProps<AppTheme>) => {
    return theme.core.color.border.verticalSeparator
  }};
  text-align: left !important;
`

const DuplicatedFilesListItemText = styled(Text)`
  text-align: left !important;
`

const DuplicatedFilesModal: FunctionComponent = ({ ...props }) => {
  const filesManagerError = useSelector(getFilesManagerError)
  const duplicatedFiles = useSelector(getDuplicatedFiles)

  const dispatch = useDispatch()

  if (filesManagerError?.type !== FilesManagerError.UploadDuplicates) {
    return null
  }

  const duplicatedFilesList =
    duplicatedFiles.length > 0 ? (
      <DuplicatedFilesListWrapper>
        <DuplicatedFilesListTitleText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.duplicatedFilesUploadModalListTitle}
        />
        <DuplicatedFilesListItems>
          {duplicatedFiles.map((fileName) => {
            return (
              <DuplicatedFilesListItemText
                displayStyle={TextDisplayStyle.Paragraph4}
                color="secondary"
                message={fileName}
                key={`duplicated-files-list-item-text-${fileName}`}
              />
            )
          })}
        </DuplicatedFilesListItems>
      </DuplicatedFilesListWrapper>
    ) : null

  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.duplicatedFilesUploadModalTitle)}
      open
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.duplicatedFilesUploadModalActionButton
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
          message={messages.duplicatedFilesUploadModalHeader}
        />
        <DuplicatedFilesDetailText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.duplicatedFilesUploadModalTextInfo}
        />
        {duplicatedFilesList}
      </ModalContent>
    </ModalDialog>
  )
}

export default DuplicatedFilesModal
