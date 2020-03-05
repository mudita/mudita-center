import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState } from "Renderer/store"

const mapStateToProps = (state: RootState) => {
  return {
    disconnectedDevice: state.basicInfo.disconnectedDevice,
  }
}

export default connect(mapStateToProps)(Menu)
