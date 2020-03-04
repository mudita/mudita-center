import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Menu from "Renderer/components/rest/menu/menu.component"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.basicInfo,
  }
}

export default connect(mapStateToProps)(Menu)
