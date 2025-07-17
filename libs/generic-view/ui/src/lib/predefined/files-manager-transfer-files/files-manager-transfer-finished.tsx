/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback, useLayoutEffect, useMemo } from "react"
import { APIFC, compareValues, IconType } from "generic-view/utils"
import {
  ButtonAction,
  McFilesManagerTransferFinishedConfig,
  McFilesManagerTransferFinishedData,
} from "generic-view/models"
import { Modal } from "../../interactive/modal/modal"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import {
  clearFileTransferErrors,
  closeModal,
  selectFilesSendingCount,
  selectFilesSendingFailed,
  selectFilesSendingSucceeded,
  sendFilesClear,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { modalTransitionDuration } from "generic-view/theme"
import { Typography } from "../../typography"
import { uniq } from "lodash"
import { ApiFileTransferError } from "device/models"
import styled from "styled-components"
import { formatBytes } from "../../typography/format-bytes"
import { SendFilesAction } from "../../../../../store/src/lib/file-transfer/files-transfer.type"

const messages = defineMessages({
  allModalTitle: {
    id: "module.genericViews.filesManager.file.transfer.failure.all.modalTitle",
  },
  allUnknownError: {
    id: "module.genericViews.filesManager.file.transfer.failure.all.unknownError",
  },
  allDuplicatesError: {
    id: "module.genericViews.filesManager.file.transfer.failure.all.duplicatesError",
  },
  allNotEnoughMemoryError: {
    id: "module.genericViews.filesManager.file.transfer.failure.all.notEnoughMemoryError",
  },
  someModalTitle: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.modalTitle",
  },
  someGeneralInfo: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.generalInfo",
  },
  someDuplicatesError: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.duplicatesError",
  },
  someNotEnoughMemoryError: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.notEnoughMemoryError",
  },
  errorLabelUploadUnknown: {
    id: "module.genericViews.filesManager.file.transfer.failure.errorLabels.upload.unknown",
  },
  errorLabelExportUnknown: {
    id: "module.genericViews.filesManager.file.transfer.failure.errorLabels.export.unknown",
  },
  errorLabelDuplicate: {
    id: "module.genericViews.filesManager.file.transfer.failure.errorLabels.duplicate",
  },
  errorLabelTooBig: {
    id: "module.genericViews.filesManager.file.transfer.failure.errorLabels.tooBig",
  },
  errorLabelCancelled: {
    id: "module.genericViews.filesManager.file.transfer.failure.errorLabels.cancelled",
  },
  multipleErrorsStart: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.multipleErrors.start",
  },
  multipleErrorsDuplicates: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.multipleErrors.duplicates",
  },
  multipleErrorsTooBig: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.multipleErrors.tooBig",
  },
  multipleErrorsEnd: {
    id: "module.genericViews.filesManager.file.transfer.failure.some.multipleErrors.end",
  },
})

export const FilesManagerTransferFinished: APIFC<
  McFilesManagerTransferFinishedData,
  McFilesManagerTransferFinishedConfig
> = ({ config, data }) => {
  const dispatch = useDispatch<Dispatch>()
  const selectorsConfig = { groupId: config.transferActionId }
  const filesCount = useSelector((state: ReduxRootState) => {
    return selectFilesSendingCount(state, selectorsConfig)
  })

  const succeededFiles = useSelector((state: ReduxRootState) => {
    return selectFilesSendingSucceeded(state, selectorsConfig)
  })
  const failedFiles = useSelector((state: ReduxRootState) => {
    return selectFilesSendingFailed(state, selectorsConfig)
  })

  const allFilesFailed = failedFiles.length === filesCount
  const errorTypes = uniq(failedFiles.map((file) => file.error.message))

  const memoryNeeded = useMemo(() => {
    const oversizeFilesSum = failedFiles
      .filter(
        (file) =>
          file.error.message ===
          ApiFileTransferError[ApiFileTransferError.NotEnoughSpace]
      )
      .reduce((acc, file) => acc + file.size, 0)
    const availableMemory = data?.freeSpace ?? 0
    if (!oversizeFilesSum) {
      return ""
    }
    return formatBytes(
      Math.abs(compareValues(availableMemory, oversizeFilesSum).difference)
    )
  }, [data?.freeSpace, failedFiles])

  const closeActions: ButtonAction[] = [
    {
      type: "close-modal",
      modalKey: config.modalKey,
    },
    {
      type: "custom",
      callback: () => {
        setTimeout(() => {
          dispatch(sendFilesClear({ groupId: config.transferActionId }))
          dispatch(
            clearFileTransferErrors({ actionId: config.transferActionId })
          )
        }, modalTransitionDuration)
      },
    },
  ]

  const getFileErrorReason = useCallback(
    (file: (typeof failedFiles)[number]) => {
      switch (file.error.message) {
        case ApiFileTransferError[ApiFileTransferError.FileAlreadyExists]:
          return intl.formatMessage(messages.errorLabelDuplicate)
        case ApiFileTransferError[ApiFileTransferError.NotEnoughSpace]:
          return intl.formatMessage(messages.errorLabelTooBig, {})
        case ApiFileTransferError[ApiFileTransferError.Aborted]:
          return intl.formatMessage(messages.errorLabelCancelled)
        default:
          return intl.formatMessage(
            config.actionType === SendFilesAction.ActionExport
              ? messages.errorLabelExportUnknown
              : messages.errorLabelUploadUnknown
          )
      }
    },
    [config.actionType]
  )

  const title = useMemo(() => {
    if (allFilesFailed) {
      return intl.formatMessage(messages.allModalTitle, {
        filesCount,
      })
    } else {
      return intl.formatMessage(messages.someModalTitle)
    }
  }, [allFilesFailed, filesCount])

  const errorMessage = useMemo(() => {
    if (errorTypes.length > 1) {
      return
    }

    if (allFilesFailed || succeededFiles.length === 0) {
      console.log(errorTypes)
      switch (errorTypes[0]) {
        case ApiFileTransferError[ApiFileTransferError.FileAlreadyExists]:
          return intl.formatMessage(messages.allDuplicatesError, {
            filesCount,
          })
        case ApiFileTransferError[ApiFileTransferError.NotEnoughSpace]:
          return intl.formatMessage(messages.allNotEnoughMemoryError, {
            filesCount,
            memory: memoryNeeded,
          })
        default:
          return intl.formatMessage(messages.allUnknownError, {
            filesCount,
          })
      }
    } else {
      console.log(errorTypes)
      switch (errorTypes[0]) {
        case ApiFileTransferError[ApiFileTransferError.FileAlreadyExists]:
          return intl.formatMessage(messages.someDuplicatesError)
        case ApiFileTransferError[ApiFileTransferError.NotEnoughSpace]:
          return intl.formatMessage(messages.someNotEnoughMemoryError, {
            memory: memoryNeeded,
          })
        default:
          return
      }
    }
  }, [allFilesFailed, errorTypes, filesCount, memoryNeeded, succeededFiles])

  const filesList = useMemo(() => {
    if (
      filesCount === 1 ||
      (allFilesFailed && errorTypes.length === 1) ||
      succeededFiles.length === 0
    ) {
      return
    }
    const list = [
      ...failedFiles.filter(
        (file) =>
          file.error.message ===
          ApiFileTransferError[ApiFileTransferError.NotEnoughSpace]
      ),
      ...failedFiles.filter(
        (file) =>
          file.error.message ===
          ApiFileTransferError[ApiFileTransferError.FileAlreadyExists]
      ),
      ...failedFiles.filter(
        (file) =>
          file.error.message ===
          ApiFileTransferError[ApiFileTransferError.Aborted]
      ),
      ...failedFiles.filter(
        (file) =>
          file.error.message !==
            ApiFileTransferError[ApiFileTransferError.NotEnoughSpace] &&
          file.error.message !==
            ApiFileTransferError[ApiFileTransferError.FileAlreadyExists] &&
          file.error.message !==
            ApiFileTransferError[ApiFileTransferError.Aborted]
      ),
    ]
    return (
      <Modal.ScrollableContent>
        <FilesList>
          {list.map((file) => (
            <li key={file.id}>
              <FileListItem>
                <Typography.P1>{file.name}</Typography.P1>
                {errorTypes.length > 1 && (
                  <Typography.P1>({getFileErrorReason(file)})</Typography.P1>
                )}
              </FileListItem>
            </li>
          ))}
        </FilesList>
      </Modal.ScrollableContent>
    )
  }, [
    allFilesFailed,
    errorTypes.length,
    failedFiles,
    filesCount,
    getFileErrorReason,
    succeededFiles.length,
  ])

  const generalInfo = useMemo(() => {
    if (
      (allFilesFailed && errorTypes.length === 1) ||
      succeededFiles.length === 0
    ) {
      return
    }
    const sentenceEnding = errorMessage || !filesList ? "." : ":"
    return (
      intl.formatMessage(messages.someGeneralInfo, {
        succeededFiles: succeededFiles.length,
        failedFiles: failedFiles.length,
      }) + sentenceEnding
    )
  }, [
    allFilesFailed,
    errorMessage,
    errorTypes.length,
    failedFiles.length,
    filesList,
    succeededFiles.length,
  ])

  const multipleErrorsMessage = useMemo(() => {
    if (errorTypes.length === 1) {
      return
    }
    const messageStart = intl.formatMessage(messages.multipleErrorsStart)

    const messagesMiddle = errorTypes
      .map((errorType) => {
        if (
          errorType ===
          ApiFileTransferError[ApiFileTransferError.FileAlreadyExists]
        ) {
          return intl.formatMessage(messages.multipleErrorsDuplicates)
        }
        if (
          errorType ===
          ApiFileTransferError[ApiFileTransferError.NotEnoughSpace]
        ) {
          return intl.formatMessage(messages.multipleErrorsTooBig)
        }
        return
      })
      .filter(Boolean)

    const messageEnd = intl.formatMessage(messages.multipleErrorsEnd)
    return messageStart + messagesMiddle.join(", ") + messageEnd
  }, [errorTypes])

  useLayoutEffect(() => {
    const processedCount = succeededFiles.length + failedFiles.length
    const allProcessed = processedCount === filesCount
    if (
      allProcessed &&
      succeededFiles.length !== 0 &&
      failedFiles.length === 0
    ) {
      dispatch(closeModal({ key: config.modalKey }))
    }
  }, [
    config.modalKey,
    dispatch,
    failedFiles.length,
    succeededFiles.length,
    filesCount,
  ])

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Failure }} />
      <Modal.Title>{title}</Modal.Title>
      {generalInfo && <Typography.P1>{generalInfo}</Typography.P1>}
      {errorMessage && <Typography.P1>{errorMessage}</Typography.P1>}
      {filesList}
      {multipleErrorsMessage && (
        <Typography.P1>{multipleErrorsMessage}</Typography.P1>
      )}
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary config={{ text: "Close", actions: closeActions }} />
      </Modal.Buttons>
    </>
  )
}

const FilesList = styled.ul`
  li {
    p {
      &:first-child {
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:nth-child(2) {
        white-space: nowrap;
        color: ${({ theme }) => theme.color.grey2};
      }
    }
  }
`

const FileListItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
  justify-content: space-between;
  overflow: hidden;
`
