/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import { ThreadListTestIds } from "App/messages/components/thread-list-test-ids.enum"
import {
  DataWrapper,
  Message,
  Name,
  NameWrapper,
  Time,
} from "Renderer/components/rest/messages/threads-table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { isToday } from "Renderer/utils/is-today"
import moment from "moment"
import { Actions, Col } from "Renderer/components/core/table/table.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { noop } from "Renderer/utils/noop"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Feature, flags } from "App/feature-flags"
import ButtonComponent from "Renderer/components/core/button/button.component"
import ScrollAnchorContainer from "Renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { Thread } from "App/messages/reducers"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { RowStatus, UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import styled, { css } from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "Renderer/components/rest/animated-opacity/animated-opacity"
import { lightAvatarStyles } from "App/contacts/components/contact-list/contact-list.component"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { AppSettings } from "App/main/store/settings.interface"
import ThreadBaseRow from "App/messages/components/thread-base-row.component"
import { ListRowProps } from "react-virtualized"
import { IconButtonWithSecondaryTooltip } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { defineMessages } from "react-intl"
import { ElementWithTooltipPlace } from "Renderer/components/core/tooltip/element-with-tooltip.component"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  dropdownTogllerTooltipDescription: {
    id: "component.dropdownTogllerTooltipDescription",
  },
})

const checkboxShowedStyles = css`
  margin-left: 4.4rem;
  margin-right: 2.8rem;
  display: block;
`

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`

const dotStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0.8rem;
    margin-left: -1.4rem;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    background-color: ${backgroundColor("activity")};
  }
`

const ThreadCol = styled(Col)`
  height: 100%;
`

export const InitialsAvatar = styled(Avatar)`
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

const LastMessageText = styled(Message)<{ unread?: boolean }>`
  padding-left: ${({ unread }) => (unread ? "1.4rem" : "0")};
  position: relative;
  ${({ unread }) => unread && dotStyles};
`

const activeRowStyles = css`
  ${InitialsAvatar} {
    ${lightAvatarStyles};
  }
`

const ThreadRowContainer = styled(ThreadBaseRow)`
  ${({ active }) => active && activeRowStyles};
  :hover {
    background-color: ${backgroundColor("minor")};
    ${Checkbox} {
      ${animatedOpacityActiveStyles};
      ${checkboxShowedStyles};
    }

    ${InitialsAvatar} {
      ${!flags.get(Feature.ProductionAndAlpha)
        ? css`
            display: none;
            ${animatedOpacityStyles}
          `
        : lightAvatarStyles}
    }
  }
`

const ThreadDataWrapper = styled(DataWrapper)<{ sidebarOpened: boolean }>`
  margin-right: ${({ sidebarOpened }) => (sidebarOpened ? "4rem" : "0")};
`

const NewThreadWrapper = styled.div``

type SelectHook = Pick<UseTableSelect<Thread>, "noneRowsSelected">

interface Props
  extends SelectHook,
    RowStatus,
    Pick<AppSettings, "language">,
    Pick<ListRowProps, "style"> {
  sidebarOpened: boolean
  active: boolean
  thread: Thread
  contact: Contact | undefined
  onCheckboxChange: (thread: Thread) => void
  onRowClick: (thread: Thread) => void
  onDeleteClick: (id: Thread["id"]) => void
  onToggleReadClick: (ids: Thread["id"][]) => void
  onContactClick: (phoneNumber: Thread["phoneNumber"]) => void
  newConversation: string
}

const ThreadRow: FunctionComponent<Props> = ({
  sidebarOpened,
  active,
  selected,
  indeterminate,
  noneRowsSelected,
  thread,
  contact,
  language,
  onCheckboxChange,
  onRowClick,
  onDeleteClick,
  onToggleReadClick,
  onContactClick,
  newConversation,
  ...props
}) => {
  const contactCreated = contact !== undefined
  const { unread, id, phoneNumber } = thread

  const handleCheckboxChange = () => onCheckboxChange(thread)
  const handleRowClick = () => onRowClick(thread)
  const handleDeleteClick = () => onDeleteClick(id)
  const handleToggleClick = () => onToggleReadClick([id])
  const handleContactClick = () => onContactClick(phoneNumber)

  return (
    <ThreadRowContainer key={id} selected={selected} active={active} {...props}>
      <Col>
        {!flags.get(Feature.ProductionAndAlpha) && (
          <Checkbox
            checked={selected}
            onChange={handleCheckboxChange}
            size={Size.Large}
            indeterminate={indeterminate}
            visible={!noneRowsSelected}
            data-testid="checkbox"
          />
        )}
        {noneRowsSelected && (
          <InitialsAvatar user={contact} light={active} size={AvatarSize.Big} />
        )}
      </Col>
      <ThreadCol onClick={handleRowClick} data-testid={ThreadListTestIds.Row}>
        {getPrettyCaller(contact, phoneNumber) === newConversation ||
        !thread.messageSnippet ? (
          <NewThreadWrapper>
            <Name displayStyle={TextDisplayStyle.Headline4}>
              {getPrettyCaller(contact, phoneNumber)}
            </Name>
          </NewThreadWrapper>
        ) : (
          <ThreadDataWrapper sidebarOpened={sidebarOpened}>
            <NameWrapper>
              <Name displayStyle={TextDisplayStyle.Headline4}>
                {getPrettyCaller(contact, phoneNumber)}
              </Name>
              {Boolean(phoneNumber && contact?.secondaryPhoneNumber) && (
                <Text displayStyle={TextDisplayStyle.Paragraph2}>
                  &nbsp;
                  {phoneNumber.split(" ").join("") ===
                  contact?.secondaryPhoneNumber?.split(" ").join("")
                    ? "#2"
                    : "#1"}
                </Text>
              )}
            </NameWrapper>
            <Time displayStyle={TextDisplayStyle.Label} color="secondary">
              {isToday(thread.lastUpdatedAt)
                ? moment(thread.lastUpdatedAt).format("h:mm A")
                : moment(thread.lastUpdatedAt)
                    .locale(language ?? "en")
                    .format("ll")}
            </Time>
            <LastMessageText
              unread={unread}
              color="secondary"
              displayStyle={
                unread
                  ? TextDisplayStyle.Paragraph3
                  : TextDisplayStyle.Paragraph4
              }
            >
              {thread?.messageSnippet}
            </LastMessageText>
          </ThreadDataWrapper>
        )}
      </ThreadCol>
      <Col>
        <Actions>
          <Dropdown
            toggler={
              <IconButtonWithSecondaryTooltip
                iconType={IconType.More}
                description={messages.dropdownTogllerTooltipDescription}
                // FIXME: The position based on offset is a sticky. However, this is a quick workaround
                //  for buggy overridePosition lib feature
                place={ElementWithTooltipPlace.Bottom}
                offset={{ left: 15, bottom: 5 }}
              />
            }
          >
            <HiddenButton
              labelMessage={{
                id: "component.dropdownCall",
                values: {
                  name: contact?.firstName || phoneNumber,
                },
              }}
              Icon={IconType.Calls}
              onClick={noop}
              displayStyle={DisplayStyle.Dropdown}
              data-testid="dropdown-call"
              hide={flags.get(Feature.ProductionAndAlpha)}
            />
            {contactCreated ? (
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.dropdownContactDetails",
                }}
                Icon={IconType.Contact}
                onClick={handleContactClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-contact-details"
              />
            ) : (
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.dropdownAddToContacts",
                }}
                Icon={IconType.NewContact}
                onClick={handleContactClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-add-to-contacts"
              />
            )}
            {!flags.get(Feature.DisabledOnProduction) && (
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.dropdownDelete",
                }}
                Icon={IconType.Delete}
                onClick={handleDeleteClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-delete"
              />
            )}
            {/* TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802 */}
            {!flags.get(Feature.ProductionAndAlpha) && (
              <HiddenButton
                labelMessage={{
                  id: unread
                    ? "module.messages.markAsRead"
                    : "module.messages.markAsUnread",
                }}
                Icon={IconType.BorderCheckIcon}
                onClick={handleToggleClick}
                displayStyle={DisplayStyle.Dropdown}
                data-testid="dropdown-mark-as-read"
                hide={flags.get(Feature.ProductionAndAlpha)}
              />
            )}
          </Dropdown>
        </Actions>
      </Col>
      <ScrollAnchorContainer key={id} active={active} />
    </ThreadRowContainer>
  )
}

export default ThreadRow
