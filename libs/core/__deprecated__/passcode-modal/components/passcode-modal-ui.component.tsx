/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ModalDialog, ModalDialogProps } from "Core/ui/components/modal-dialog"
import styled from "styled-components"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { PasscodeInputs } from "./passcode-inputs.component"
import PasscodeLocked from "Core/__deprecated__/passcode-modal/components/PasscodeLocked/passcode-locked.component"
import { PasscodeModalTestIds } from "Core/__deprecated__/passcode-modal/components/passcode-modal-test-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
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

export interface PasscodeModalProps
  extends Omit<ModalDialogProps, "close" | "open"> {
  openModal: boolean
  close: () => void
  values: string[]
  updateValues: (values: string[]) => void
  openHelpWindow: () => void
  onNotAllowedKeyDown: () => void
  errorMessage: string
  leftTime?: number | undefined
  canBeClosed: boolean
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
  canBeClosed,
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
      closeable={canBeClosed}
      closeButton={false}
      closeModal={canBeClosed ? close : undefined}
      title={muditaLogo}
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
