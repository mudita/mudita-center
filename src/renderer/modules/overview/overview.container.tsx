import { connect } from "react-redux"
import {
  InitialState as BasicInfoInitialState,
  SimCard,
} from "Renderer/models/basic-info/interfaces"
import Overview from "Renderer/modules/overview/overview.component"

const mapStateToProps = ({
  basicInfo,
}: {
  basicInfo: BasicInfoInitialState
}) => ({
  ...basicInfo,
})

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.basicInfo.loadData(),
  disconnectDevice: () => dispatch.basicInfo.disconnect(),
  changeSim: (card: SimCard) => dispatch.basicInfo.changeSim(card),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
