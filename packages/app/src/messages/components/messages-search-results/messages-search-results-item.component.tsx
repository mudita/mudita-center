/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Message } from "App/messages/dto/message.object"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import { MessageType } from "App/messages/constants"
import styled from "styled-components"
import ThreadBaseRow from "App/messages/components/thread-base-row.component"
import {
  InitialsAvatar,
  ThreadCol,
  ThreadDataWrapper,
  LastMessageText,
  WarningIconWrapper,
} from "App/messages/components/thread-row.styled"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import {
  Col,
  Actions,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import ThreadRowName from "App/messages/components/thread-row-name"
import { Time } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import moment from "moment"
import { isToday } from "App/__deprecated__/renderer/utils/is-today"
import { Settings } from "App/settings/dto"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconButtonWithSecondaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { ElementWithTooltipPlace } from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import ScrollAnchorContainer from "App/__deprecated__/renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { defineMessages } from "react-intl"
import { useSelector } from "react-redux"
import { getContactByPhoneNumberIdSelector } from "App/contacts/selectors/get-contact-by-phone-number-id.selector"
import { getPhoneNumberById } from "App/messages/selectors/get-phone-number-by-id.selector"

const messages = defineMessages({
  dropdownTogglerTooltipDescription: {
    id: "component.dropdownTogglerTooltipDescription",
  },
})

const SearchResultContainer = styled(ThreadBaseRow)`
  :hover {
    ${InitialsAvatar} {
      background-color: ${backgroundColor("row")};
    }
  }
`

interface Props extends Pick<Settings, "language"> {
  message: Message
  onRowClick: (message: Message) => void
  removeMessage: (messageId: string) => void
  resendMessage: (messageId: string) => void
  enableScroll: () => void
  disableScroll: () => void
}

const MessagesSearchResultsItem: FunctionComponent<Props> = ({
  message,
  onRowClick,
  removeMessage,
  resendMessage,
  language,
  enableScroll,
  disableScroll,
}) => {
  const contact = useSelector(
    getContactByPhoneNumberIdSelector(message.phoneNumberId)
  )
  const phoneNumber = useSelector(getPhoneNumberById(message.phoneNumberId))
  const { id, date, content } = message
  const isMessageFailed = message.messageType === MessageType.FAILED
  const handleRowClick = () => onRowClick(message)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const remove = () => removeMessage(id)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const resend = () => resendMessage(id)

  return (
    <SearchResultContainer key={id} selected={false} active={false}>
      <Col>
        <InitialsAvatar user={contact} light={false} size={AvatarSize.Big} />
      </Col>
      <ThreadCol onClick={handleRowClick}>
        <ThreadDataWrapper
          sidebarOpened={false}
          isMessageFailed={isMessageFailed}
        >
          <ThreadRowName contact={contact} phoneNumber={phoneNumber} />
          <Time displayStyle={TextDisplayStyle.Label} color="secondary">
            {isToday(date)
              ? moment(date).format("h:mm A")
              : moment(date)
                  .locale(language ?? "en")
                  .format("ll")}
          </Time>

          <LastMessageText
            unread={false}
            color="secondary"
            displayStyle={TextDisplayStyle.Paragraph4}
          >
            {content}
          </LastMessageText>
        </ThreadDataWrapper>
        {isMessageFailed && (
          <WarningIconWrapper>
            <Icon type={IconType.Warning} width={1.6} />
          </WarningIconWrapper>
        )}
      </ThreadCol>
      <Col>
        <Actions>
          <Dropdown
            onOpen={disableScroll}
            onClose={enableScroll}
            toggler={
              <IconButtonWithSecondaryTooltip
                iconType={IconType.More}
                description={messages.dropdownTogglerTooltipDescription}
                // FIXME: The position based on offset is a sticky. However, this is a quick workaround
                //  for buggy overridePosition lib feature
                place={ElementWithTooltipPlace.Bottom}
                offset={{ left: 15, bottom: 5 }}
              />
            }
          >
            {isMessageFailed && (
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.messageDropdownResend",
                }}
                Icon={IconType.Send}
                onClick={resend}
                displayStyle={DisplayStyle.Dropdown}
              />
            )}
            <ButtonComponent
              labelMessage={{
                id: "module.messages.messageDropdownDelete",
              }}
              Icon={IconType.Delete}
              onClick={remove}
              displayStyle={DisplayStyle.Dropdown}
            />
          </Dropdown>
        </Actions>
      </Col>
      <ScrollAnchorContainer key={id} active={false} />
    </SearchResultContainer>
  )
}

export default MessagesSearchResultsItem
