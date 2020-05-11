import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"
import { Contact } from "Renderer/models/phone/phone.interface"

const mapState = select(models => ({
  contactList: models.phone.grouped,
  speedDialContacts: models.phone.speedDialContacts,
}))

const mapDispatch = ({ phone }: any) => ({
  onSearchTermChange: (event: string) => phone.handleInput(event),
  ...phone
  // TODO: Add proper actions
  onManageButtonClick: noop,
  onExport: noop,
  onForward: noop,
  onBlock: noop,
  onSelect: noop,
  onCall: noop,
  onMessage: noop,
  onSpeedDialSettingsSave: noop,
})

export default connect(mapState, mapDispatch)(Phone)
