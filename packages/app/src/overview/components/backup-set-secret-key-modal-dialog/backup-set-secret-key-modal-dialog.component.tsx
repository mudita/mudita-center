/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { ComponentProps } from "react"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { intl } from "Renderer/utils/intl"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import styled, { css } from "styled-components"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import Button from "Renderer/components/core/button/button.component"
import { FieldValues, useForm } from "react-hook-form"
import { backupSecretKeyValidator } from "Renderer/utils/form-validators"
import { PasswordField } from "App/ui"
import { BackupSetSecretKeyModalTestIds } from "App/overview/components/backup-set-secret-key-modal-dialog/backup-set-secret-key-modal-dialog-test-ids.enum"

enum FieldKeys {
  SecretKey = "secretKey",
  ConfirmationSecretKey = "confirmationSecretKey",
}

export interface BackupSetSecretKeyFieldValues extends FieldValues {
  [FieldKeys.SecretKey]: string
  [FieldKeys.ConfirmationSecretKey]: string
}

const messages = defineMessages({
  backupSetSecretKeyModalHeaderTitle: {
    id: "module.overview.backupSetSecretKeyModalHeaderTitle",
  },
  backupSetSecretKeyModalDescription: {
    id: "module.overview.backupSetSecretKeyModalDescription",
  },
  backupSetSecretKeyModalMainButton: {
    id: "module.overview.backupSetSecretKeyModalMainButton",
  },
  backupSetSecretKeyModalInputLabel: {
    id: "module.overview.backupSetSecretKeyModalInputLabel",
  },
  backupSetConfirmationSecretKeyModalInputLabel: {
    id: "module.overview.backupSetConfirmationSecretKeyModalInputLabel",
  },
  backupSecretKeyConfirmationDoesntMatch: {
    id: "module.overview.backupSecretKeyConfirmationDoesntMatch",
  },
  backupSecretKeyRequired: {
    id: "module.overview.backupSecretKeyRequired",
  },
})

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  & > p:first-of-type {
    text-align: left;
    margin-top: calc(-4rem + 0.8rem);
  }
`

const Form = styled.form`
  margin-top: 4.8rem;
  display: flex;
  flex-direction: column;
  padding: 0 0.8rem;
  min-height: 21.4rem;
`

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
`
const FirstPasswordField = styled(PasswordField)<{
  errorMessage: string | undefined
}>`
  ${({ errorMessage }) =>
    errorMessage &&
    css`
      margin-bottom: 1.6rem;
    `};
`

const ButtonWithRotatingIcon = styled(Button)``

const Modal: FunctionComponent<ComponentProps<typeof ModalDialog>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <ModalDialog
    size={size}
    title={intl.formatMessage(messages.backupSetSecretKeyModalHeaderTitle)}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </ModalDialog>
)

interface BackupSetSecretKeyModalProps
  extends ComponentProps<typeof ModalDialog> {
  onSecretKeySet: (secretKey: string) => void
}

// TODO: Provide some abstraction to hide structure modal behind core
//  https://appnroll.atlassian.net/browse/CP-757
export const BackupSetSecretKeyModal: FunctionComponent<BackupSetSecretKeyModalProps> =
  ({ onSecretKeySet, ...props }) => {
    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm<BackupSetSecretKeyFieldValues>({
      mode: "onChange",
    })
    const fields = watch()

    const handleSubmitClick = handleSubmit((data) => {
      onSecretKeySet(data.secretKey)
    })

    return (
      <Modal
        closeButton={false}
        title={intl.formatMessage(messages.backupSetSecretKeyModalHeaderTitle)}
        {...props}
      >
        <ModalText
          displayStyle={TextDisplayStyle.MediumFadedText}
          message={messages.backupSetSecretKeyModalDescription}
        />
        <Form onSubmit={handleSubmitClick}>
          <FirstPasswordField
            label={messages.backupSetSecretKeyModalInputLabel}
            errorMessage={errors[FieldKeys.SecretKey]?.message}
            {...register(FieldKeys.SecretKey, backupSecretKeyValidator)}
            data-testid={BackupSetSecretKeyModalTestIds.FirstInput}
          />
          <PasswordField
            label={messages.backupSetConfirmationSecretKeyModalInputLabel}
            errorMessage={errors[FieldKeys.ConfirmationSecretKey]?.message}
            data-testid={BackupSetSecretKeyModalTestIds.SecondInput}
            {...register(FieldKeys.ConfirmationSecretKey, {
              required: {
                value: true,
                message: intl.formatMessage(messages.backupSecretKeyRequired),
              },
              validate: (value): string | undefined => {
                if (value === fields[FieldKeys.SecretKey]) {
                  return
                }

                return intl.formatMessage(
                  messages.backupSecretKeyConfirmationDoesntMatch
                )
              },
            })}
          />

          <ButtonWrapper>
            <ButtonWithRotatingIcon
              type={Type.Submit}
              displayStyle={DisplayStyle.Primary}
              label={intl.formatMessage(
                messages.backupSetSecretKeyModalMainButton
              )}
              data-testid={BackupSetSecretKeyModalTestIds.SubmitButton}
            />
          </ButtonWrapper>
        </Form>
      </Modal>
    )
  }
