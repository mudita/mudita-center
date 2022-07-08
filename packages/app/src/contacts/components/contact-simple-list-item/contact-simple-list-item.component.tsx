/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSimpleListItemTestIdsEnum } from "App/contacts/components/contact-simple-list-item/contact-simple-list-item-test-ids.enum"
import { ContactSimpleListItemProps } from "App/contacts/components/contact-simple-list-item/contact-simple-list-item.interface"
import {
  BlockedIcon,
  ClickableCol,
  InitialsAvatar,
  HoverablePhoneNumber,
  ItemCol,
} from "App/contacts/components/contact-simple-list-item/contact-simple-list-item.styled"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import assert from "assert"

const messages = defineMessages({
  unnamedContact: { id: "module.contacts.listUnnamedContact" },
})

const validateProps = ({
  onContactSelect,
  onPhoneNumberSelect,
}: ContactSimpleListItemProps) => {
  if (!onContactSelect && !onPhoneNumberSelect) {
    throw new Error(
      "You should define one of the properties: onContactSelect or onPhoneNumberSelect"
    )
  }
  if (onContactSelect && onPhoneNumberSelect) {
    throw new Error(
      "You should define only one of the properties: onContactSelect or onPhoneNumberSelect"
    )
  }
}

export const ContactSimpleListItem: FunctionComponent<
  ContactSimpleListItemProps
> = (props) => {
  validateProps(props)

  const { contact, onContactSelect, onPhoneNumberSelect } = props

  const isPhoneNumberSelectionModeEnabled = onPhoneNumberSelect !== undefined
  const fullName = createFullName(contact)

  const handleSelectContact = () => {
    assert(onContactSelect)
    onContactSelect(contact)
  }

  const handlePhoneNumberSelection = (phoneNumber: string) => {
    assert(onPhoneNumberSelect)
    onPhoneNumberSelect(phoneNumber)
  }

  const FirstCol = onPhoneNumberSelect ? ItemCol : ClickableCol

  return (
    <>
      <FirstCol
        data-testid={ContactSimpleListItemTestIdsEnum.NameWrapperColumn}
        onClick={
          isPhoneNumberSelectionModeEnabled ? undefined : handleSelectContact
        }
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
      </FirstCol>

      {!isPhoneNumberSelectionModeEnabled && (
        <ClickableCol
          onClick={handleSelectContact}
          data-testid={ContactSimpleListItemTestIdsEnum.ContactSelectableColumn}
        >
          {[contact.primaryPhoneNumber, contact.secondaryPhoneNumber].join(
            "  "
          )}
        </ClickableCol>
      )}

      {isPhoneNumberSelectionModeEnabled && (
        <ClickableCol>
          {contact.primaryPhoneNumber && (
            <HoverablePhoneNumber
              onClick={() =>
                handlePhoneNumberSelection(contact.primaryPhoneNumber!)
              }
              data-testid={
                ContactSimpleListItemTestIdsEnum.PrimaryPhoneNumberSelectableColumn
              }
            >
              {contact.primaryPhoneNumber}
            </HoverablePhoneNumber>
          )}
          {contact.secondaryPhoneNumber && (
            <HoverablePhoneNumber
              onClick={() =>
                handlePhoneNumberSelection(contact.secondaryPhoneNumber!)
              }
              data-testid={
                ContactSimpleListItemTestIdsEnum.SecondaryPhoneNumberSelectableColumn
              }
            >
              {contact.secondaryPhoneNumber}
            </HoverablePhoneNumber>
          )}
        </ClickableCol>
      )}
    </>
  )
}
