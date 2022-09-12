/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  Col,
  TextPlaceholder,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { AvatarPlaceholder } from "App/contacts/components/contact-item/contact-item.styled"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { ContactSimpleListItemPlaceholderProps } from "App/contacts/components/contact-simple-list-item-placeholder/contact-simple-list-item-placeholder.interface"
import { ContactSimpleListItemPlaceholderTestIdsEnum } from "App/contacts/components/contact-simple-list-item-placeholder/contact-simple-list-item-placeholder-test-ids.enum"

export const ContactSimpleListItemPlaceholder: FunctionComponent<
  ContactSimpleListItemPlaceholderProps
> = ({ contact }) => {
  const fullName = createFullName(contact)
  const phoneNumber = contact.primaryPhoneNumber || contact.secondaryPhoneNumber

  return (
    <>
      <Col>
        <AvatarPlaceholder
          data-testid={
            ContactSimpleListItemPlaceholderTestIdsEnum.AvatarPlaceholder
          }
        />
        <TextPlaceholder
          data-testid={
            ContactSimpleListItemPlaceholderTestIdsEnum.NamePlaceholder
          }
          charsCount={fullName.length}
        />
      </Col>
      <Col>
        {phoneNumber && (
          <TextPlaceholder
            data-testid={
              ContactSimpleListItemPlaceholderTestIdsEnum.PhoneNumberPlaceholder
            }
            charsCount={phoneNumber.length}
          />
        )}
      </Col>
    </>
  )
}
