import { connect } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.component"

const mapDispatchToProps = (dispatch: any) => ({
  getOnlineStatus: () => dispatch.networkStatus.getOnlineStatus(),
})

export default connect(null, mapDispatchToProps)(NetworkStatusChecker)
