/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, KeyboardEvent } from "react"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  Textarea,
  TextareaWrapper,
} from "App/messages/components/thread-details.styled"
import { ThreadDetailsTextAreaTestIds } from "App/messages/components/thread-details-text-area-tests-ids"
import { Feature, flags } from "App/feature-flags"
import { IconBackgroundWithTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-background-with-tooltip.component"
import { defineMessages } from "react-intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { IconButtonWithSecondaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { ElementWithTooltipPlace } from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"

const messages = defineMessages({
  sendButtonTooltipDescription: {
    id: "module.messages.sendButtonTooltipDescription",
  },
  attachContactTooltipDescription: {
    id: "module.messages.attachContactTooltipDescription",
  },
  attachTemplateTooltipDescription: {
    id: "module.messages.attachTemplateTooltipDescription",
  },
})

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onSendClick: () => void
  onAttachContactClick: () => void
  onAttachTemplateClick: () => void
}

const ThreadDetailsTextArea: FunctionComponent<Props> = ({
  value,
  onSendClick,
  onChange,
  onAttachContactClick,
  onAttachTemplateClick,
}) => {
  const isValueEmpty = (): boolean => {
    return value.length === 0
  }

  const leadingIcons = [
    <IconButtonWithSecondaryTooltip
      testId={ThreadDetailsTextAreaTestIds.AttachContactButton}
      Icon={IconType.AttachContact}
      key={IconType.AttachContact}
      description={messages.attachContactTooltipDescription}
      onClick={onAttachContactClick}
      place={ElementWithTooltipPlace.TopLeft}
    />,
    flags.get(Feature.MessagesThreadAttachTemplateEnabled) && (
      <IconButtonWithSecondaryTooltip
        Icon={IconType.Template}
        key={IconType.Template}
        description={messages.attachTemplateTooltipDescription}
        onClick={onAttachTemplateClick}
        place={ElementWithTooltipPlace.TopLeft}
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
