import { connect } from "react-redux"

import { generateFlatList } from "Renderer/models/phone/phone.helpers"
import { Contact, ContactID } from "Renderer/models/phone/phone.typings"

import View from "./speed-dial-modal.component"

export interface SpeedDialProps {
  flatList: Contact[]
  editContact: (id: ContactID, data: Contact) => Contact
  onClose: () => void
  onSave: () => void
}

const mapState = ({ phone }: any, ownProps: any) => ({
  flatList: generateFlatList(phone),
  ...ownProps,
})

const mapDispatch = ({ phone }: any) => ({
  ...phone,
})

export default connect(mapState, mapDispatch)(View)
