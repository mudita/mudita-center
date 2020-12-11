import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState } from "Renderer/store"

const mapStateToProps = (state: RootState) => ({
  deviceDisconnected: state.basicInfo.disconnectedDevice,
  devModeEnabled: state.devMode.enabled,
})

export default connect(mapStateToProps)(Menu)
