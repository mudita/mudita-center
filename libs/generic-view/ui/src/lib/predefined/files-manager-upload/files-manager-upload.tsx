/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Fragment, useCallback, useEffect, useRef } from "react"
import { APIFC, IconType } from "generic-view/utils"
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
  sendFile,
  SendFileResponse,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { modalTransitionDuration } from "generic-view/theme"
import { startPreSendFileRequest } from "device/feature"
import {
  TransferStatus,
  useTransferringFilesInfo,
} from "./use-transferring-files-info"

const messages = defineMessages({
  progressModalTitle: {
    id: "module.genericViews.filesManager.upload.progress.modalTitle",
  },
})

export const FilesManagerUpload: APIFC<
  undefined,
  McFilesManagerUploadConfig
> = ({ config, data, ...rest }) => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveApiDeviceId)
  const fileSendingAbortReference = useRef<VoidFunction>()
  const entityCreatingAbortReference = useRef<VoidFunction>()
  const {
    files,
    filesCount,
    currentFile,
    sentFiles,
    failedFiles,
    transferStatus,
    transferProgress,
    initFiles,
    updateFile,
    clearFiles,
  } = useTransferringFilesInfo()

  const selectFiles = useCallback(async () => {
    const selectorResponse = await openFileRequest({
      filters: [
        {
          name: config.fileTypeGroupName,
          extensions: config.fileTypes,
        },
      ],
      properties:
        config.multiple ?? true
          ? ["openFile", "multiSelections"]
          : ["openFile"],
    })
    if (selectorResponse.ok) {
      await initFiles(selectorResponse.data)
    }
  }, [config.fileTypeGroupName, config.fileTypes, config.multiple, initFiles])

  const createFileEntity = useCallback(
    async (fileName: string) => {
      if (!deviceId) {
        return
      }
      const promise = dispatch(
        createEntityDataAction({
          deviceId,
          entitiesType: config.entitiesType,
          data: {
            filePath: config.storagePath + config.directoryPath + fileName,
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
    for (const [filePath, fileInfo] of Object.entries(files)) {
      updateFile(filePath, { status: "in-progress" })
      const fileName = fileInfo.name
      const preTransferResponse = await startPreSendFileRequest(
        filePath,
        config.storagePath + config.directoryPath + fileName,
        deviceId
      )

      if (!preTransferResponse.ok) {
        updateFile(filePath, { status: "failed" })
        continue
      }

      const { transferId, chunksCount } = preTransferResponse.data

      updateFile(filePath, { transferId, progress: 0 })

      const transferPromise = dispatch(
        sendFile({
          deviceId,
          transferId,
          chunksCount,
          filePath,
        })
      )
      fileSendingAbortReference.current = (
        transferPromise as unknown as {
          abort: VoidFunction
        }
      ).abort

      const sendFileResponse = (await transferPromise) as SendFileResponse
      if (sendFileResponse.meta.requestStatus === "rejected") {
        updateFile(filePath, { status: "failed" })
        continue
      }

      const entityResponse = await createFileEntity(fileInfo.name)
      if (!entityResponse || entityResponse.meta.requestStatus === "rejected") {
        updateFile(filePath, { status: "failed" })
        continue
      }

      updateFile(filePath, { status: "sent" })
    }
  }, [
    config.directoryPath,
    config.storagePath,
    createFileEntity,
    deviceId,
    dispatch,
    files,
    updateFile,
  ])

  const abort = useCallback(() => {
    fileSendingAbortReference.current?.()
    entityCreatingAbortReference.current?.()
  }, [])

  const reset = useCallback(() => {
    clearFiles()
    abort()
  }, [abort, clearFiles])

  const addFileButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      void selectFiles()
    },
  }

  const modalCloseAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setTimeout(reset, modalTransitionDuration)
    },
  }

  const modalCancelButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      reset()
    },
  }

  useEffect(() => {
    if (transferStatus === TransferStatus.Ready) {
      void uploadFiles()
    }
  }, [files, transferStatus, uploadFiles])

  return (
    <>
      <ButtonPrimary
        config={{ text: config.buttonText, actions: [addFileButtonAction] }}
        {...rest}
      />
      <Modal
        componentKey={"files-manager-upload-modal-sending"}
        config={{
          defaultOpened: transferStatus === TransferStatus.Sending,
          closeButtonAction: modalCancelButtonAction,
          size: "small",
        }}
      >
        <Modal.TitleIcon config={{ type: IconType.SpinnerDark }} />
        <Modal.Title>
          {intl.formatMessage(messages.progressModalTitle, {
            filesCount: Object.keys(filesCount).length,
          })}
        </Modal.Title>
        <ProgressBar
          config={{
            maxValue: 100,
          }}
          data={{
            value: transferProgress,
            message: currentFile?.name,
          }}
        />
      </Modal>
      <Modal
        componentKey={"files-manager-upload-modal-finished"}
        config={{
          defaultOpened: transferStatus === TransferStatus.Finished,
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
          <div key={file.path}>{file.name}</div>
        ))}
        <p>Failed:</p>
        {failedFiles.map((file) => (
          <div key={file.path}>{file.name}</div>
        ))}
        <Modal.Buttons config={{ vertical: true }}>
          <ButtonSecondary
            config={{ text: "Close", actions: [modalCloseAction] }}
          />
        </Modal.Buttons>
      </Modal>
    </>
  )
}
