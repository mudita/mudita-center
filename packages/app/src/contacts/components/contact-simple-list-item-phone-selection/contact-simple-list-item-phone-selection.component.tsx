/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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
import { getPhoneNumberById } from "App/phone-numbers/selectors/get-phone-number-by-id.selector"
import { useSelector } from "react-redux"

export const ContactSimpleItemListPhoneSelection: FunctionComponent<
  ContactSimpleItemListPhoneSelectionProps
> = ({ contact, onPhoneNumberSelect }) => {
  const primaryPhoneNumber = useSelector(
    getPhoneNumberById(contact.primaryPhoneNumberId ?? "")
  )
  const secondaryPhoneNumber = useSelector(
    getPhoneNumberById(contact.secondaryPhoneNumberId ?? "")
  )

  const [mainColumnHovered, setMainColumnHovered] = useState<boolean>(false)

  const onMainColumnMouseEnter = () => {
    setMainColumnHovered(true)
  }

  const onMainColumnMouseOut = () => {
    setMainColumnHovered(false)
  }

  const handlePhoneNumberSelection = (phoneNumberId: string) => {
    onPhoneNumberSelect(phoneNumberId)
  }

  const onAvatarColClick = () => {
    if (contact.primaryPhoneNumberId) {
      onPhoneNumberSelect(contact.primaryPhoneNumberId)
    } else if (contact.secondaryPhoneNumberId) {
      onPhoneNumberSelect(contact.secondaryPhoneNumberId)
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
        {contact.primaryPhoneNumberId && (
          <FirstPhoneNumber
            onMouseEnter={onMainColumnMouseEnter}
            onMouseLeave={onMainColumnMouseOut}
            hovered={mainColumnHovered}
            onClick={() =>
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              handlePhoneNumberSelection(contact.primaryPhoneNumberId ?? "")
            }
            data-testid={
              ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
            }
          >
            {primaryPhoneNumber}
          </FirstPhoneNumber>
        )}
        {contact.secondaryPhoneNumberId &&
          (!contact.primaryPhoneNumberId ? (
            <FirstPhoneNumber
              onMouseEnter={onMainColumnMouseEnter}
              onMouseLeave={onMainColumnMouseOut}
              hovered={mainColumnHovered}
              onClick={() =>
                // AUTO DISABLED - fix me if you like :)
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                handlePhoneNumberSelection(contact.secondaryPhoneNumberId!)
              }
              data-testid={
                ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
              }
            >
              {primaryPhoneNumber}
            </FirstPhoneNumber>
          ) : (
            <SecondPhoneNumber
              onClick={() =>
                // AUTO DISABLED - fix me if you like :)
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                handlePhoneNumberSelection(contact.secondaryPhoneNumberId!)
              }
              data-testid={
                ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
              }
            >
              {secondaryPhoneNumber}
            </SecondPhoneNumber>
          ))}
      </PhoneNumberCol>
    </>
  )
}
