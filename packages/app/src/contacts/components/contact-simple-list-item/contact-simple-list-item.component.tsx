/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { ContactSimpleListItemProps } from "App/contacts/components/contact-simple-list-item/contact-simple-list-item.interface"
import {
  InitialsAvatar,
  BlockedIcon,
  ClickableCol,
} from "App/contacts/components/contact-simple-list-item/contact-simple-list-item.styled"
import { ContactSimpleListItemTestIdsEnum } from "App/contacts/components/contact-simple-list-item/contact-simple-list-item-test-ids.enum"

const messages = defineMessages({
  unnamedContact: { id: "module.contacts.listUnnamedContact" },
})

export const ContactSimpleListItem: FunctionComponent<
  ContactSimpleListItemProps
> = ({ contact, onSelect }) => {
  const fullName = createFullName(contact)
  const handleSelectContact = () => {
    onSelect(contact)
  }

  return (
    <>
      <ClickableCol
        data-testid={ContactSimpleListItemTestIdsEnum.NameWrapper}
        onClick={handleSelectContact}
      >
        <InitialsAvatar user={contact} size={AvatarSize.Small} />
        {fullName || intl.formatMessage(messages.unnamedContact)}
        {contact.blocked && (
          <BlockedIcon
            width={2}
            height={2}
            data-testid={ContactSimpleListItemTestIdsEnum.Blocked}
          />
        )}
      </ClickableCol>
      <ClickableCol
        onClick={handleSelectContact}
        data-testid={ContactSimpleListItemTestIdsEnum.PhoneNumber}
      >
        {[contact.primaryPhoneNumber, contact.secondaryPhoneNumber].join("  ")}
      </ClickableCol>
    </>
  )
}
