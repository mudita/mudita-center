/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, KeyboardEvent } from "react"
import { intl } from "Renderer/utils/intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  IconButton,
  Textarea,
  TextareaWrapper,
} from "App/messages/components/thread-details.styled"

const production = process.env.NODE_ENV === "production"

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSendClick: () => void
  onAttachContactClick: () => void
}

const ThreadDetailsTextArea: FunctionComponent<Props> = ({
  value,
  onSendClick,
  onChange,
  onAttachContactClick,
}) => {
  const leadingIcons = [
    !production && (
      <IconButton
        key={Type.AttachContact}
        Icon={Type.AttachContact}
        onClick={onAttachContactClick}
      />
    ),
    !production && (
      <Icon type={Type.Template} key={Type.Template} size={IconSize.Big} />
    ),
  ]
  const trailingIcon = [
    value.length > 0 && (
      <IconButton key={Type.Send} Icon={Type.Send} onClick={onSendClick} />
    ),
  ]

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSendClick()
    }
  }

  return (
    <TextareaWrapper>
      <Textarea
        type="textarea"
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
