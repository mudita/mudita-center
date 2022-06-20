/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Table from "App/__deprecated__/renderer/components/core/table/table.component"
import { UseTableSelect } from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { AppSettings } from "App/__deprecated__/main/store/settings.interface"
import { Thread } from "App/messages/reducers/messages.interface"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { AutoSizer, IndexRange, List, ListRowProps } from "react-virtualized"
import ThreadRow from "App/messages/components/thread-row.component"
import ThreadPlaceholderRow from "App/messages/components/thread-placeholder-row.component"

const Threads = styled(Table)<{
  noneRowsSelected?: boolean
}>`
  min-width: 32rem;
  --columnsTemplate: 10.4rem 1fr 6rem;
  --columnsTemplateWithOpenedSidebar: 10.4rem 1fr;
  --columnsGap: 0;
`

const listContainerStyle: React.CSSProperties = { minHeight: "100%" }

type SelectHook = Pick<
  UseTableSelect<Thread>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

interface Props extends SelectHook, Pick<AppSettings, "language"> {
  threads: Thread[]
  onThreadClick?: (thread: Thread) => void
  activeThread?: Thread
  onDeleteClick: (id: string) => void
  onToggleReadStatus: (threads: Thread[]) => void
  getContactByPhoneNumber: (phoneNumber: string) => Contact | undefined
  onContactClick: (phoneNumber: string) => void
  loadMoreRows: (props: IndexRange) => Promise<void>
  newConversation: string
}

const ThreadList: FunctionComponent<Props> = ({
  activeThread,
  threads,
  onThreadClick = noop,
  onDeleteClick,
  onToggleReadStatus,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
  language,
  getContactByPhoneNumber,
  onContactClick,
  loadMoreRows,
  newConversation,
  ...props
}) => {
  const sidebarOpened = Boolean(activeThread)

  const renderRow = ({ index, style }: ListRowProps) => {
    const thread = threads[index]
    if (thread === undefined) {
      return <ThreadPlaceholderRow key={index} style={style} />
    } else {
      const { id, phoneNumber } = thread
      const active = activeThread?.id === id
      const contact = getContactByPhoneNumber(phoneNumber)
      const { selected, indeterminate } = getRowStatus(thread)

      return (
        <ThreadRow
          key={phoneNumber}
          active={active}
          selected={selected}
          indeterminate={indeterminate}
          sidebarOpened={sidebarOpened}
          noneRowsSelected={noneRowsSelected}
          contact={contact}
          language={language}
          onCheckboxChange={toggleRow}
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
      noneRowsSelected={noneRowsSelected}
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
          />
        )}
      </AutoSizer>
    </Threads>
  )
}

export default ThreadList
