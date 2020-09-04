import { connect } from "react-redux"
import Phone from "./phone.component"
import { Phone as PhoneType } from "Renderer/models/phone/phone.typings"
import { noop } from "Renderer/utils/noop"

import {
  generateSortedStructure,
  generateFlatList,
} from "Renderer/models/phone/phone.helpers"
import { ContactID } from "Renderer/models/phone/phone.typings"

const mapStateToProps = ({ phone }: { phone: PhoneType }) => {
  return {
    contactList: generateSortedStructure(phone),
    flatList: generateFlatList(phone),
    getContact: (id: ContactID) => phone.db[id],
  }
}

const mapDispatch = ({ phone }: any) => {
  return {
    onSearchTermChange: (event: string) => phone.handleInput(event),
    ...phone,
    // TODO: Add proper actions
    onManageButtonClick: noop,
    onExport: noop,
    onForward: noop,
    onBlock: noop,
    onSelect: noop,
    onCall: noop,
    onMessage: noop,
    onSpeedDialSettingsSave: noop,
  }
}

export default connect(mapStateToProps, mapDispatch)(Phone)
