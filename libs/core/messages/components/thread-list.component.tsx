/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Table from "Core/__deprecated__/renderer/components/core/table/table.component"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { Settings } from "Core/settings/dto"
import { Thread } from "Core/messages/dto"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { AutoSizer, IndexRange, List, ListRowProps } from "react-virtualized"
import ThreadRow from "Core/messages/components/thread-row.component"
import ThreadPlaceholderRow from "Core/messages/components/thread-placeholder-row.component"

export const Threads = styled(Table)`
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
  const threadsRef = React.useRef<HTMLDivElement>(null)
  const scrollOffset = React.useRef<number>(0)

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

      const threadsRect = threadsRef.current?.getBoundingClientRect()
      const threadsOffset = threadsRect
        ? {
            left: threadsRect.left,
            top: threadsRect.top - scrollOffset.current,
          }
        : undefined

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
          threadsOffset={threadsOffset}
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
      ref={threadsRef}
    >
      <AutoSizer>
        {({ width, height }) => {
          return (
            <List
              height={height}
              width={width}
              rowRenderer={renderRow}
              rowHeight={80}
              rowCount={threads.length}
              containerStyle={listContainerStyle}
              style={ListStyle}
              onScroll={({ scrollTop }) => {
                scrollOffset.current = scrollTop
              }}
            />
          )
        }}
      </AutoSizer>
    </Threads>
  )
}

export default ThreadList
