import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"
import { handleGoogleAuth } from "Renderer/providers/google/auth"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { URL_MAIN } from "Renderer/constants/urls"

const selector = select(({ phone }) => ({
  contactList: phone.contactList,
  flatList: phone.flatList,
  speedDialChosenList: phone.speedDialChosenList,
  getContact: phone.getContact,
}))

const mapStateToProps = (state: RootModel) => {
  const { phone, auth } = state
  return {
    ...phone,
    ...auth,
    ...selector(state, {}),
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
    onMessage: (phoneNumber: string, callerId: string) => {
      const history = useHistory()
      history.push(
        `${URL_MAIN.messages}?callerId=${callerId}&phoneNumber=${phoneNumber}`
      )
    },
    onSpeedDialSettingsSave: noop,
  }
}

export default connect(mapStateToProps, mapDispatch)(Phone)
