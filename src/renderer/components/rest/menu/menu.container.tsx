import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState } from "Renderer/store"

const mapStateToProps = (state: RootState) => ({
  deviceDisconnected: state.basicInfo.disconnectedDevice,
  devModeEnabled: state.devMode.devModeEnabled,
})

const mapDispatchToProps = (dispatch: any) => ({
  connectDevice: () => dispatch.basicInfo.connect(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
