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
        Create password for backup
        <HeadlineOptional>(optional)</HeadlineOptional>
      </h1>
      <Text>
        You can protect backup with a new password.
        <span>* You can&apos;t change/recover the password later.</span>
      </Text>
      <TextInput
        config={{
          name: "password",
          label: "Password",
          type: "password",
        }}
      />
      <TextInput
        config={{
          name: "passwordRepeat",
          label: "Repeat password",
          type: "password",
          validation: {
            validate: (value: string, formValues) => {
              return value === formValues.password || "Password does not match"
            },
          },
        }}
      />
      <ModalButtons $vertical>
        <ButtonPrimary
          config={{
            text: "Confirm password",
            action: nextAction,
            disabled: !password || !passwordsMatching,
          }}
        />
        <ButtonText
          config={{
            text: "Skip password",
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
