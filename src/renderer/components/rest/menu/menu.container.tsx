import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState } from "Renderer/store"
import { ipcRenderer } from "electron-better-ipc"
import { OpenNewWindow } from "Common/enums/open-new-window.enum"

const mapStateToProps = (state: RootState) => ({
  deviceDisconnected: state.basicInfo.disconnectedDevice,
  devModeEnabled: state.devMode.devModeEnabled,
  openHelpWindow: () => ipcRenderer.callMain(OpenNewWindow.Help),
})

export default connect(mapStateToProps)(Menu)
