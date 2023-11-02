import { calls } from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import React from "react"
import Calls from "App/__deprecated__/renderer/modules/phone/tabs/calls.component"
import { Contact } from "App/contacts/reducers/contacts.interface"

const isThreadOpened = () => true
const isContactCreated = () => true
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getContact = (contactId: string) => ({} as Contact)

export default {
  title: "Views/Calls",
}

export const _Calls = () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Calls
      isContactCreated={isContactCreated}
      isThreadOpened={isThreadOpened}
      getContact={getContact}
      calls={calls}
    />
  </div>
)
