import { connect } from "react-redux"
import Calls from "Renderer/modules/phone/tabs/calls.component"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"

const mapDispatchToProps = (dispatch: any) => ({
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.calls.changeVisibilityFilter(filter),
})

export default connect(null, mapDispatchToProps)(Calls)
