import { connect } from "react-redux"
import Calls from "Renderer/modules/phone/tabs/calls.component"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"
import { RootModel } from "Renderer/models/models"
import { select } from "Renderer/store"

const selection = select((models) => ({
  calls: models.calls.filteredList,
}))

const mapStateToProps = (state: RootModel) => ({
  ...selection(state, {}),
})

const mapDispatchToProps = (dispatch: any) => ({
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.calls.changeVisibilityFilter(filter),
  deleteCall: (ids: string[]) => dispatch.calls.deleteCall(ids),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calls)
