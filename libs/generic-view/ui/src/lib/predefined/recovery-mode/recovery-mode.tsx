/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Core/__deprecated__/renderer/utils/intl"
import { GenericThemeProvider } from "generic-view/theme"
import { H3 } from "../../texts/headers"
import { P3 } from "../../texts/paragraphs"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { Form } from "../../interactive/form/form"
import { WarrningBox } from "../../shared/shared"
import { ButtonPrimary } from "../../buttons/button-primary"

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

  const handleCheckboxChange = () => {
    setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed)
  }

  const onStartRecovery = () => {
    // will be finished in next PR
  }

  return (
    <Wrapper>
      <Header>
        <Icon type={IconType.RecoveryModeBlack} size={IconSize.Biggest} />
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
                action: {
                  type: "custom",
                  callback: onStartRecovery,
                },
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
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.white};
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
  color: red;
  label {
    font-size: 1.4rem;
    font-weight: 700;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 180px;
  }
`
