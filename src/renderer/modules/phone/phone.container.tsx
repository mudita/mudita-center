import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"

const mapState = select(models => ({
  grouped: models.phoneView.grouped,
}))

const mapDispatch = dispatch => ({
  handleInput: e => dispatch.phoneView.handleInput(e),
})

export default connect(mapState, mapDispatch)(Phone)
