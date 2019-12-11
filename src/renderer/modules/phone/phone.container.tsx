import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"

const mapState = select(models => ({
  grouped: models.phoneView.grouped,
}))

const mapDispatch = (dispatch: any) => ({
  handleInput: (e: any) => dispatch.phoneView.handleInput(e),
})

export default connect(mapState, mapDispatch)(Phone)
