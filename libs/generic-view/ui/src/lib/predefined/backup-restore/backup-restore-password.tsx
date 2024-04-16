/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonPrimary } from "../../buttons/button-primary"
import { useFormContext } from "react-hook-form"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { selectBackupRestorePassword } from "generic-view/store"
import { useSelector } from "react-redux"
import { secureBackupPasswordRequest } from "device/feature"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Form } from "../../interactive/form/form"

const messages = defineMessages({
  title: {
    id: "module.genericViews.restore.password.title",
  },
  description: {
    id: "module.genericViews.restore.password.description",
  },
  passwordPlaceholder: {
    id: "module.genericViews.restore.password.passwordPlaceholder",
  },
  confirmButtonLabel: {
    id: "module.genericViews.restore.password.confirmButtonLabel",
  },
  wrongPasswordError: {
    id: "module.genericViews.restore.password.wrongPasswordError",
  },
})

interface Props {
  nextAction: ButtonAction
}

export const BackupRestorePassword: FunctionComponent<Props> = ({
  nextAction,
}) => {
  const { watch } = useFormContext()
  const password = watch("password")
  const backupPassword = useSelector(selectBackupRestorePassword)

  const validatePassword = async (value: string) => {
    const passwordResponse = await secureBackupPasswordRequest(value)
    const isPasswordValid = passwordResponse.data === backupPassword
    return isPasswordValid || intl.formatMessage(messages.wrongPasswordError)
  }

  return (
    <>
      <Modal.TitleIcon
        data={{
          type: IconType.Settings,
        }}
      />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Text>{intl.formatMessage(messages.description)}</Text>
      <Form.TextInput
        config={{
          name: "password",
          label: intl.formatMessage(messages.passwordPlaceholder),
          type: "password",
          validation: {
            required: true,
            validate: validatePassword,
          },
        }}
      />
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.confirmButtonLabel),
            action: nextAction,
            disabled: !password,
          }}
        />
      </Modal.Buttons>
    </>
  )
}

const Text = styled.p`
  span {
    display: block;
    margin: 0;
    color: ${({ theme }) => theme.color.grey2};
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
`
