/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalContent } from "App/__deprecated__/renderer/modules/settings/components/collecting-data-modal/collecting-data-modal.styled"
import { ModalDialog } from "App/ui/components/modal-dialog"
import styled from "styled-components"
import theme from "App/__deprecated__/renderer/styles/theming/theme"
import { zIndex } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Icon, {
  IconSize,
} from "App/__deprecated__/renderer/components/core/icon/icon.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { PasscodeInputs } from "./components/passcode-inputs.component"
import PasscodeLocked from "App/__deprecated__/passcode-modal/components/PasscodeLocked/passcode-locked.component"
import { PasscodeModalTestIds } from "App/__deprecated__/passcode-modal/passcode-modal-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
  leftTime?: number | undefined
}

const PasscodeModalUI: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  close,
  values,
  updateValues,
  openHelpWindow,
  onNotAllowedKeyDown,
  errorMessage,
  leftTime,
  ...props
}) => {
  const muditaLogo = (
    <LogoWrapper>
      <Icon
        type={IconType.MuditaLogoVertical}
        key={IconType.MuditaLogoVertical}
        size={IconSize.Bigger}
      />
    </LogoWrapper>
  )

  return (
    <ModalDialog
      testId={PasscodeModalTestIds.Container}
      {...props}
      open={openModal}
      closeButton={false}
      closeModal={close}
      title={muditaLogo}
      zIndex={zIndex("passCodeModal")({ theme })}
    >
      <PasscodeModalContent>
        <span></span>
        {leftTime ? (
          <PasscodeLocked leftTime={leftTime} />
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
            displayStyle={DisplayStyle.ActionLink}
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
