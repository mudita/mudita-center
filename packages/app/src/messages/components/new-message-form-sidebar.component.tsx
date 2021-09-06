/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { MessagesSidebar } from "App/messages/components/thread-details.styled"
import { Sidebar } from "Renderer/components/core/table/table.component"
import NewMessageFormSidebarLeftHeader from "App/messages/components/new-message-form-sidebar-left-header.component"

type SidebarProps = ComponentProps<typeof Sidebar>
type NewMessageFormSidebarLeftHeaderProps = Omit<
  ComponentProps<typeof NewMessageFormSidebarLeftHeader>,
  "children"
>

interface Props extends SidebarProps, NewMessageFormSidebarLeftHeaderProps {}

const NewMessageFormSidebar: FunctionComponent<Props> = ({
  results,
  searchValue,
  onSearchValueChange,
  onSearchEnterClick,
  children,
  ...props
}) => {
  return (
    <MessagesSidebar
      show
      withBottomBorder
      padded={false}
      headerLeft={
        <NewMessageFormSidebarLeftHeader
          results={results}
          searchValue={searchValue}
          onSearchValueChange={onSearchValueChange}
          onSearchEnterClick={onSearchEnterClick}
          showSearchResults={results.length === 0}
        />
      }
      {...props}
    >
      {children}
    </MessagesSidebar>
  )
}

export default NewMessageFormSidebar
