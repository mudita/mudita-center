/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import { calls } from "Renderer/components/core/table/table.fake-data"
import React from "react"
import Calls from "Renderer/modules/phone/tabs/calls.component"
import { Contact } from "App/contacts/store/contacts.type"

const isThreadOpened = () => true
const isContactCreatedDeprecated = () => true
const getContact = (contactId: string) => ({} as Contact)

storiesOf("Views/Calls", module).add("Calls", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Calls
      isContactCreatedDeprecated={isContactCreatedDeprecated}
      isThreadOpened={isThreadOpened}
      getContact={getContact}
      calls={calls}
    />
  </div>
))
