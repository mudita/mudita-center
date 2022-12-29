/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { SidebarHeaderButton } from "App/__deprecated__/renderer/components/core/table/table.component"
import { Feature, flags } from "App/feature-flags"
import { defineMessages } from "react-intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { ThreadDetailsTestIds } from "App/messages/components/thread-details-test-ids.enum"

const messages = defineMessages({
  callsTooltipDescription: { id: "module.messages.callsTooltipDescription" },
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
}

const ThreadDetailsSidebarRightHeader: FunctionComponent<Props> = ({
  contactCreated,
  onContactClick,
  onDeleteClick,
  onMarkAsUnreadClick,
  emptyThread,
}) => {
  return (
    <>
      {flags.get(Feature.MessagesThreadCallsEnabled) && (
        <SidebarHeaderButton
          description={messages.callsTooltipDescription}
          iconType={IconType.Calls}
          onClick={noop}
          disabled={emptyThread}
          data-testid={ThreadDetailsTestIds.CallButton}
        />
      )}
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
          disabled={emptyThread}
          data-testid={ThreadDetailsTestIds.ContactButton}
        />
      )}
      {flags.get(Feature.MessagesThreadDetailsMarkAsReadEnabled) && (
        <SidebarHeaderButton
          description={messages.marksAsUnreadTooltipDescription}
          iconType={IconType.MarkAsUnread}
          onClick={onMarkAsUnreadClick}
          disabled={emptyThread}
          data-testid={ThreadDetailsTestIds.MarkAsUnreadButton}
        />
      )}
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
