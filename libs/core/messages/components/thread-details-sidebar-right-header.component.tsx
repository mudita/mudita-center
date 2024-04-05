/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { SidebarHeaderButton } from "Core/__deprecated__/renderer/components/core/table/table.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { ThreadDetailsTestIds } from "Core/messages/components/thread-details-test-ids.enum"

const messages = defineMessages({
  contactTooltipDescription: {
    id: "module.messages.contactTooltipDescription",
  },
  newContactTooltipDescription: {
    id: "module.messages.newContactTooltipDescription",
  },
  marksAsUnreadTooltipDescription: {
    id: "module.messages.marksAsUnreadTooltipDescription",
  },
  deleteTooltipDescription: { id: "module.messages.deleteTooltipDescription" },
})

interface Props {
  contactCreated: boolean
  onContactClick: () => void
  onDeleteClick: () => void
  onMarkAsUnreadClick: () => void
  emptyThread: boolean
  validPhoneNumber: boolean
}

const ThreadDetailsSidebarRightHeader: FunctionComponent<Props> = ({
  contactCreated,
  onContactClick,
  onDeleteClick,
  onMarkAsUnreadClick,
  emptyThread,
  validPhoneNumber,
}) => {
  return (
    <>
      {contactCreated ? (
        <SidebarHeaderButton
          description={messages.contactTooltipDescription}
          iconType={IconType.Contact}
          onClick={onContactClick}
          disabled={emptyThread}
        />
      ) : (
        <SidebarHeaderButton
          description={messages.newContactTooltipDescription}
          iconType={IconType.NewContact}
          onClick={onContactClick}
          disabled={emptyThread || !validPhoneNumber}
          data-testid={ThreadDetailsTestIds.ContactButton}
        />
      )}
      <SidebarHeaderButton
        description={messages.marksAsUnreadTooltipDescription}
        iconType={IconType.MarkAsUnread}
        onClick={onMarkAsUnreadClick}
        disabled={emptyThread}
        data-testid={ThreadDetailsTestIds.MarkAsUnreadButton}
      />
      <SidebarHeaderButton
        description={messages.deleteTooltipDescription}
        iconType={IconType.Delete}
        onClick={onDeleteClick}
        disabled={emptyThread}
        data-testid={ThreadDetailsTestIds.DeleteButton}
      />
    </>
  )
}

export default ThreadDetailsSidebarRightHeader
