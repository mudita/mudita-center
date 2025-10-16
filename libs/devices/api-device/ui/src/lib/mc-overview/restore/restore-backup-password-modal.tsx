/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect } from "react"
import { Button, Modal, TextInput, Typography } from "app-theme/ui"
import { ButtonType, IconType, TextInputVariant } from "app-theme/models"
import { useForm } from "react-hook-form"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.restore.passwordModal.title",
  },
  description: {
    id: "apiDevice.restore.passwordModal.description",
  },
  passwordPlaceholder: {
    id: "apiDevice.restore.passwordModal.passwordPlaceholder",
  },
  passwordLengthError: {
    id: "apiDevice.restore.passwordModal.passwordLengthError",
  },
  passwordMismatchError: {
    id: "apiDevice.restore.passwordModal.passwordMismatchError",
  },
  confirmButtonLabel: {
    id: "apiDevice.restore.passwordModal.confirmButton",
  },
})

interface Props {
  opened?: boolean
  onConfirm: (password?: string) => boolean
  onClose?: VoidFunction
}

export const RestoreBackupPasswordModal: FunctionComponent<Props> = ({
  opened,
  onClose,
  onConfirm,
}) => {
  const { register, watch, reset, formState, setError } = useForm<{
    password: string
  }>({
    mode: "all",
  })
  const { errors, isValid } = formState
  const password = watch("password") || ""

  const handleConfirm = useCallback(() => {
    const result = onConfirm(password)

    if (!result) {
      setError("password", {
        type: "manual",
        message: formatMessage(messages.passwordMismatchError),
      })
    }
  }, [onConfirm, password, setError])

  useEffect(() => {
    reset()
  }, [opened, reset])

  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Settings} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <TextInput
        type={"password"}
        variant={TextInputVariant.Filled}
        placeholder={formatMessage(messages.passwordPlaceholder)}
        error={errors.password?.message}
        {...register("password", {
          required: formatMessage(messages.passwordLengthError),
        })}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Primary}
          onClick={handleConfirm}
          disabled={!isValid}
          message={messages.confirmButtonLabel.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
