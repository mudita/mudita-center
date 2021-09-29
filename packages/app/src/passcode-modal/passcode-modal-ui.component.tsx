/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalContent } from "Renderer/wrappers/collecting-data-modal/collecting-data-modal.styled"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import styled from "styled-components"
import theme from "App/renderer/styles/theming/theme"
import { zIndex } from "Renderer/styles/theming/theme-getters"
import Icon, {
  IconSize,
} from "App/renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { PasscodeInputs } from "./components/passcode-inputs.component"
import PasscodeLocked from "App/passcode-modal/components/PasscodeLocked/passcode-locked.component"
import { flags, Feature } from "App/feature-flags"

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 5rem;
  span {
    width: 8.1rem;
    height: 5.6rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin-left: 0.4rem;
    padding: 0.4rem;
    width: auto;
    height: auto;
  }
`

export const PasscodeModalContent = styled(ModalContent)`
  justify-content: space-between;
  height: clamp(28rem, 60vh, 46.4rem);
`

export interface PasscodeModalProps {
  openModal: boolean
  close: () => void
  values: string[]
  updateValues: (values: string[]) => void
  openHelpWindow: () => void
  onNotAllowedKeyDown: () => void
  errorMessage: string
  passcodeBlockedTime?: number | undefined
}

const PasscodeModalUI: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  close,
  values,
  updateValues,
  openHelpWindow,
  onNotAllowedKeyDown,
  errorMessage,
  passcodeBlockedTime = undefined,
  ...props
}) => {
  const muditaLogo = (
    <LogoWrapper>
      <Icon
        type={Type.MuditaLogoVertical}
        key={Type.MuditaLogoVertical}
        size={IconSize.Bigger}
      />
    </LogoWrapper>
  )

  return (
    <ModalDialog
      {...props}
      open={openModal}
      closeButton={false}
      closeModal={close}
      title={muditaLogo}
      zIndex={zIndex("passCodeModal")({ theme })}
    >
      <PasscodeModalContent>
        <span></span>
        {flags.get(Feature.PhoneLockTimer) ? (
          passcodeBlockedTime ? (
            <PasscodeLocked time={passcodeBlockedTime} />
          ) : (
            <PasscodeInputs
              values={values}
              errorMessage={errorMessage}
              onNotAllowedKeyDown={onNotAllowedKeyDown}
              updateValues={updateValues}
            />
          )
        ) : (
          <PasscodeInputs
            values={values}
            errorMessage={errorMessage}
            onNotAllowedKeyDown={onNotAllowedKeyDown}
            updateValues={updateValues}
          />
        )}
        <ButtonContainer>
          <ButtonComponent
            displayStyle={DisplayStyle.Link3}
            labelMessage={{
              id: "component.passcodeModalHelp",
            }}
            onClick={openHelpWindow}
          />
        </ButtonContainer>
      </PasscodeModalContent>
    </ModalDialog>
  )
}

export default PasscodeModalUI
