/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { ApiDeviceBackupInfo } from "devices/api-device/models"
import { Button, Modal, RadioInput, Typography } from "app-theme/ui"
import { ButtonType, IconType } from "app-theme/models"
import { useForm } from "react-hook-form"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.restore.filesSelectModal.title",
  },
  singleBackupDescription: {
    id: "apiDevice.restore.filesSelectModal.singleBackupDescription",
  },
  multipleBackupsDescription: {
    id: "apiDevice.restore.filesSelectModal.multipleBackupsDescription",
  },
  cancelButtonLabel: {
    id: "general.app.cancelButton.text",
  },
  continueButtonLabel: {
    id: "general.app.continueButton.text",
  },
})

interface Props {
  opened?: boolean
  backups: ApiDeviceBackupInfo[]
  onClose?: VoidFunction
  onConfirm?: (backup: ApiDeviceBackupInfo) => void
}

export const RestoreBackupFilesSelectModal: FunctionComponent<Props> = ({
  opened,
  backups,
  onClose,
  onConfirm,
}) => {
  const { register, watch } = useForm<{ selectedBackup: number }>()

  const handleConfirm = useCallback(() => {
    const selectedIndex = watch("selectedBackup") || 0
    onConfirm?.(backups[selectedIndex])
  }, [backups, onConfirm, watch])

  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Backup} />
      <Modal.Title message={messages.title.id} />
      <Modal.DenseContent>
        {backups.length === 1 ? (
          <>
            <Typography.P1 message={messages.singleBackupDescription.id} />
            <Typography.P1 as={"ul"}>
              <Typography.LI>
                {backups[0].createdAt.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography.LI>
            </Typography.P1>
          </>
        ) : (
          <>
            <Typography.P1 message={messages.multipleBackupsDescription.id} />
            <Modal.ScrollableContent>
              <Typography.P1 as={"ul"}>
                {backups.map((backup, index) => {
                  return (
                    <RadioInput
                      key={backup.createdAt.toString()}
                      {...register("selectedBackup")}
                      value={index}
                      defaultChecked={index === 0}
                    >
                      {backup.createdAt.toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </RadioInput>
                  )
                })}
              </Typography.P1>
            </Modal.ScrollableContent>
          </>
        )}
      </Modal.DenseContent>
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onClose}
          message={messages.cancelButtonLabel.id}
        />
        <Button
          type={ButtonType.Primary}
          onClick={handleConfirm}
          message={messages.continueButtonLabel.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
