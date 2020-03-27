import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"

const mapState = select(models => ({
  contactList: models.phone.grouped,
}))

const mapDispatch = ({ phone }: any) => ({
  onSearchTermChange: (event: string) => phone.handleInput(event),
  // TODO: Add proper actions
  onManageButtonClick: noop,
  onNewButtonClick: noop,
  onContactExport: noop,
  onContactForward: noop,
  onContactBlock: noop,
  onContactDelete: noop,
})

export default connect(mapState, mapDispatch)(Phone)
