/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import React, { ComponentProps, ReactNode } from "react"
import { defineMessages } from "react-intl"
import {
  ModalContent,
  ModalDialog,
  ModalLink,
  RoundIconWrapper,
} from "Core/ui/components/modal-dialog"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { ErrorConnectingModalTestIds } from "Core/connecting/components/error-connecting-modal-test-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"

const messages = defineMessages({
  errorConnectingModalHeaderTitle: {
    id: "module.connecting.errorConnectingModalHeaderTitle",
  },
  errorConnectingModalHeaderSubtitle: {
    id: "module.connecting.errorConnectingModalHeaderSubTitle",
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

const ErrorConnectingModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ closeModal, onClose, ...props }) => {
  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)
  return (
    <ModalDialog
      testId={ErrorConnectingModalTestIds.Container}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.errorConnectingModalHeaderTitle)}
      actionButtonSize={Size.FixedMedium}
      layer={ModalLayers.ErrorConnecting}
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.errorConnectingModalSecondaryButton
      )}
      onActionButtonClick={closeModal}
      onClose={onClose}
      closeModal={closeModal}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.ThinFail} width={3.2} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          color="primary"
          message={messages.errorConnectingModalHeaderSubtitle}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          color="info"
          message={messages.errorConnectingModalTitle}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          color="info"
          message={{
            ...messages.errorConnectingDescription,
            values: {
              link: (...chunks: ReactNode[]) => (
                <ModalLink onClick={openHelpWindow}>{chunks}</ModalLink>
              ),
            },
          }}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default ErrorConnectingModal
