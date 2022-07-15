/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSimpleListItemAvatarProps } from "App/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar.interface"
import {
  BlockedIcon,
  InitialsAvatar,
} from "App/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar.styled"
import { ContactSimpleListItemAvatarTestIds } from "App/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar-test-ids.enum"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  unnamedContact: { id: "module.contacts.listUnnamedContact" },
})

export const ContactSimpleListItemAvatar: FunctionComponent<
  ContactSimpleListItemAvatarProps
> = ({ contact }) => {
  const fullName = createFullName(contact)

  return (
    <>
      <InitialsAvatar user={contact} size={AvatarSize.Small} />
      {fullName || intl.formatMessage(messages.unnamedContact)}
      {contact.blocked && (
        <BlockedIcon
          width={2}
          height={2}
          data-testid={ContactSimpleListItemAvatarTestIds.Blocked}
        />
      )}
    </>
  )
}
