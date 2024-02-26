/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { RoundIconWithTitle } from "../../shared/shared"
import { TextInput } from "../../interactive/input/text-input"
import { ButtonPrimary } from "../../buttons/button-primary"
import { ButtonText } from "../../buttons/button-text"
import { useFormContext } from "react-hook-form"

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

  const isPasswordValid =
    !formState.errors["password"] && password && password === passwordRepeat

  return (
    <>
      <RoundIconWithTitle
        icon={IconType.Settings}
        title={"Create password for backup"}
      />
      <HeadlineOptional>(optional)</HeadlineOptional>
      <Main>
        <p>
          You can protect backup with a new password.
          <span>* You can&apos;t change/recover the password later.</span>
        </p>
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
              deps: ["password"],
              validate: (value: string, formValues) => {
                return (
                  value === formValues.password || "Password does not match"
                )
              },
            },
          }}
        />
      </Main>
      <Buttons>
        <ButtonPrimary
          config={{
            text: "Confirm password",
            action: nextAction,
            disabled: !isPasswordValid,
          }}
        />
        <ButtonText
          config={{
            text: "Skip password",
            action: skipAction,
            modifiers: ["link", "uppercase"],
          }}
        />
      </Buttons>
    </>
  )
}

export default withConfig(BackupPassword)

const HeadlineOptional = styled.h2`
  margin: calc(var(--mainGap) * -1) 0 0;
  display: block;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  letter-spacing: 0.02em;
`

const Main = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  & > p {
    color: ${({ theme }) => theme.color.grey1};
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    letter-spacing: 0.02em;
    text-align: center;
    margin: 0;

    span {
      display: block;
      margin: 0;
      color: ${({ theme }) => theme.color.grey2};
      font-weight: ${({ theme }) => theme.fontWeight.light};
    }
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
`
