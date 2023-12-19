/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ContactNameText } from "Core/contacts/components/contact-name/contact-name.styled"
import { ContactNameProps } from "Core/contacts/components/contact-name/contact-name.interface"
import { getContactByPhoneNumberSelector } from "Core/contacts/selectors"
import { isNameAvailable } from "Core/__deprecated__/renderer/components/rest/messages/is-name-available"
import { createFullName } from "Core/contacts/helpers/contacts.helpers"

const messages = defineMessages({
  unnamedContact: { id: "module.contacts.listUnnamedContact" },
})

export const ContactName: FunctionComponent<ContactNameProps> = ({
  phoneNumber,
}) => {
  const contact = useSelector(getContactByPhoneNumberSelector(phoneNumber))

  return (
    <ContactNameText>
      {isNameAvailable(contact)
        ? createFullName(contact)
        : intl.formatMessage(messages.unnamedContact)}
    </ContactNameText>
  )
}
