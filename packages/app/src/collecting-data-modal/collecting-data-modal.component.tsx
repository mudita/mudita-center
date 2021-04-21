/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useState } from "react"
import { intl } from "Renderer/utils/intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CollectingDataModalTestIds } from "App/collecting-data-modal/collecting-data-modal-test-ids.enum"
import {
  ModalContent,
  Paragraph,
} from "App/collecting-data-modal/collecting-data-modal.styled"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { getAppSettings } from "Renderer/requests/app-settings.request"

const messages = defineMessages({
  title: { id: "component.collectingDataModalTitle" },
  text: { id: "component.collectingDataModalText" },
  body: { id: "component.collectingDataModalBody" },
  cancelButton: { id: "component.collectingDataModalCancel" },
  agreeButton: { id: "component.collectingDataModalAgree" },
})

type Properties = Required<Pick<ComponentProps<typeof ModalDialog>, "onActionButtonClick" | "closeModal">>

const CollectingDataModal: FunctionComponent<Properties> = ({onActionButtonClick, closeModal, ...props }) => {
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    ;(async () => {
      const response = await getAppSettings()
      setOpenModal(response.appCollectingData === undefined)
    })()
  }, [])

  const agree = () => {
    onActionButtonClick()
    setOpenModal(false)
  }

  const close = () => {
    closeModal()
    setOpenModal(false)
  }
  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      actionButtonLabel={intl.formatMessage(messages.agreeButton)}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
      {...props}
      open={openModal}
      closeModal={close}
      onActionButtonClick={agree}
    >
      <ModalContent>
        <Icon type={Type.MuditaLogoBg} width={12} height={12} />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Subtitle}
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.text}
        />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Body}
          displayStyle={TextDisplayStyle.MediumText}
          message={messages.body}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default CollectingDataModal
