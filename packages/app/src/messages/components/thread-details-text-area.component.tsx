/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, KeyboardEvent } from "react"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Icon, {
  IconSize,
} from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  IconButton,
  Textarea,
  TextareaWrapper,
} from "App/messages/components/thread-details.styled"
import { ThreadDetailsTextAreaTestIds } from "App/messages/components/thread-details-text-area-tests-ids"
import { Feature, flags } from "App/feature-flags"
import { IconBackgroundWithTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-background-with-tooltip.component"
import { defineMessages } from "react-intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  sendButtonTooltipDescription: {
    id: "module.messages.sendButtonTooltipDescription",
  },
})

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onSendClick: () => void
  onAttachContactClick: () => void
}

const ThreadDetailsTextArea: FunctionComponent<Props> = ({
  value,
  onSendClick,
  onChange,
  onAttachContactClick,
}) => {
  const isValueEmpty = (): boolean => {
    return value.length === 0
  }

  const leadingIcons = [
    flags.get(Feature.MessagesThreadAttachContactEnabled) && (
      <IconButton
        key={IconType.AttachContact}
        Icon={IconType.AttachContact}
        onClick={onAttachContactClick}
        data-testid={ThreadDetailsTextAreaTestIds.AttachContactButton}
      />
    ),
    flags.get(Feature.MessagesThreadAttachTemplateEnabled) && (
      <Icon
        type={IconType.Template}
        key={IconType.Template}
        size={IconSize.Big}
      />
    ),
  ]

  const trailingIcon = [
    !isValueEmpty() && (
      <IconBackgroundWithTooltip
        data-testid={ThreadDetailsTextAreaTestIds.SendButton}
        key={IconType.Send}
        iconType={IconType.Send}
        onClick={onSendClick}
        description={messages.sendButtonTooltipDescription}
      />
    ),
  ]

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()

      if (!isValueEmpty()) {
        onSendClick()
      }
    }
  }

  return (
    <TextareaWrapper>
      <Textarea
        type="textarea"
        data-testid={ThreadDetailsTextAreaTestIds.Input}
        value={value}
        leadingIcons={leadingIcons}
        trailingIcons={trailingIcon}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        label={intl.formatMessage({
          id: "module.messages.textAreaPlaceholder",
        })}
      />
    </TextareaWrapper>
  )
}

export default ThreadDetailsTextArea
