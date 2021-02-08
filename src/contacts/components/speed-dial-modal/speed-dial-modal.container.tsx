/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { connect } from "react-redux"

import { getFlatList } from "App/contacts/store/contacts.helpers"
import { Contact, ContactID } from "App/contacts/store/contacts.type"

import View from "./speed-dial-modal.component"

export interface SpeedDialProps {
  flatList: Contact[]
  editContact: (id: ContactID, data: Contact) => Contact
  onClose: () => void
  onSave: () => void
}

const mapState = ({ contacts }: any, ownProps: any) => ({
  flatList: getFlatList(contacts),
  ...ownProps,
})

const mapDispatch = ({ contacts }: any) => ({
  ...contacts,
})

export default connect(mapState, mapDispatch)(View)
