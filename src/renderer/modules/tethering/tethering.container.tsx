import { connect } from "react-redux"
import Tethering from "Renderer/modules/tethering/tethering.component"
import { RootState, select } from "Renderer/store"

const selection = select((models: any) => ({
  deviceConnected: models.basicInfo.isConnected,
}))

const mapStateToProps = (state: RootState) => ({
  ...selection(state, null),
})

export default connect(mapStateToProps)(Tethering)
