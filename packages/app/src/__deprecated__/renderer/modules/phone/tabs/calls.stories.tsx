/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import { calls } from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import React from "react"
import Calls from "App/__deprecated__/renderer/modules/phone/tabs/calls.component"
import { Contact } from "App/contacts/reducers/contacts.interface"

const isThreadOpened = () => true
const isContactCreated = () => true
const getContact = (contactId: string) => ({} as Contact)

storiesOf("Views/Calls", module).add("Calls", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Calls
      isContactCreated={isContactCreated}
      isThreadOpened={isThreadOpened}
      getContact={getContact}
      calls={calls}
    />
  </div>
))
