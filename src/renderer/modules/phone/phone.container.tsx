import { connect } from "react-redux"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"

import {
  generateFlatList,
  generateSortedStructure,
} from "Renderer/models/phone/phone.helpers"
import { ContactID } from "Renderer/models/phone/phone.typings"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"
import { AuthPayload, AuthProviders } from "Renderer/models/auth/auth.typings"

const handleGoogleAuth = async (cb?: (payload: AuthPayload) => void) => {
  await ipcRenderer.callMain(GoogleAuthActions.OpenWindow)
  let data: Record<string, string> | null = null

  const checker = setInterval(async () => {
    const token: Record<string, string> = await ipcRenderer.callMain(
      "send-data"
    )

    if (token) {
      data = token
      clearInterval(checker)
      cb && cb({ provider: AuthProviders.Google, data })
      await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
    }
  }, 500)
}

const mapStateToProps = ({ phone, auth }: any) => {
  return {
    ...phone,
    ...auth,
    contactList: generateSortedStructure(phone),
    flatList: generateFlatList(phone),
    getContact: (id: ContactID) => phone.db[id],
  }
}

const mapDispatch = ({ phone, auth }: any) => {
  return {
    ...phone,
    ...auth,
    onSearchTermChange: (event: string) => phone.handleInput(event),
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
