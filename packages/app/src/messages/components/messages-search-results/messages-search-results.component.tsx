/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, Ref } from "react"
import { InView } from "react-intersection-observer"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  LoadingState,
  Row,
  TextPlaceholder,
  Actions,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { basicAvatarStyles } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  borderColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import useTableScrolling from "App/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { MessagesSearchResultsTestIdsEnum } from "App/messages/components/messages-search-results/messages-search-results-test-ids.enum"
import { ResultState } from "App/contacts/reducers/contacts.interface"
import { Thread } from "App/messages/dto"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import {
  ThreadRowContainer,
  InitialsAvatar,
  ThreadCol,
  ThreadDataWrapper,
  LastMessageText,
  WarningIconWrapper,
} from "App/messages/components/thread-row.styled"
import { Settings } from "App/settings/dto"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import moment from "moment"
import { isToday } from "App/__deprecated__/renderer/utils/is-today"
import { Time } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import ThreadRowName from "App/messages/components/thread-row-name"
import { Feature, flags } from "App/feature-flags"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconButtonWithSecondaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { ElementWithTooltipPlace } from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import ScrollAnchorContainer from "App/__deprecated__/renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { MessageType } from "App/messages/constants"
import { intl } from "App/__deprecated__/renderer/utils/intl"

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.2rem;
`

const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  min-width: 32rem;
  flex: 1;
  overflow: auto;
  --columnsTemplate: auto 11.5rem 11.5rem 7.1rem;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};
  ${Row} {
    :hover {
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
    }
  }
`

export const SearchTitle = styled(Text)`
  padding: 0 3.2rem 1.7rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
`
const messages = defineMessages({
  searchResultsTitle: {
    id: "module.messages.searchResultsTitle",
  },
  dropdownTogglerTooltipDescription: {
    id: "component.dropdownTogglerTooltipDescription",
  },
})

interface MessagesSearchResultProps extends Pick<Settings, "language"> {
  resultsState: ResultState
  results: Thread[]
  searchValue: string
  onDeleteClick: (id: string) => void
  onRowClick: (thread: Thread) => void
  onToggleReadClick: (threads: Thread[]) => void
  onContactClick: (phoneNumber: Thread["phoneNumber"]) => void
  getContactByPhoneNumber: (phoneNumber: string) => Contact | undefined
}

const MessagesSearchResults: FunctionComponent<MessagesSearchResultProps> = ({
  results,
  resultsState,
  searchValue,
  language,
  onRowClick,
  onDeleteClick,
  onToggleReadClick,
  onContactClick,
  getContactByPhoneNumber,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()

  const emptyList = () => (
    <EmptyState
      title={{ id: "module.messages.emptyResultsListTitle" }}
      description={{
        id: "module.messages.emptyResultsListDescription",
      }}
      data-testid={MessagesSearchResultsTestIdsEnum.Empty}
    />
  )
  console.log("resultsState", resultsState)
  return (
    <>
      <SearchTitle displayStyle={TextDisplayStyle.Headline4}>
        {intl.formatMessage(messages.searchResultsTitle, {
          value: searchValue,
        })}
      </SearchTitle>

      <SelectableContacts
        hideableColumnsIndexes={[2, 3, 4]}
        scrollable={scrollable}
        data-testid={MessagesSearchResultsTestIdsEnum.Table}
        ref={tableRef}
      >
        {resultsState === ResultState.Loaded &&
          (results.length
            ? results.map((thread) => {
                const phoneNumber = thread.phoneNumber
                const contact = getContactByPhoneNumber(thread.phoneNumber)
                const contactCreated = contact !== undefined
                const isMessageFailed =
                  thread.messageType === MessageType.FAILED
                const handleRowClick = () => onRowClick(thread)
                const handleDeleteClick = () => onDeleteClick(thread.id)
                const handleToggleClick = () => {
                  onToggleReadClick([thread])
                }
                const handleContactClick = () => onContactClick(phoneNumber)

                console.log("thread", thread)

                const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                  <ThreadRowContainer
                    selected={false}
                    active={false}
                    notNewConversation
                    ref={ref}
                  >
                    <Col>
                      <InitialsAvatar
                        user={contact}
                        light={false}
                        size={AvatarSize.Big}
                      />
                    </Col>
                    <ThreadCol onClick={handleRowClick}>
                      <ThreadDataWrapper
                        sidebarOpened={false}
                        isMessageFailed={isMessageFailed}
                      >
                        <ThreadRowName
                          contact={contact}
                          phoneNumber={phoneNumber}
                        />
                        <Time
                          displayStyle={TextDisplayStyle.Label}
                          color="secondary"
                        >
                          {isToday(thread.lastUpdatedAt)
                            ? moment(thread.lastUpdatedAt).format("h:mm A")
                            : moment(thread.lastUpdatedAt)
                                .locale(language ?? "en")
                                .format("ll")}
                        </Time>
                        {flags.get(Feature.ReadAndUnreadMessages) ? (
                          <LastMessageText
                            unread={thread.unread}
                            color="secondary"
                            displayStyle={
                              thread.unread
                                ? TextDisplayStyle.Paragraph3
                                : TextDisplayStyle.Paragraph4
                            }
                          >
                            {thread?.messageSnippet}
                          </LastMessageText>
                        ) : (
                          <LastMessageText
                            unread={false}
                            color="secondary"
                            displayStyle={TextDisplayStyle.Paragraph4}
                          >
                            {thread?.messageSnippet}
                          </LastMessageText>
                        )}
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
                              description={
                                messages.dropdownTogglerTooltipDescription
                              }
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
                            hide={
                              !flags.get(Feature.MessagesCallFromThreadEnabled)
                            }
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
                          {flags.get(Feature.MessagesThreadDeleteEnabled) && (
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
                          {flags.get(Feature.ReadAndUnreadMessages) && (
                            <ButtonComponent
                              labelMessage={{
                                id: thread.unread
                                  ? "module.messages.markAsRead"
                                  : "module.messages.markAsUnread",
                              }}
                              Icon={
                                thread.unread
                                  ? IconType.MarkAsRead
                                  : IconType.MarkAsUnread
                              }
                              onClick={handleToggleClick}
                              displayStyle={DisplayStyle.Dropdown}
                              data-testid="dropdown-mark-as-read"
                            />
                          )}
                        </Dropdown>
                      </Actions>
                    </Col>
                    <ScrollAnchorContainer key={thread.id} active={false} />
                  </ThreadRowContainer>
                )

                const placeholderRow = (ref: Ref<HTMLDivElement>) => {
                  return (
                    <Row ref={ref}>
                      <Col />
                      <Col>
                        <AvatarPlaceholder />
                        {phoneNumber && (
                          <TextPlaceholder charsCount={phoneNumber.length} />
                        )}
                      </Col>
                      <Col>
                        {phoneNumber && (
                          <TextPlaceholder charsCount={phoneNumber.length} />
                        )}
                      </Col>
                    </Row>
                  )
                }
                return (
                  <InView key={thread.id}>
                    {({ inView, ref }) => {
                      console.log("inView", inView)
                      return inView ? interactiveRow(ref) : placeholderRow(ref)
                    }}
                  </InView>
                )
              })
            : emptyList())}
        {resultsState === ResultState.Empty && emptyList()}
        {resultsState === ResultState.Loading && (
          <LoadingState
            data-testid={MessagesSearchResultsTestIdsEnum.Loading}
          />
        )}
      </SelectableContacts>
    </>
  )
}

export default MessagesSearchResults
