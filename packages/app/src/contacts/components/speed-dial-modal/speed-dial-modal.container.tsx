/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"

import { getFlatList } from "App/contacts/helpers/contacts.helpers"

import View from "./speed-dial-modal.component"
import { Contact, ContactID } from "App/contacts/reducers/contacts.interface"

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
