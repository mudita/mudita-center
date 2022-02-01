/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { RenderListItem } from "Renderer/components/core/list/list.component"
import { Receiver } from "App/messages/reducers/messages.interface"
import {
  ContactListItem,
  ContactListItemName,
} from "App/contacts/components/contact-input-search/contact-input-search.styled"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const messages = defineMessages({
  noNameProvided: { id: "module.contacts.panelSearchListNoName" },
})

export const renderListItem: RenderListItem<Receiver> = ({ item, props }) => (
  <ContactListItem {...props}>
    <span>
      {createFullName(item) ? (
        <ContactListItemName displayStyle={TextDisplayStyle.MediumText}>
          {createFullName(item)}
        </ContactListItemName>
      ) : (
        <ContactListItemName displayStyle={TextDisplayStyle.MediumFadedText}>
          {intl.formatMessage(messages.noNameProvided)}
        </ContactListItemName>
      )}
      <Text displayStyle={TextDisplayStyle.LightText}>{item.phoneNumber}</Text>
    </span>
  </ContactListItem>
)
