import { connect } from "react-redux"
import {
  OsUpdateAvailability,
  SimCard,
} from "Renderer/models/basic-info/interfaces"
import Overview from "Renderer/modules/overview/overview.component"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"

const selection = select((models: any) => ({
  networkName: models.basicInfo.activeSimNetworkName,
}))

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.basicInfo,
    ...selection(state, null),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.basicInfo.loadData(),
  disconnectDevice: () => dispatch.basicInfo.disconnect(),
  changeSim: (card: SimCard) => dispatch.basicInfo.changeSim(card),
  setOsInfo: (updateInfo: OsUpdateAvailability) =>
    dispatch.basicInfo.setOsUpdateAvailability(updateInfo),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
