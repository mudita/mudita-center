/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Core/__deprecated__/renderer/utils/intl"
import { GenericThemeProvider } from "generic-view/theme"
import { H3 } from "../../../../../generic-view/ui/src/lib/texts/headers"
import { P3 } from "../../../../../generic-view/ui/src/lib/texts/paragraphs"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { Form } from "../../../../../generic-view/ui/src/lib/interactive/form/form"
import { WarrningBox } from "../../../../../generic-view/ui/src/lib/shared/shared"
import { ButtonPrimary } from "../../../../../generic-view/ui/src/lib/buttons/button-primary"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { flashMscDeviceService } from "../services"

const messages = defineMessages({
  header: {
    id: "module.recoveryMode.harmony.header",
  },
  description: {
    id: "module.recoveryMode.harmony.description",
  },
  warning1: {
    id: "module.recoveryMode.harmony.warning1",
  },
  warning2: {
    id: "module.recoveryMode.harmony.warning2",
  },
  warning3: {
    id: "module.recoveryMode.harmony.warning3",
  },
  warning4: {
    id: "module.recoveryMode.harmony.warning4",
  },
  confirmation: {
    id: "module.recoveryMode.harmony.confirmation",
  },
  button: {
    id: "module.recoveryMode.harmony.action",
  },
})

const RecoveryModeUI: FunctionComponent = () => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const dispatch = useDispatch<Dispatch>()

  const handleCheckboxChange = () => {
    setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed)
  }

  const onStartRecovery = () => {
    dispatch(flashMscDeviceService())
  }

  return (
    <Wrapper>
      <Header>
        <Icon type={IconType.RecoveryModeBlack} size={IconSize.ExtraLarge} />
        <H3>{intl.formatMessage(messages.header)}</H3>
        <P3>{intl.formatMessage(messages.description)}</P3>
      </Header>
      <WarrningBox>
        <Warning>
          <ul>
            <li>
              <P3>{intl.formatMessage(messages.warning1, textFormatters)}</P3>
            </li>
            <li>
              <P3>{intl.formatMessage(messages.warning2)}</P3>
            </li>
            <li>
              <P3>{intl.formatMessage(messages.warning3)}</P3>
            </li>
            <li>
              <P3>{intl.formatMessage(messages.warning4)}</P3>
            </li>
          </ul>
          <Form>
            <Confirmation>
              <Form.CheckboxInput
                config={{
                  name: "confirmation",
                  value: "confirmation",
                  label: intl.formatMessage(messages.confirmation),
                  checked: isConfirmed,
                  onToggle: handleCheckboxChange,
                }}
              />
            </Confirmation>
          </Form>
          <Footer>
            <ButtonPrimary
              config={{
                text: intl.formatMessage(messages.button),
                actions: [
                  {
                    type: "custom",
                    callback: onStartRecovery,
                  },
                ],
                disabled: !isConfirmed,
              }}
            />
          </Footer>
        </Warning>
      </WarrningBox>
    </Wrapper>
  )
}

export const RecoveryModePage: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <RecoveryModeUI />
    </GenericThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  padding-top: 4.7rem;
  background: ${({ theme }) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return theme.color.white
  }};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;

  p {
    text-align: center;
  }
`

const Warning = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: 0;
    padding-left: 1rem;
  }
`

const Confirmation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 700;
    max-width: 100%;
  }

  input + label {
    align-items: center;
  }

  input + label div:first-child {
    align-self: center;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 18rem;
  }
`
