import { connect } from "react-redux"
import { SimCard } from "Renderer/models/basic-info/interfaces"
import Overview from "Renderer/modules/overview/overview.component"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"

const selection = select(models => ({
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
