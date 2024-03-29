/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSimpleListItemAvatar } from "Core/contacts/components/contact-simple-list-item-avatar"
import { ContactSimpleListPhoneSelectionItemTestIdsEnum } from "Core/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection-test-ids.enum"
import { ContactSimpleItemListPhoneSelectionProps } from "Core/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection.interface"
import {
  AvatarCol,
  FirstPhoneNumber,
  PhoneNumberCol,
  SecondPhoneNumber,
} from "Core/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection.styled"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React, { useState } from "react"

export const ContactSimpleItemListPhoneSelection: FunctionComponent<
  ContactSimpleItemListPhoneSelectionProps
> = ({ contact, onPhoneNumberSelect }) => {
  const [mainColumnHovered, setMainColumnHovered] = useState<boolean>(false)

  const onMainColumnMouseEnter = () => {
    setMainColumnHovered(true)
  }

  const onMainColumnMouseOut = () => {
    setMainColumnHovered(false)
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
        onMouseEnter={onMainColumnMouseEnter}
        onMouseLeave={onMainColumnMouseOut}
        hovered={mainColumnHovered}
        onClick={onAvatarColClick}
      >
        <ContactSimpleListItemAvatar contact={contact} />
      </AvatarCol>
      <PhoneNumberCol>
        {contact.primaryPhoneNumber && (
          <FirstPhoneNumber
            onMouseEnter={onMainColumnMouseEnter}
            onMouseLeave={onMainColumnMouseOut}
            hovered={mainColumnHovered}
            onClick={() =>
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              handlePhoneNumberSelection(contact.primaryPhoneNumber!)
            }
            data-testid={
              ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
            }
          >
            {contact.primaryPhoneNumber}
          </FirstPhoneNumber>
        )}
        {contact.secondaryPhoneNumber &&
          (!contact.primaryPhoneNumber ? (
            <FirstPhoneNumber
              onMouseEnter={onMainColumnMouseEnter}
              onMouseLeave={onMainColumnMouseOut}
              hovered={mainColumnHovered}
              onClick={() =>
                // AUTO DISABLED - fix me if you like :)
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                handlePhoneNumberSelection(contact.secondaryPhoneNumber!)
              }
              data-testid={
                ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
              }
            >
              {contact.primaryPhoneNumber}
            </FirstPhoneNumber>
          ) : (
            <SecondPhoneNumber
              onClick={() =>
                // AUTO DISABLED - fix me if you like :)
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                handlePhoneNumberSelection(contact.secondaryPhoneNumber!)
              }
              data-testid={
                ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
              }
            >
              {contact.secondaryPhoneNumber}
            </SecondPhoneNumber>
          ))}
      </PhoneNumberCol>
    </>
  )
}
