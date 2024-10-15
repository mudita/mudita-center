/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled, { ThemeProvider } from "styled-components"
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
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { flashMscDeviceService } from "../services"
import { RecoveryModeModal } from "./recovery-mode-modal/recovery-mode-modal.component"
import { selectFlashingProcessState } from "../selectors"
import { FlashingProcessState } from "../constants"
import theme from "Core/core/styles/theming/theme"
import { RestartingDeviceModal } from "./restarting-device-modal/restarting-device-modal.component"
import { MacTerminalInfoModal } from "./mac-terminal-info-modal/mac-terminal-info-modal.component"
import { abortMscFlashing } from "../actions"
import { WaitingForBackButtonModal } from "./waiting-for-back-button-modal.component"

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
  warningLinux: {
    id: "module.recoveryMode.harmony.warningLinux",
  },
  confirmation: {
    id: "module.recoveryMode.harmony.confirmation",
  },
  button: {
    id: "module.recoveryMode.harmony.action",
  },
  flashingProcessStep0: {
    id: "module.recoveryMode.modal.step0",
  },
  flashingProcessStep1: {
    id: "module.recoveryMode.modal.step1",
  },
  flashingProcessStep2: {
    id: "module.recoveryMode.modal.step2",
  },
  flashingProcessStep3: {
    id: "module.recoveryMode.modal.step3",
  },
  flashingProcessStep4: {
    id: "module.recoveryMode.modal.step4",
  },
})

const RecoveryModeUI: FunctionComponent = () => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const dispatch = useDispatch<Dispatch>()
  const flashingProcessState = useSelector(selectFlashingProcessState)

  const handleCheckboxChange = () => {
    setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed)
  }

  const onStartRecovery = () => {
    dispatch(flashMscDeviceService())
  }

  const isFlashingModalVisible = (): boolean => {
    return (
      flashingProcessState === FlashingProcessState.GettingFilesDetails ||
      flashingProcessState === FlashingProcessState.DownloadingFiles ||
      flashingProcessState === FlashingProcessState.UnpackingFiles ||
      flashingProcessState === FlashingProcessState.FlashingProcess
    )
  }

  const getProgressPercent = (): number => {
    switch (flashingProcessState) {
      case FlashingProcessState.GettingFilesDetails:
        return 12
      case FlashingProcessState.DownloadingFiles:
        return 37
      case FlashingProcessState.UnpackingFiles:
        return 62
      case FlashingProcessState.FlashingProcess:
        return 87
      default:
        return 0
    }
  }

  const getProgressMessage = (): { id: string } => {
    switch (flashingProcessState) {
      case FlashingProcessState.GettingFilesDetails:
        return messages.flashingProcessStep1
      case FlashingProcessState.DownloadingFiles:
        return messages.flashingProcessStep2
      case FlashingProcessState.UnpackingFiles:
        return messages.flashingProcessStep3
      case FlashingProcessState.FlashingProcess:
        return messages.flashingProcessStep4
      default:
        return messages.flashingProcessStep0
    }
  }

  const isRestartingModalVisible = (): boolean => {
    return flashingProcessState === FlashingProcessState.Restarting
  }
  const isWaitingForBackButtonVisible = (): boolean => {
    return flashingProcessState === FlashingProcessState.WaitingForBackButton
  }

  const isMacTerminalInfoModalVisible = (): boolean => {
    return flashingProcessState === FlashingProcessState.TerminalOpened
  }

  const cancelMscFlashing = (): void => {
    dispatch(abortMscFlashing({ reason: FlashingProcessState.Canceled }))
  }

  return (
    <>
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
              {process.platform === "linux" && (
                <li>
                  <P3>
                    {intl.formatMessage(messages.warningLinux, textFormatters)}
                  </P3>
                </li>
              )}
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
      <ThemeProvider theme={theme}>
        <RecoveryModeModal
          open={isFlashingModalVisible()}
          percent={getProgressPercent()}
          progressMessage={getProgressMessage()}
        />
        <RestartingDeviceModal open={isRestartingModalVisible()} />
        <MacTerminalInfoModal
          open={isMacTerminalInfoModalVisible()}
          onClose={cancelMscFlashing}
        />
        <WaitingForBackButtonModal
          open={isWaitingForBackButtonVisible()}
          onClose={cancelMscFlashing}
        />
      </ThemeProvider>
    </>
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
