import { connect } from "react-redux"
import { SimCard } from "Renderer/models/basic-info/interfaces"
import Overview from "Renderer/modules/overview/overview.component"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"

const selection = select((models: any) => ({
  networkName: models.basicInfo.activeSimNetworkName,
}))

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.basicInfo,
    ...selection(state, null),
    ...state.phoneUpdate,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.basicInfo.loadData(),
  disconnectDevice: () => dispatch.basicInfo.disconnect(),
  changeSim: (card: SimCard) => dispatch.basicInfo.changeSim(card),
  updatePhoneOsInfo: (updateInfo: PhoneUpdate) =>
    dispatch.phoneUpdate.update(updateInfo),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
