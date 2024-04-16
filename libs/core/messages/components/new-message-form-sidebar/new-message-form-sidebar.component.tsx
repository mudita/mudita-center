/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { MessagesSidebar } from "Core/messages/components/thread-details.styled"
import { Sidebar } from "Core/__deprecated__/renderer/components/core/table/table.component"
import NewMessageFormSidebarLeftHeader from "Core/messages/components/new-message-form-sidebar-left-header.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { defineMessages } from "react-intl"
import { NewMessageFormSidebarTestIds } from "Core/messages/components/new-message-form-sidebar/new-message-form-sidebar-test-ids.enum"
import { IconButtonWithSecondaryTooltip } from "Core/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"

type SidebarProps = ComponentProps<typeof Sidebar>
type NewMessageFormSidebarLeftHeaderProps = Omit<
  ComponentProps<typeof NewMessageFormSidebarLeftHeader>,
  "children"
>

interface Props extends SidebarProps, NewMessageFormSidebarLeftHeaderProps {
  onBrowseContactsClick: () => void
}

const messages = defineMessages({
  close: { id: "module.messages.browseContactsButton" },
})

const NewMessageFormSidebar: FunctionComponent<Props> = ({
  results,
  searchValue,
  onSearchValueChange,
  onSearchEnterClick,
  onReceiverSelect,
  onBrowseContactsClick,
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
          onReceiverSelect={onReceiverSelect}
          showSearchResults={results.length === 0}
        />
      }
      headerRight={
        <IconButtonWithSecondaryTooltip
          testId={NewMessageFormSidebarTestIds.BrowseContacts}
          Icon={IconType.MenuContacts}
          description={messages.close}
          onClick={onBrowseContactsClick}
        />
      }
      {...props}
    >
      {children}
    </MessagesSidebar>
  )
}

export default NewMessageFormSidebar
