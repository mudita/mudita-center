/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { TextInput } from "../../interactive/input/text-input"
import { ButtonPrimary } from "../../buttons/button-primary"
import { useFormContext } from "react-hook-form"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.password.title",
  },
  subtitle: {
    id: "module.genericViews.backup.password.subtitle",
  },
  description: {
    id: "module.genericViews.backup.password.description",
  },
  description2: {
    id: "module.genericViews.backup.password.description2",
  },
  passwordPlaceholder: {
    id: "module.genericViews.backup.password.passwordPlaceholder",
  },
  passwordRepeatPlaceholder: {
    id: "module.genericViews.backup.password.passwordRepeatPlaceholder",
  },
  confirmButtonLabel: {
    id: "module.genericViews.backup.password.confirmButtonLabel",
  },
  skipButtonLabel: {
    id: "module.genericViews.backup.password.skipButtonLabel",
  },
  passwordRepeatNotMatchingError: {
    id: "module.genericViews.backup.password.passwordRepeatNotMatchingError",
  },
})

interface Props {
  nextAction: ButtonAction
}

export const BackupRestorePassword: FunctionComponent<Props> = ({
  nextAction,
}) => {
  const { watch, formState } = useFormContext()
  const password = watch("password")

  const validatePassword = async (value: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return value === "1234" || "Wrong password, try again"
  }

  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Settings,
        }}
      />
      <h1>Password</h1>
      <Text>Enter the backup password.</Text>
      <TextInput
        config={{
          name: "password",
          label: intl.formatMessage(messages.passwordPlaceholder),
          type: "password",
          validation: {
            required: "Password should contain minimum one character",
            validate: validatePassword,
          },
        }}
      />
      <ModalButtons $vertical>
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.confirmButtonLabel),
            action: nextAction,
            disabled: !password || !formState.isValid,
          }}
        />
      </ModalButtons>
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
