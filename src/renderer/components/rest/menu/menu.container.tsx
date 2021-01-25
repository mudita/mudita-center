import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState, select } from "Renderer/store"

const selection = select((models: any) => ({
  deviceConnected: models.basicInfo.isConnected,
}))

const mapStateToProps = (state: RootState) => ({
  ...selection(state, null),
  devModeEnabled: state.devMode.enabled,
})

export default connect(mapStateToProps)(Menu)
