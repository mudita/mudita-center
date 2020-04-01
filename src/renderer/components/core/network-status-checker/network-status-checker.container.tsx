import { connect } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.component"

const mapDispatchToProps = (dispatch: any) => ({
  updateOnlineStatus: () => dispatch.networkStatus.updateOnlineStatus(),
})

export default connect(null, mapDispatchToProps)(NetworkStatusChecker)
