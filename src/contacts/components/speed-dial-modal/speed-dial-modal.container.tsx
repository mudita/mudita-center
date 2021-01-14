import { connect } from "react-redux"

import { getFlatList } from "App/contacts/store/contacts.helpers"
import { Contact, ContactID } from "App/contacts/store/contacts.typings"

import View from "./speed-dial-modal.component"

export interface SpeedDialProps {
  flatList: Contact[]
  editContact: (id: ContactID, data: Contact) => Contact
  onClose: () => void
  onSave: () => void
}

const mapState = ({ phone }: any, ownProps: any) => ({
  flatList: getFlatList(phone),
  ...ownProps,
})

const mapDispatch = ({ phone }: any) => ({
  ...phone,
})

export default connect(mapState, mapDispatch)(View)
