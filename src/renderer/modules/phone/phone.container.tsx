import { connect } from "react-redux"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"
import { handleGoogleAuth } from "Renderer/providers/google/auth"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import navigateToThreadInMessages from "Renderer/utils/navigate-to-thread-in-messages"

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
    onMessage: navigateToThreadInMessages,
    onSpeedDialSettingsSave: noop,
  }
}

export default connect(mapStateToProps, mapDispatch)(Phone)
