import { connect } from "react-redux"
import Backup from "Renderer/modules/settings/tabs/backup/backup.component"

const mapDispatchToProps = (dispatch: any) => ({
  openDialog: () => dispatch.backupSettings.openDialog(),
})

export default connect(null, mapDispatchToProps)(Backup)
