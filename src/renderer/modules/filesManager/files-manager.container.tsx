import { connect } from "react-redux"
import FilesManager from "Renderer/modules/filesManager/files-manager.component"
import { select } from "Renderer/store"

const mapStateToProps = select(({ filesManager }) => ({
  data: filesManager.grouped,
}))

export default connect(mapStateToProps)(FilesManager)
