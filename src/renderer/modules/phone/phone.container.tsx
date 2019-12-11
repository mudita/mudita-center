import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"

const mapState = select(models => ({
  grouped: models.phone.grouped,
}))

const mapDispatch = (dispatch: any) => ({
  handleInput: (e: any) => dispatch.phone.handleInput(e),
})

export default connect(mapState, mapDispatch)(Phone)
