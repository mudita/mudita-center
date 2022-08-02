/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Table from "App/__deprecated__/renderer/components/core/table/table.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { Settings } from "App/settings/dto"
import { Thread } from "App/messages/dto"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { AutoSizer, IndexRange, List, ListRowProps } from "react-virtualized"
import ThreadRow from "App/messages/components/thread-row.component"
import ThreadPlaceholderRow from "App/messages/components/thread-placeholder-row.component"

const Threads = styled(Table)`
  min-width: 32rem;
  --columnsTemplate: 10.4rem 1fr 6rem;
  --columnsTemplateWithOpenedSidebar: 10.4rem 1fr;
  --columnsGap: 0;
`

const ListStyle: React.CSSProperties = {
  outline: "none",
}

const listContainerStyle: React.CSSProperties = { minHeight: "100%" }

interface Props extends Pick<Settings, "language"> {
  threads: Thread[]
  onThreadClick?: (thread: Thread) => void
  activeThread?: Thread
  onDeleteClick: (id: string) => void
  onToggleReadStatus: (threads: Thread[]) => void
  getContactByPhoneNumber: (phoneNumber: string) => Contact | undefined
  onContactClick: (phoneNumber: string) => void
  loadMoreRows: (props: IndexRange) => Promise<void>
  newConversation: string
  selectedItems: { rows: string[] }
  toggleItem: (id: string) => void
}

const ThreadList: FunctionComponent<Props> = ({
  activeThread,
  threads,
  onThreadClick = noop,
  onDeleteClick,
  onToggleReadStatus,
  language,
  getContactByPhoneNumber,
  onContactClick,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadMoreRows,
  newConversation,
  selectedItems,
  toggleItem,
  ...props
}) => {
  const sidebarOpened = Boolean(activeThread)
  const noneRowsSelected = selectedItems.rows.length <= 0
  const renderRow = ({ index, style }: ListRowProps) => {
    const thread = threads[index]
    if (thread === undefined) {
      return <ThreadPlaceholderRow key={index} style={style} />
    } else {
      const { id, phoneNumber } = thread
      const active = activeThread?.id === id
      const contact = getContactByPhoneNumber(phoneNumber)
      const indeterminate = false
      const selectedRow = selectedItems.rows.includes(thread.id)

      return (
        <ThreadRow
          key={phoneNumber}
          active={active}
          selected={selectedRow}
          indeterminate={indeterminate}
          sidebarOpened={sidebarOpened}
          noneRowsSelected={noneRowsSelected}
          contact={contact}
          language={language}
          onCheckboxChange={() => toggleItem(thread.id)}
          onRowClick={onThreadClick}
          onDeleteClick={onDeleteClick}
          onToggleReadClick={onToggleReadStatus}
          onContactClick={onContactClick}
          thread={thread}
          style={style}
          newConversation={newConversation}
        />
      )
    }
  }

  return (
    <Threads
      scrollable={false}
      hideableColumnsIndexes={[2, 3, 4]}
      hideColumns={sidebarOpened}
      {...props}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            height={height}
            width={width}
            rowRenderer={renderRow}
            rowHeight={80}
            rowCount={threads.length}
            containerStyle={listContainerStyle}
            style={ListStyle}
          />
        )}
      </AutoSizer>
    </Threads>
  )
}

export default ThreadList
