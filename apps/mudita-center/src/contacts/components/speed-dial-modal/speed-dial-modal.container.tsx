/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"

import { getContacts } from "App/contacts/helpers/contacts.helpers"

import View from "./speed-dial-modal.component"
import { Contact, ContactID } from "App/contacts/reducers/contacts.interface"

export interface SpeedDialProps {
  contacts: Contact[]
  editContact: (id: ContactID, data: Contact) => Contact
  onClose: () => void
  onSave: () => void
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
const mapState = ({ contacts }: any, ownProps: any) => ({
  contacts: getContacts(contacts),
  ...ownProps,
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
const mapDispatch = ({ contacts }: any) => ({
  ...contacts,
})

export default connect(mapState, mapDispatch)(View)
