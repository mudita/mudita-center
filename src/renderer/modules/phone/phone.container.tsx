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
  onExport: noop,
  onForward: noop,
  onBlock: noop,
  onDelete: noop,
  onSelect: noop,
  onCall: noop,
  onMessage: noop,
})

export default connect(mapState, mapDispatch)(Phone)
