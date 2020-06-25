import React, { useEffect, useState } from "react"
import Button from "Renderer/components/core/button/button.component"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"

import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import MessagesList, {
  ActiveRow,
} from "Renderer/components/rest/messages/messages-list.component"
import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import MessagesPanel from "Renderer/modules/messages/messages-panel.component"

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  changeSearchValue = noop,
  changeVisibilityFilter = noop,
  list,
}) => {
  const [messagesList, setMessagesList] = useState(list)
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<ActiveRow>()

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
      />
      <TableWithSidebarWrapper>
        <MessagesList
          list={messagesList}
          openSidebar={openSidebar}
          activeRow={activeRow}
        />
        {activeRow && (
          <MessageDetails details={activeRow} onClose={closeSidebar} />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
