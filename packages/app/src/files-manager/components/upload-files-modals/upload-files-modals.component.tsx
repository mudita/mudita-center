/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { UploadFilesModalsTestIds } from "App/files-manager/components/upload-files-modals/upload-files-modals-test-ids.enum"
import { UploadFilesModalProps } from "App/files-manager/components/upload-files-modals/upload-files-modals.interface"
import { FilesManagerError } from "App/files-manager/constants"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  uploadingModalInfo: { id: "module.filesManager.uploadingModalInfo" },
  uploadingModalErrorTitle: {
    id: "module.filesManager.uploadingModalErrorTitle",
  },
  uploadingModalErrorSubtitle: {
    id: "module.filesManager.uploadingModalErrorSubtitle",
  },
  uploadingModalNoSpaceErrorTitle: {
    id: "module.filesManager.uploadingModalNoSpaceErrorTitle",
  },
  uploadingModalErrorNoSpaceSubtitle: {
    id: "module.filesManager.uploadingModalNoSpaceErrorSubtitle",
  },
  uploadingModalTitle: { id: "module.filesManager.uploadingModalTitle" },
  uploadingModalSubtitle: { id: "module.filesManager.uploadingModalSubtitle" },
  uploadingModalBody: { id: "module.filesManager.uploadingModalBody" },
})

export const UploadFilesModals: FunctionComponent<UploadFilesModalProps> = ({
  error,
  filesLength,
  uploading,
  uploadingInfo,
  uploadingFailed,
  onCloseUploadingErrorModal,
}) => {
  const errorTitle =
    error?.type === FilesManagerError.NotEnoughSpace
      ? messages.uploadingModalNoSpaceErrorTitle
      : messages.uploadingModalErrorTitle
  const errorSubtitle =
    error?.type === FilesManagerError.NotEnoughSpace
      ? messages.uploadingModalErrorNoSpaceSubtitle
      : messages.uploadingModalErrorSubtitle

  return (
    <>
      {uploading && (
        <LoaderModal
          testId={UploadFilesModalsTestIds.LoadingModal}
          open={uploading}
          title={intl.formatMessage(messages.uploadingModalTitle)}
          subtitle={intl.formatMessage(messages.uploadingModalSubtitle)}
          body={intl.formatMessage(messages.uploadingModalBody)}
        />
      )}
      {uploadingInfo && (
        <InfoPopup
          message={{
            ...messages.uploadingModalInfo,
            values: { ...textFormatters, num: filesLength },
          }}
          testId={UploadFilesModalsTestIds.UploadedPopUp}
        />
      )}
      {uploadingFailed && (
        <ErrorModal
          testId={UploadFilesModalsTestIds.ErrorModal}
          open={uploadingFailed}
          title={intl.formatMessage(errorTitle)}
          subtitle={intl.formatMessage(errorSubtitle)}
          closeModal={onCloseUploadingErrorModal}
        />
      )}
    </>
  )
}
