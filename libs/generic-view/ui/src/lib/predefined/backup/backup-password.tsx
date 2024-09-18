/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonPrimary } from "../../buttons/button-primary"
import { ButtonText } from "../../buttons/button-text"
import { useFormContext } from "react-hook-form"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Form } from "../../interactive/form/form"
import { PredefinedBackupPasswordTestIds } from "e2e-test-ids"

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
  skipAction: ButtonAction
  nextAction: ButtonAction
}

export const BackupPassword: FunctionComponent<Props> = ({
  skipAction,
  nextAction,
}) => {
  const { watch, formState } = useFormContext()
  const password = watch("password")
  const passwordRepeat = watch("passwordRepeat")

  const passwordsMatching = password === passwordRepeat

  return (
    <>
      <Modal.TitleIcon
        config={{
          type: IconType.Settings,
        }}
      />
      <Modal.Title data-testid={PredefinedBackupPasswordTestIds.Title}>
        {intl.formatMessage(messages.title)}
        <HeadlineOptional>
          {intl.formatMessage(messages.subtitle)}
        </HeadlineOptional>
      </Modal.Title>
      <Text data-testid={PredefinedBackupPasswordTestIds.Description}>
        {intl.formatMessage(messages.description)}
        <span>{intl.formatMessage(messages.description2)}</span>
      </Text>
      <Form.TextInput
        data-testid={PredefinedBackupPasswordTestIds.PasswordPlaceholder}
        config={{
          name: "password",
          label: intl.formatMessage(messages.passwordPlaceholder),
          type: "password",
        }}
      />
      <Form.TextInput
        data-testid={PredefinedBackupPasswordTestIds.PasswordRepeatPlaceholder}
        config={{
          name: "passwordRepeat",
          label: intl.formatMessage(messages.passwordRepeatPlaceholder),
          type: "password",
          validation: {
            validate: (value: string, formValues) => {
              return (
                value === formValues.password ||
                intl.formatMessage(messages.passwordRepeatNotMatchingError)
              )
            },
          },
        }}
      />
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonPrimary
          data-testid={PredefinedBackupPasswordTestIds.ConfirmButton}
          config={{
            text: intl.formatMessage(messages.confirmButtonLabel),
            action: nextAction,
            disabled: !password || !passwordsMatching,
          }}
        />
        <ButtonText
          data-testid={PredefinedBackupPasswordTestIds.SkipButton}
          config={{
            text: intl.formatMessage(messages.skipButtonLabel),
            action: skipAction,
            modifiers: ["link", "uppercase"],
          }}
        />
      </Modal.Buttons>
    </>
  )
}

const HeadlineOptional = styled.span`
  margin: -0.2rem 0 0;
  display: block;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  letter-spacing: 0.02em;
`

const Text = styled.p`
  span {
    display: block;
    margin: 0;
    color: ${({ theme }) => theme.color.grey2};
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
`
