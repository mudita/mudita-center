/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { useDispatch, useSelector } from "react-redux"
import { getInvalidFiles } from "App/files-manager/selectors/get-invalid-files.selector"
import {
  ModalContent,
  ModalDialog,
  ModalLink,
  RoundIconWrapper,
} from "App/ui/components/modal-dialog"
import React from "react"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { resetUploadingState } from "App/files-manager/actions"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"

const messages = defineMessages({
  title: {
    id: "module.filesManager.invalidFiledModalTitle",
  },
  headline: {
    id: "module.filesManager.invalidFiledModalHeadline",
  },
  filesInfo: {
    id: "module.filesManager.invalidFiledModalFilesInfo",
  },
  helpInfo: {
    id: "module.filesManager.invalidFiledModalHelpInfo",
  },
  button: {
    id: "module.filesManager.invalidFiledModalButton",
  },
})

export const InvalidFilesModal: FunctionComponent = ({ ...props }) => {
  const invalidFiles = useSelector(getInvalidFiles)
  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const dispatch = useDispatch()
  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      open={!!invalidFiles.length}
      closeButton={false}
      actionButtonSize={Size.FixedSmall}
      actionButtonLabel={intl.formatMessage(messages.button)}
      onActionButtonClick={() => {
        dispatch(resetUploadingState())
      }}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.Exclamation} width={4.8} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          color="primary"
          message={messages.headline}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          color="info"
          message={messages.filesInfo}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          color="info"
          message={{
            ...messages.helpInfo,
            values: {
              link: <ModalLink onClick={openHelpWindow}>help pages</ModalLink>,
            },
          }}
        />
      </ModalContent>
    </ModalDialog>
  )
}
