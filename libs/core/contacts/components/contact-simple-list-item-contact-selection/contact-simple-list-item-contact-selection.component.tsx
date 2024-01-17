/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSimpleListItemAvatar } from "Core/contacts/components/contact-simple-list-item-avatar"
import { ContactSimpleListItemContactSelectionTestIdsEnum } from "Core/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection-test-ids.enum"
import { ContactSimpleListItemContactSelectionProps } from "Core/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection.interface"
import { ClickableCol } from "Core/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection.styled"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React from "react"

export const ContactSimpleListItemContactSelection: FunctionComponent<
  ContactSimpleListItemContactSelectionProps
> = (props) => {
  const { contact, onContactSelect } = props

  const handleSelectContact = () => {
    onContactSelect(contact)
  }

  return (
    <>
      <ClickableCol
        data-testid={
          ContactSimpleListItemContactSelectionTestIdsEnum.NameWrapperColumn
        }
        onClick={handleSelectContact}
      >
        <ContactSimpleListItemAvatar contact={contact} />
      </ClickableCol>
      <ClickableCol
        onClick={handleSelectContact}
        data-testid={
          ContactSimpleListItemContactSelectionTestIdsEnum.PhoneNumbersColumn
        }
      >
        {[contact.primaryPhoneNumber, contact.secondaryPhoneNumber].join("  ")}
      </ClickableCol>
    </>
  )
}
