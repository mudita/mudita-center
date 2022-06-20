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

const messages = defineMessages({
  callsTooltipDescription: { id: "module.messages.callsTooltipDescription" },
  contactTooltipDescription: {
    id: "module.messages.contactTooltipDescription",
  },
  newContactTooltipDescription: {
    id: "module.messages.newContactTooltipDescription",
  },
  marksAsReadTooltipDescription: {
    id: "module.messages.marksAsReadTooltipDescription",
  },
  deleteTooltipDescription: { id: "module.messages.deleteTooltipDescription" },
})

interface Props {
  contactCreated: boolean
  onContactClick: () => void
  onDeleteClick: () => void
  onCheckClick: () => void
}

const ThreadDetailsSidebarRightHeader: FunctionComponent<Props> = ({
  contactCreated,
  onContactClick,
  onDeleteClick,
  onCheckClick,
}) => {
  return (
    <>
      {flags.get(Feature.MessagesThreadCallsEnabled) && (
        <SidebarHeaderButton
          description={messages.callsTooltipDescription}
          iconType={IconType.Calls}
          onClick={noop}
        />
      )}
      {contactCreated ? (
        <SidebarHeaderButton
          description={messages.contactTooltipDescription}
          iconType={IconType.Contact}
          onClick={onContactClick}
        />
      ) : (
        <SidebarHeaderButton
          description={messages.newContactTooltipDescription}
          iconType={IconType.NewContact}
          onClick={onContactClick}
        />
      )}
      {flags.get(Feature.MessagesThreadDetailsMarkAsReadEnabled) && (
        <SidebarHeaderButton
          description={messages.marksAsReadTooltipDescription}
          iconType={IconType.BorderCheckIcon}
          onClick={onCheckClick}
        />
      )}
      {flags.get(Feature.MessagesThreadDeleteEnabled) && (
        <SidebarHeaderButton
          description={messages.deleteTooltipDescription}
          iconType={IconType.Delete}
          onClick={onDeleteClick}
        />
      )}
    </>
  )
}

export default ThreadDetailsSidebarRightHeader
