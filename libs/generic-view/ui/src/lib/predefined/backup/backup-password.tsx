/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { TextInput } from "../../interactive/input/text-input"
import { ButtonPrimary } from "../../buttons/button-primary"
import { ButtonText } from "../../buttons/button-text"
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
      <ModalTitleIcon
        data={{
          type: IconType.Settings,
        }}
      />
      <h1>
        {intl.formatMessage(messages.title)}
        <HeadlineOptional>
          {intl.formatMessage(messages.subtitle)}
        </HeadlineOptional>
      </h1>
      <Text>
        {intl.formatMessage(messages.description)}
        <span>{intl.formatMessage(messages.description2)}</span>
      </Text>
      <TextInput
        config={{
          name: "password",
          label: intl.formatMessage(messages.passwordPlaceholder),
          type: "password",
        }}
      />
      <TextInput
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
      <ModalButtons $vertical>
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.confirmButtonLabel),
            action: nextAction,
            disabled: !password || !passwordsMatching,
          }}
        />
        <ButtonText
          config={{
            text: intl.formatMessage(messages.skipButtonLabel),
            action: skipAction,
            modifiers: ["link", "uppercase"],
          }}
        />
      </ModalButtons>
    </>
  )
}

export default withConfig(BackupPassword)

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
