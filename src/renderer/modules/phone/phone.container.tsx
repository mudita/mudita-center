import { connect } from "react-redux"
import Phone from "./phone.component"
import { Phone as PhoneType } from "Renderer/models/phone/phone.typings"
import { Auth } from "Renderer/models/auth/auth.typings"
import { noop } from "Renderer/utils/noop"

import {
  generateFlatList,
  generateSortedStructure,
} from "Renderer/models/phone/phone.helpers"
import { ContactID } from "Renderer/models/phone/phone.typings"
import { handleGoogleAuth } from "Renderer/providers/google/auth"

const mapStateToProps = ({ phone, auth }: { phone: PhoneType; auth: Auth }) => {
  return {
    ...phone,
    ...auth,
    contactList: generateSortedStructure(phone),
    flatList: generateFlatList(phone),
    speedDialChosenList: [],
    getContact: (id: ContactID) => phone.db[id],
  }
}

const mapDispatch = ({ phone, auth }: any) => {
  return {
    ...phone,
    ...auth,
    onSearchTermChange: noop,
    // TODO: Add proper actions
    onManageButtonClick: handleGoogleAuth,
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
