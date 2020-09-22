import { connect } from "react-redux"
import TetheringUI from "Renderer/modules/tethering/tethering-ui.component"
import { Store as basicInfoStore } from "Renderer/models/basic-info/interfaces"

const mapStateToProps = ({ basicInfo }: { basicInfo: basicInfoStore }) => {
  return basicInfo
}

export default connect(mapStateToProps, null)(TetheringUI)
