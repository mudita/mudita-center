/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// import { ContactSimpleListItemAvatar } from "App/contacts/components/contact-simple-list-item-avatar"
import { ContactSimpleListItemAvatar } from "App/contacts/components/contact-simple-list-item-avatar"
import { ContactSimpleListPhoneSelectionItemTestIdsEnum } from "App/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection-test-ids.enum"
import { ContactSimpleItemListPhoneSelectionProps } from "App/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection.interface"
import {
  AvatarCol,
  FirstPhoneNumber,
  PhoneNumberCol,
  SecondPhoneNumber,
} from "App/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection.styled"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React, { useState } from "react"

export const ContactSimpleItemListPhoneSelection: FunctionComponent<
  ContactSimpleItemListPhoneSelectionProps
> = ({ contact, onPhoneNumberSelect }) => {
  const [mainRowHovered, setMainRowHovered] = useState<boolean>(false)

  const onRowHoverIn = () => {
    setMainRowHovered(true)
  }

  const onRowHoverOut = () => {
    setMainRowHovered(false)
  }

  const handlePhoneNumberSelection = (phoneNumber: string) => {
    onPhoneNumberSelect(phoneNumber)
  }

  const onAvatarColClick = () => {
    if (contact.primaryPhoneNumber) {
      onPhoneNumberSelect(contact.primaryPhoneNumber)
    } else if (contact.secondaryPhoneNumber) {
      onPhoneNumberSelect(contact.secondaryPhoneNumber)
    }
  }

  return (
    <>
      <AvatarCol
        data-testid={
          ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn
        }
        onMouseEnter={onRowHoverIn}
        onMouseLeave={onRowHoverOut}
        isHovered={mainRowHovered}
        onClick={onAvatarColClick}
      >
        <ContactSimpleListItemAvatar contact={contact} />
      </AvatarCol>
      <PhoneNumberCol>
        {contact.primaryPhoneNumber && !contact.secondaryPhoneNumber && (
          <FirstPhoneNumber
            onMouseEnter={onRowHoverIn}
            onMouseLeave={onRowHoverOut}
            isHovered={mainRowHovered}
            onClick={() =>
              handlePhoneNumberSelection(contact.primaryPhoneNumber!)
            }
            data-testid={
              ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
            }
          >
            {contact.primaryPhoneNumber}
          </FirstPhoneNumber>
        )}
        {!contact.primaryPhoneNumber && contact.secondaryPhoneNumber && (
          <FirstPhoneNumber
            onMouseEnter={onRowHoverIn}
            onMouseLeave={onRowHoverOut}
            isHovered={mainRowHovered}
            onClick={() =>
              handlePhoneNumberSelection(contact.secondaryPhoneNumber!)
            }
            data-testid={
              ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
            }
          >
            {contact.primaryPhoneNumber}
          </FirstPhoneNumber>
        )}
        {contact.primaryPhoneNumber && contact.secondaryPhoneNumber && (
          <>
            <FirstPhoneNumber
              onMouseEnter={onRowHoverIn}
              onMouseLeave={onRowHoverOut}
              isHovered={mainRowHovered}
              onClick={() =>
                handlePhoneNumberSelection(contact.primaryPhoneNumber!)
              }
              data-testid={
                ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
              }
            >
              {contact.primaryPhoneNumber}
            </FirstPhoneNumber>
            <SecondPhoneNumber
              onClick={() =>
                handlePhoneNumberSelection(contact.secondaryPhoneNumber!)
              }
              data-testid={
                ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
              }
            >
              {contact.secondaryPhoneNumber}
            </SecondPhoneNumber>
          </>
        )}
      </PhoneNumberCol>
    </>
  )
}
