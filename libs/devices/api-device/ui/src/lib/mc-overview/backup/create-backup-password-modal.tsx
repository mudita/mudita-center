/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect } from "react"
import { Button, Modal, TextInput, Typography } from "app-theme/ui"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  IconType,
  TextInputVariant,
} from "app-theme/models"
import { useForm } from "react-hook-form"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.backup.passwordModal.title",
  },
  subtitle: {
    id: "apiDevice.backup.passwordModal.subtitle",
  },
  description: {
    id: "apiDevice.backup.passwordModal.description",
  },
  descriptionWarning: {
    id: "apiDevice.backup.passwordModal.descriptionWarning",
  },
  confirmButtonLabel: {
    id: "apiDevice.backup.passwordModal.confirmButton",
  },
  skipButtonLabel: {
    id: "apiDevice.backup.passwordModal.skipButton",
  },
  passwordLabel: {
    id: "apiDevice.backup.passwordModal.passwordPlaceholder",
  },
  passwordRepeatLabel: {
    id: "apiDevice.backup.passwordModal.passwordRepeatPlaceholder",
  },
  passwordMismatchError: {
    id: "apiDevice.backup.passwordModal.passwordMismatchError",
  },
})

interface Props {
  opened?: boolean
  onClose?: VoidFunction
  onConfirm?: (password?: string) => void
}

export const CreateBackupPasswordModal: FunctionComponent<Props> = ({
  opened,
  onClose,
  onConfirm,
}) => {
  const { watch, register, formState, reset } = useForm<{
    password: string
    passwordRepeat: string
  }>({ mode: "all" })
  const { errors, isValid } = formState
  const password = watch("password") || ""

  const handleConfirm = useCallback(() => {
    onConfirm?.(password)
  }, [onConfirm, password])

  const handleSkip = useCallback(() => {
    onConfirm?.()
  }, [onConfirm])

  useEffect(() => {
    reset()
  }, [opened, reset])

  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Settings} />
      <Modal.Title>
        {formatMessage(messages.title)}
        <br />
        <Typography.P1 message={messages.subtitle.id} />
      </Modal.Title>
      <Typography.P1>
        {formatMessage(messages.description)}
        <br />
        <Typography.P2 color={"grey2"} as={"span"}>
          {formatMessage(messages.descriptionWarning)}
        </Typography.P2>
      </Typography.P1>
      <TextInput
        type={"password"}
        variant={TextInputVariant.Filled}
        placeholder={formatMessage(messages.passwordLabel)}
        error={errors.password?.message}
        {...register("password")}
      />
      <TextInput
        type={"password"}
        variant={TextInputVariant.Filled}
        placeholder={formatMessage(messages.passwordRepeatLabel)}
        error={errors.passwordRepeat?.message}
        {...register("passwordRepeat", {
          validate: (value = "", formValues) => {
            const password = formValues.password || ""
            return (
              value === password ||
              formatMessage(messages.passwordMismatchError)
            )
          },
        })}
      />
      <Modal.DenseContent>
        <Button
          type={ButtonType.Primary}
          onClick={handleConfirm}
          size={ButtonSize.Medium}
          disabled={!isValid || !password}
          message={messages.confirmButtonLabel.id}
        />
        <Button
          type={ButtonType.Text}
          modifiers={[ButtonTextModifier.Link]}
          onClick={handleSkip}
          size={ButtonSize.Medium}
          message={messages.skipButtonLabel.id}
        />
      </Modal.DenseContent>
    </Modal>
  )
}
