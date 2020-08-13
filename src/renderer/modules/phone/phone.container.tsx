import { connect } from "react-redux"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"

import {
  generateSortedStructure,
  getUserFlatList,
} from "Renderer/models/phone/phone.helpers"
import { ContactID } from "Renderer/models/phone/phone.typings"

const mapStateToProps = ({ phone }: any) => {
  return {
    ...phone,
    contactList: generateSortedStructure(phone),
    flatList: getUserFlatList(phone),
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
