import React, { Ref, useEffect, useState } from "react"
import Button from "Renderer/components/core/button/button.component"
import {
  Col,
  TableWithSidebarWrapper,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
  Topic,
} from "Renderer/models/messages/messages.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import MessagesPanel from "Renderer/modules/messages/messages-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { isEqual, last } from "lodash"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Name,
  Time,
} from "Renderer/components/rest/messages/topics-table.component"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import moment from "moment"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { AvatarPlaceholder } from "Renderer/components/rest/phone/contact-list.component"
import { InView } from "react-intersection-observer"
import {
  AvatarCol,
  Checkbox,
  InitialsAvatar,
  LastMessageText,
  MessageCol,
  MessageDataWrapper,
  MessageRow,
  Messages as MessageTable,
  Actions,
  ActionsButton,
} from "Renderer/modules/messages/messages.styles"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  changeSearchValue = noop,
  changeVisibilityFilter = noop,
  list,
}) => {
  const [messagesList, setMessagesList] = useState(list)
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Topic>()
  const {
    selectedRows,
    allRowsSelected,
    toggleAll,
    toggleRow,
    noneRowsSelected,
    getRowStatus,
  } = useTableSelect<Topic>(list)
  const { enableScroll, disableScroll } = useTableScrolling()

  const showAllMessages = () => {
    changeVisibilityFilter(VisibilityFilter.All)
  }

  const hideReadMessages = () => {
    changeVisibilityFilter(VisibilityFilter.Unread)
  }
  const _devClearMessages = () => setMessagesList([])
  const _devLoadDefaultMessages = () => setMessagesList(list)
  useEffect(() => setMessagesList(list), [list])
  return (
    <>
      <DevModeWrapper>
        <p>Messages on list: {messagesList.length}</p>
        <Button onClick={_devClearMessages} label="Remove all messages" />
        <br />
        <Button
          onClick={_devLoadDefaultMessages}
          label="Load default messages"
        />
      </DevModeWrapper>
      <MessagesPanel
        searchValue={searchValue}
        hideReadMessages={hideReadMessages}
        showAllMessages={showAllMessages}
        changeSearchValue={changeSearchValue}
        selectedItemsCount={selectedRows.length}
        toggleAll={toggleAll}
        allItemsSelected={allRowsSelected}
      />
      <TableWithSidebarWrapper>
        <MessageTable
          noneRowsSelected={noneRowsSelected}
          hideableColumnsIndexes={[2, 3, 4]}
          hideColumns={Boolean(activeRow)}
        >
          {list.map(item => {
            const { selected, indeterminate } = getRowStatus(item)
            const lastMessage = last(item.messages)
            const toggle = () => toggleRow(item)
            const open = () => openSidebar(item)
            const nameAvailable = isNameAvailable(item.caller)
            const interactiveRow = (ref: Ref<HTMLDivElement>) => (
              <MessageRow
                key={item.id}
                ref={ref}
                selected={selected}
                active={isEqual(activeRow, item)}
              >
                <AvatarCol>
                  <Checkbox
                    checked={selected}
                    onChange={toggle}
                    size={Size.Large}
                    indeterminate={indeterminate}
                    data-testid="checkbox"
                  />
                  <InitialsAvatar user={item.caller} light={selected} />
                </AvatarCol>
                <MessageCol onClick={open} data-testid="message-row">
                  <MessageDataWrapper sidebarOpened={Boolean(activeRow)}>
                    <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                      {nameAvailable
                        ? `${item.caller.firstName} ${item.caller.lastName}`
                        : item.caller.primaryPhoneNumber}
                    </Name>
                    <Time displayStyle={TextDisplayStyle.SmallFadedText}>
                      {moment(lastMessage?.date).format("h:mm A")}
                    </Time>
                    <LastMessageText
                      unread={item.unread}
                      displayStyle={
                        item.unread
                          ? TextDisplayStyle.MediumText
                          : TextDisplayStyle.MediumFadedLightText
                      }
                    >
                      {lastMessage?.content}
                    </LastMessageText>
                  </MessageDataWrapper>
                </MessageCol>
                <Col>
                  <Actions>
                    <Dropdown
                      toggler={
                        <ActionsButton>
                          <Icon type={Type.More} />
                        </ActionsButton>
                      }
                      onOpen={disableScroll}
                      onClose={enableScroll}
                    >
                      <ButtonComponent
                        labelMessage={{
                          id: "view.name.messages.dropdownCall",
                          values: item.caller.firstName
                            ? { name: item.caller.firstName }
                            : {
                                name: item.caller.primaryPhoneNumber,
                              },
                        }}
                        Icon={Type.Calls}
                        onClick={noop}
                        displayStyle={DisplayStyle.Dropdown}
                        data-testid="dropdown-call"
                      />
                      {nameAvailable ? (
                        <ButtonComponent
                          labelMessage={{
                            id: "view.name.messages.dropdownContactDetails",
                          }}
                          Icon={Type.Contacts}
                          onClick={noop}
                          displayStyle={DisplayStyle.Dropdown}
                          data-testid="dropdown-contact-details"
                        />
                      ) : (
                        <ButtonComponent
                          labelMessage={{
                            id: "view.name.messages.dropdownAddToContacts",
                          }}
                          Icon={Type.Contacts}
                          onClick={noop}
                          displayStyle={DisplayStyle.Dropdown}
                          data-testid="dropdown-add-to-contacts"
                        />
                      )}
                      <ButtonComponent
                        labelMessage={{
                          id: "view.name.messages.dropdownMarkAsRead",
                        }}
                        Icon={Type.BorderCheckIcon}
                        onClick={noop}
                        displayStyle={DisplayStyle.Dropdown}
                        data-testid="dropdown-mark-as-read"
                      />
                      <ButtonComponent
                        labelMessage={{
                          id: "view.name.messages.dropdownDelete",
                        }}
                        Icon={Type.Delete}
                        onClick={noop}
                        displayStyle={DisplayStyle.Dropdown}
                        data-testid="dropdown-delete"
                      />
                    </Dropdown>
                  </Actions>
                </Col>
              </MessageRow>
            )

            const placeholderRow = (ref: Ref<HTMLDivElement>) => (
              <MessageRow key={item.id} ref={ref}>
                <Col />
                <Col>
                  <AvatarPlaceholder />
                  <TextPlaceholder charsCount={item.caller.firstName.length} />
                </Col>
              </MessageRow>
            )

            return (
              <InView key={item.id}>
                {({ inView, ref }) =>
                  inView ? interactiveRow(ref) : placeholderRow(ref)
                }
              </InView>
            )
          })}
        </MessageTable>
        {activeRow && (
          <MessageDetails details={activeRow} onClose={closeSidebar} />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
