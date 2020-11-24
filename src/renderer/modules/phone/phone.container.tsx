import { connect } from "react-redux"
import { History, LocationState } from "history"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { URL_MAIN } from "Renderer/constants/urls"
import createRouterPath from "Renderer/utils/create-router-path"

const selector = select(({ phone, messages }) => ({
  contactList: phone.contactList,
  flatList: phone.flatList,
  speedDialChosenList: phone.speedDialChosenList,
  getContact: phone.getContact,
  isTopicThreadOpened: messages.isTopicThreadOpened,
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
    onExport: noop,
    onForward: noop,
    onBlock: noop,
    onSelect: noop,
    onCall: noop,
    onMessage: (history: History<LocationState>, phoneNumber: string) =>
      history.push(createRouterPath(URL_MAIN.messages, { phoneNumber })),
    onSpeedDialSettingsSave: noop,
  }
}

export default connect(mapStateToProps, mapDispatch)(Phone)
