/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import {
  ModalContent,
  ModalDialog,
  RoundIconWrapper,
} from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { ErrorConnectingModalTestIds } from "App/connecting/components/error-connecting-modal-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"
import {
  fontWeight,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"

const messages = defineMessages({
  errorConnectingModalHeaderTitle: {
    id: "module.connecting.errorConnectingModalHeaderTitle",
  },
  errorConnectingModalSecondaryButton: {
    id: "module.connecting.errorConnectingModalSecondaryButton",
  },
  errorConnectingModalTitle: {
    id: "module.connecting.errorConnectingModalTitle",
  },
  errorConnectingDescription: {
    id: "module.connecting.errorConnectingDescription",
  },
})
const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: ${fontWeight("default")};
  color: ${textColor("action")};
`
const StyledModalContent = styled(ModalContent)`
  p {
    text-align: left;
  }
`

const ErrorConnectingModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ onClose, ...props }) => {
  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)
  return (
    <ModalDialog
      testId={ErrorConnectingModalTestIds.Container}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.errorConnectingModalHeaderTitle)}
      actionButtonSize={Size.FixedMedium}
      closeButtonLabel={intl.formatMessage(
        messages.errorConnectingModalSecondaryButton
      )}
      onCloseButton={onClose}
      onClose={onClose}
      layer={ModalLayers.ErrorConnecting}
      {...props}
    >
      <StyledModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.ThinFail} width={3.2} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={{
            ...messages.errorConnectingModalTitle,
            values: {
              ...textFormatters,
            },
          }}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={{
            ...messages.errorConnectingDescription,
            values: {
              link: (
                <StyledLink onClick={openHelpWindow}>
                  connection help page.
                </StyledLink>
              ),
            },
          }}
        />
      </StyledModalContent>
    </ModalDialog>
  )
}

export default ErrorConnectingModal
