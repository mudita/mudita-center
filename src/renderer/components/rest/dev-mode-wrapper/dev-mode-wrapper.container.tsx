import { connect } from "react-redux"

import { RootModel } from "Renderer/models/models"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.component"

const mapState = ({ devMode }: RootModel) => ({
  ...devMode,
})

export default connect(mapState)(DevModeWrapper)
