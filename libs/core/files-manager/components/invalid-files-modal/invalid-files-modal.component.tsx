/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useDispatch, useSelector } from "react-redux"
import { getInvalidFiles } from "Core/files-manager/selectors/get-invalid-files.selector"
import {
  ModalContent,
  ModalDialog,
  ModalLink,
  RoundIconWrapper,
} from "Core/ui/components/modal-dialog"
import React from "react"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { resetUploadingState } from "Core/files-manager/actions"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { useHistory } from "react-router-dom"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"

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
  const history = useHistory()
  const openHelp = () => {
    history.push(URL_MAIN.help)
  }

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
              link: <ModalLink onClick={openHelp}>help pages</ModalLink>,
            },
          }}
        />
      </ModalContent>
    </ModalDialog>
  )
}
