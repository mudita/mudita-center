/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { APIFC, CustomModalError, IconType } from "generic-view/utils"
import { ButtonAction, McFilesManagerUploadConfig } from "generic-view/models"
import { ButtonPrimary } from "../../buttons/button-primary"
import { openFileRequest } from "system-utils/feature"
import { Modal } from "../../interactive/modal/modal"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import {
  createEntityDataAction,
  CreateEntityResponse,
  selectActiveApiDeviceId,
  selectFileSendingProgress,
  sendFile,
  SendFileResponse,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { platform } from "Core/__deprecated__/renderer/utils/platform"
import { modalTransitionDuration } from "generic-view/theme"
import { startPreSendFileRequest } from "device/feature"
import { FilesManagerUploadError } from "./files-manager-upload-error"

const messages = defineMessages({
  progressModalTitle: {
    id: "module.genericViews.filesManager.upload.progress.modalTitle",
  },
  uploadDuplicateFileTitle: {
    id: "module.genericViews.filesManager.uploadDuplicateFile.title",
  },
  uploadDuplicateFileDescription: {
    id: "module.genericViews.filesManager.uploadDuplicateFile.description",
  },
  uploadInsufficientMemoryTitle: {
    id: "module.genericViews.filesManager.uploadInsufficientMemory.title",
  },
  uploadInsufficientMemoryDescription: {
    id: "module.genericViews.filesManager.uploadInsufficientMemory.description",
  },
  uploadFileTooLargeTitle: {
    id: "module.genericViews.filesManager.uploadFileTooLarge.title",
  },
  uploadFileTooLargeDescription: {
    id: "module.genericViews.filesManager.uploadFileTooLarge.description",
  },
})

enum Status {
  Idle = "idle",
  Selecting = "selecting",
  Sending = "sending",
  Finished = "finished",
  Failed = "failed",
  Cancelled = "cancelled",
}

export const FilesManagerUpload: APIFC<
  undefined,
  McFilesManagerUploadConfig
> = ({ config, data, ...rest }) => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveApiDeviceId)

  const [status, setStatus] = useState<Status>(Status.Idle)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [sentFiles, setSentFiles] = useState<string[]>([])
  const [failedFiles, setFailedFiles] = useState<string[]>([])
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [currentFileTransferId, setCurrentFileTransferId] = useState<number>()
  const fileSendingProgress = useSelector((state: ReduxRootState) => {
    return selectFileSendingProgress(state, currentFileTransferId)
  })

  const fileSendingAbortReference = useRef<VoidFunction>()
  const entityCreatingAbortReference = useRef<VoidFunction>()
  const [error, setError] = useState<CustomModalError>()

  const getFileName = useCallback((filePath?: string) => {
    return filePath?.split(platform.windows() ? "\\" : "/").pop() ?? ""
  }, [])

  const selectFiles = useCallback(async () => {
    const selectorResponse = await openFileRequest({
      filters: [
        {
          name: config.fileTypeGroupName,
          extensions: config.fileTypes,
        },
      ],
      properties: ["openFile", "multiSelections"],
    })
    if (selectorResponse.ok) {
      // setSelectedFiles(selectorResponse.data)
      // setStatus(Status.Sending)
      setStatus(Status.Failed)
    } else {
      setStatus(Status.Idle)
    }
  }, [config.fileTypeGroupName, config.fileTypes])

  const createFileEntity = useCallback(
    async (file: string) => {
      if (!deviceId) {
        return
      }
      const promise = dispatch(
        createEntityDataAction({
          deviceId,
          entitiesType: config.entitiesType,
          data: {
            filePath: config.storagePath + config.directoryPath + file,
            entityType: config.entitiesType,
          },
        })
      )
      entityCreatingAbortReference.current = (
        promise as unknown as {
          abort: VoidFunction
        }
      ).abort
      return (await promise) as CreateEntityResponse
    },
    [
      config.directoryPath,
      config.entitiesType,
      config.storagePath,
      deviceId,
      dispatch,
    ]
  )

  const uploadFiles = useCallback(async () => {
    if (!deviceId) {
      return
    }
    for (const [index, file] of selectedFiles.entries()) {
      setCurrentFileIndex(index)
      const fileName = getFileName(file)
      const preTransferResponse = await startPreSendFileRequest(
        file,
        config.storagePath + config.directoryPath + fileName,
        deviceId
      )

      if (!preTransferResponse.ok) {
        setFailedFiles((prevState) => [...prevState, file])
        continue
      }
      setCurrentFileTransferId(preTransferResponse.data.transferId)

      const transferPromise = dispatch(
        sendFile({
          deviceId,
          transferId: preTransferResponse.data.transferId,
          chunksCount: preTransferResponse.data.chunksCount,
        })
      )
      fileSendingAbortReference.current = (
        transferPromise as unknown as {
          abort: VoidFunction
        }
      ).abort

      const result = (await transferPromise) as SendFileResponse

      if (result.meta.requestStatus === "fulfilled") {
        const entityResponse = await createFileEntity(file)

        if (
          entityResponse &&
          entityResponse.meta.requestStatus === "fulfilled"
        ) {
          setSentFiles((prevState) => [...prevState, file])
        } else {
          setFailedFiles((prevState) => [...prevState, file])
        }
      } else {
        setFailedFiles((prevState) => [...prevState, file])
      }
    }
    setStatus(Status.Finished)
  }, [
    config.directoryPath,
    config.storagePath,
    createFileEntity,
    deviceId,
    dispatch,
    getFileName,
    selectedFiles,
  ])

  const sendingProgress = useMemo(() => {
    if (!currentFileTransferId) {
      return 0
    }

    const filesProgress = currentFileIndex / selectedFiles.length
    const singleFileProgressFactor = 1 / selectedFiles.length
    return parseFloat(
      (
        (filesProgress +
          (fileSendingProgress || 0) * singleFileProgressFactor) *
        100
      ).toFixed(2)
    )
  }, [
    currentFileIndex,
    currentFileTransferId,
    fileSendingProgress,
    selectedFiles.length,
  ])

  const reset = useCallback(() => {
    setSelectedFiles([])
    setSentFiles([])
    setFailedFiles([])
    setCurrentFileIndex(0)
    fileSendingAbortReference.current = undefined
    entityCreatingAbortReference.current = undefined
  }, [])

  const addFileButtonAction: ButtonAction = {
    type: "custom",
    callback: () => setStatus(Status.Selecting),
  }

  const modalCloseAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setStatus(Status.Idle)
      setTimeout(reset, modalTransitionDuration)
    },
  }

  const modalCancelButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      fileSendingAbortReference.current?.()
      entityCreatingAbortReference.current?.()
      setStatus(Status.Cancelled)
    },
  }

  useEffect(() => {
    switch (status) {
      case Status.Idle:
        break
      case Status.Selecting:
        void selectFiles()
        break
      case Status.Sending:
        void uploadFiles()
        break
      case Status.Finished:
        break
      case Status.Cancelled:
        break
      case Status.Failed:
        break
    }
  }, [reset, selectFiles, status, uploadFiles])

  // useEffect(() => {
  //   setError({
  //     title: intl.formatMessage(messages.uploadDuplicateFileTitle),
  //     message: intl.formatMessage(messages.uploadDuplicateFileDescription),
  //   })
  // }, [])

  useEffect(() => {
    setError({
      title: intl.formatMessage(messages.uploadInsufficientMemoryTitle),
      message: intl.formatMessage(
        messages.uploadInsufficientMemoryDescription,
        { value: "5 MB" }
      ),
    })
  }, [])

  // useEffect(() => {
  //   setError({
  //     title: intl.formatMessage(messages.uploadFileTooLargeTitle),
  //     message: intl.formatMessage(messages.uploadFileTooLargeDescription),
  //   })
  // }, [])

  return (
    <>
      <ButtonPrimary
        config={{ text: config.buttonText, actions: [addFileButtonAction] }}
        {...rest}
      />
      <Modal
        componentKey={"files-manager-upload-modal-sending"}
        config={{
          defaultOpened: status === Status.Sending,
          closeButtonAction: modalCancelButtonAction,
          size: "small",
        }}
      >
        <Modal.TitleIcon config={{ type: IconType.SpinnerDark }} />
        <Modal.Title>
          {intl.formatMessage(messages.progressModalTitle, {
            filesCount: selectedFiles.length,
          })}
        </Modal.Title>
        <ProgressBar
          config={{
            maxValue: 100,
          }}
          data={{
            value: sendingProgress,
            message: getFileName(selectedFiles[currentFileIndex]),
          }}
        />
      </Modal>
      <Modal
        componentKey={"files-manager-upload-modal-finished"}
        config={{
          defaultOpened: status === Status.Finished,
          closeButtonAction: modalCloseAction,
          size: "small",
        }}
      >
        <Modal.TitleIcon config={{ type: IconType.Success }} />
        <Modal.Title>
          {intl.formatMessage(messages.progressModalTitle, {
            filesCount: sentFiles.length,
          })}
        </Modal.Title>
        <p>Sent:</p>
        {sentFiles.map((file) => (
          <div key={file}>{file && getFileName(file)}</div>
        ))}
        <p>Failed:</p>
        {failedFiles.map((file) => (
          <div key={file}>{file && getFileName(file)}</div>
        ))}
        <Modal.Buttons config={{ vertical: true }}>
          <ButtonSecondary
            config={{ text: "Close", actions: [modalCloseAction] }}
          />
        </Modal.Buttons>
      </Modal>

      <Modal
        componentKey={"files-manager-upload-modal-failure"}
        config={{
          defaultOpened: status === Status.Failed,
          size: "small",
        }}
      >
        <FilesManagerUploadError
          closeAction={modalCloseAction}
          customError={error}
        />
      </Modal>
    </>
  )
}
