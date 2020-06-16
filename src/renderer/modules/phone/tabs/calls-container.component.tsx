import { connect } from "react-redux"
import Calls from "Renderer/modules/phone/tabs/calls.component"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"
import { RootModel } from "Renderer/models/models"

const mapStateToProps = ({ calls }: RootModel) => ({
  ...calls,
})

const mapDispatchToProps = (dispatch: any) => ({
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.calls.changeVisibilityFilter(filter),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calls)
