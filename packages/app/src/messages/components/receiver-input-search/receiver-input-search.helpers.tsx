/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { RenderListItem } from "App/__deprecated__/renderer/components/core/list/list.component"
import { Receiver } from "App/messages/reducers/messages.interface"
import {
  ContactListItem,
  ContactListItemName,
} from "App/contacts/components/contact-input-search/contact-input-search.styled"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { Item } from "App/__deprecated__/renderer/components/core/input-search/input-search.component"

const messages = defineMessages({
  noNameProvided: { id: "module.contacts.panelSearchListNoName" },
})

export const renderListItem: RenderListItem<Item<Receiver>> = ({
  item,
  props,
}) => (
  <ContactListItem {...props}>
    <span>
      {createFullName(item.data) ? (
        <ContactListItemName displayStyle={TextDisplayStyle.Paragraph3}>
          {createFullName(item.data)}
        </ContactListItemName>
      ) : (
        <ContactListItemName
          displayStyle={TextDisplayStyle.Paragraph3}
          color="secondary"
        >
          {intl.formatMessage(messages.noNameProvided)}
        </ContactListItemName>
      )}
      <Text displayStyle={TextDisplayStyle.Paragraph4}>
        {item.data.phoneNumber}
      </Text>
    </span>
  </ContactListItem>
)
