import { connect } from "react-redux"

import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"

import Overview from "./overview.component"

const mapStateToProps = ({
  basicInfo,
}: {
  basicInfo: BasicInfoInitialState
}) => ({
  ...basicInfo,
})

export default connect(mapStateToProps)(Overview)
