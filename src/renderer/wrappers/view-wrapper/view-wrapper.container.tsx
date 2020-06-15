import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"

import { ViewWrapper } from "Renderer/wrappers/view-wrapper/view-wrapper.component"

const mapStateToProps = ({ devMode }: RootModel) => ({
  ...devMode,
})

export default connect(mapStateToProps)(ViewWrapper)
