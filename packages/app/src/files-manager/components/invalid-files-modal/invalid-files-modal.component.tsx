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
import styled from "styled-components"
import {
  fontWeight,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"

const messages = defineMessages({
  title: {
    id: "module.filesManager.invalidFiledModalTitle",
  },
  filesInfo: {
    id: "module.filesManager.invalidFiledModalFilesInfo",
  },
  helpInfo: {
    id: "module.filesManager.invalidFiledModalHelpInfo",
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

export const InvalidFilesModal: FunctionComponent = ({ ...props }) => {
  const invalidFiles = useSelector(getInvalidFiles)
  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const dispatch = useDispatch()
  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      open={!!invalidFiles.length}
      closeButton
      onCloseButton={() => {
        dispatch(resetUploadingState())
      }}
      {...props}
    >
      <StyledModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.Info} width={3.2} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.filesInfo}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={{
            ...messages.helpInfo,
            values: {
              link: (
                <StyledLink onClick={openHelpWindow}>help pages</StyledLink>
              ),
            },
          }}
        />
      </StyledModalContent>
    </ModalDialog>
  )
}
