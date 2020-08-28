import { connect } from "react-redux"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"

import {
  generateSortedStructure,
  generateFlatList,
} from "Renderer/models/phone/phone.helpers"
import { ContactID } from "Renderer/models/phone/phone.typings"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"

const mapStateToProps = ({ phone }: any) => {
  return {
    ...phone,
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
    onManageButtonClick: () =>
      ipcRenderer.callMain(GoogleAuthActions.OpenWindow),
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
