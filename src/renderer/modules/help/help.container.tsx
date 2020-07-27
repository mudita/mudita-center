import { connect } from "react-redux"

import Help from "Renderer/modules/help/help.component"
import { RootModel } from "Renderer/models/models"
import { Dispatch } from "Renderer/store"

const mapStateToProps = ({ devMode, help }: RootModel) => ({
  ...devMode,
  ...help,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  enable: dispatch.devMode.enable,
  disable: dispatch.devMode.disable,
})

export default connect(mapStateToProps, mapDispatchToProps as Dispatch)(Help)
