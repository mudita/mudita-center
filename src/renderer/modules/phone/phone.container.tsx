import { connect } from "react-redux"

import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"

import Phone from "./phone.component"

const mapStateToProps = ({
  phoneView,
}: {
  phoneView: BasicInfoInitialState
}) => ({
  ...phoneView,
})

export default connect(mapStateToProps)(Phone)
