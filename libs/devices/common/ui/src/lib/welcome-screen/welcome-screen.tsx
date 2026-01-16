/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Typography, typographyStyles } from "app-theme/ui"
import { ButtonSize, ButtonTextModifier, ButtonType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import styled from "styled-components"
import DiagramSvg from "./img/diagram.svg?react"
import { WelcomeScreenTestIds } from "devices/common/models"

const messages = defineMessages({
  title: {
    id: "general.welcomeScreen.title",
  },
  subtitle: {
    id: "general.welcomeScreen.subtitle",
  },
  notNowButton: {
    id: "general.welcomeScreen.button.text",
  },
  troubleshootingButton: {
    id: "general.welcomeScreen.troubleshootingButton.text",
  },
})

const devicesMessages = defineMessages({
  kompakt: {
    id: "general.welcomeScreen.devices.kompakt",
  },
  harmony: {
    id: "general.welcomeScreen.devices.harmony",
  },
  harmony2: {
    id: "general.welcomeScreen.devices.harmony2",
  },
  // pure: {
  //   id: "general.welcomeScreen.devices.pure",
  // },
})

interface Props {
  onClose: VoidFunction
  onTroubleshoot: VoidFunction
}

export const WelcomeScreen: FunctionComponent<Props> = ({
  onClose,
  onTroubleshoot,
}) => {
  return (
    <Wrapper data-testid={WelcomeScreenTestIds.WelcomeScreen}>
      <Content>
        <Header>
          <WelcomeText>{formatMessage(messages.title)}</WelcomeText>
          <SubheadingText color={"grey1"}>
            {formatMessage(messages.subtitle)}
          </SubheadingText>
        </Header>
        <DevicesList>
          {Object.keys(devicesMessages).map((device) => (
            <li key={device}>
              {formatMessage(
                devicesMessages[device as keyof typeof devicesMessages]
              )}
            </li>
          ))}
        </DevicesList>
        <Diagram>
          <DiagramSvg />
        </Diagram>
      </Content>
      <Actions>
        <Button
          onClick={onClose}
          type={ButtonType.Secondary}
          size={ButtonSize.Large}
        >
          {formatMessage(messages.notNowButton)}
        </Button>
        <Button
          onClick={onTroubleshoot}
          type={ButtonType.Text}
          size={ButtonSize.AutoMin}
          modifiers={[ButtonTextModifier.Link]}
        >
          {formatMessage(messages.troubleshootingButton)}
        </Button>
      </Actions>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.app.color.white};
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.app.color.grey6};
`

const Header = styled.div`
  flex: 1;
  max-height: 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
`

const WelcomeText = styled(Typography.H1)`
  font-size: 4.8rem;
  line-height: 4.8rem;
  letter-spacing: -0.02em;
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
`

const SubheadingText = styled(Typography.P2)`
  font-size: 2.2rem;
  line-height: 3.2rem;
  letter-spacing: 0;
`

const DevicesList = styled.ul`
  padding: 0;
  margin: 3.4rem 0;
  list-style: none;
  display: flex;
  flex-direction: row;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    ${typographyStyles.paragraph.p1};
    color: ${({ theme }) => theme.app.color.black};

    &:not(:first-child) {
      &::before {
        content: "";
        display: inline-block;
        width: 0.1rem;
        height: 1.8rem;
        margin: 0 1.4rem;
        background-color: ${({ theme }) => theme.app.color.grey3};
      }
    }
  }
`

const Diagram = styled.div`
  width: calc(100% - 4rem);
  max-width: 89.2rem;
  aspect-ratio: 892 / 212;
  position: relative;

  > svg {
    position: absolute;
    width: 111%;
    height: 147%;
    transform: translate(-5%, -13%);
  }
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 3.6rem 0 1.8rem;
`
