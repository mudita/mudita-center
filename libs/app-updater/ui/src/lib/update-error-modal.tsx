/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonTextModifier, ButtonType, IconType } from "app-theme/models"
import { FunctionComponent } from "react"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "general.appUpdate.errorModal.title",
  },
  description: {
    id: "general.appUpdate.errorModal.description",
  },
  descriptionLink: {
    id: "general.appUpdate.errorModal.description.link",
  },
  descriptionLinkText: {
    id: "general.appUpdate.errorModal.description.link.text",
  },
})

interface Props {
  opened: boolean
  onClose?: VoidFunction
}

export const UpdateErrorModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Typography.P1>
        {formatMessage(messages.description)}{" "}
        <Button
          type={ButtonType.Text}
          to={formatMessage(messages.descriptionLink)}
          modifiers={[
            ButtonTextModifier.Inline,
            ButtonTextModifier.HoverUnderline,
            ButtonTextModifier.Link,
          ]}
        >
          {formatMessage(messages.descriptionLinkText)}
        </Button>
        .
      </Typography.P1>
    </Modal>
  )
}
