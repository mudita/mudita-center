/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import {
  ModalContent,
  ModalDialog,
  ModalLink,
  RoundIconWrapper,
} from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { ErrorConnectingModalTestIds } from "App/connecting/components/error-connecting-modal-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"

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
> = ({ closeModal, ...props }) => {
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
      onClose={closeModal}
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
              link: (
                <ModalLink onClick={openHelpWindow}>
                  connection help page.
                </ModalLink>
              ),
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
                <ModalLink onClick={openHelpWindow}>
                  connection help page.
                </ModalLink>
              ),
            },
          }}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default ErrorConnectingModal
