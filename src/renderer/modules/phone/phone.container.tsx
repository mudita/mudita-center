import { connect } from "react-redux"
import Phone from "./phone.component"
import { Phone as PhoneType } from "Renderer/models/phone/phone.typings"
import { noop } from "Renderer/utils/noop"
import { handleGoogleAuth } from "Renderer/providers/google/auth"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"

const selector = select(({ phone }) => ({
  contactList: phone.contactList,
  flatList: phone.flatList,
  speedDialChosenList: phone.speedDialChosenList,
  getContact: phone.getContact,
}))

const mapStateToProps = ({ phone }: { phone: PhoneType }) => {
  return {
    ...phone,
    contactList: generateSortedStructure(phone),
    flatList: generateFlatList(phone),
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
