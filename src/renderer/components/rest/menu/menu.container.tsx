import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState } from "Renderer/store"

const mapStateToProps = (state: RootState) => {
  return {
    deviceDisconnected: state.basicInfo.disconnectedDevice,
    isDevModeEnabled: state.devMode.isDevModeEnabled,
  }
}

export default connect(mapStateToProps)(Menu)
