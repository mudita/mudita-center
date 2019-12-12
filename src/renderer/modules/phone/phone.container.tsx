import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"

const mapState = select(models => ({
  grouped: models.phone.grouped,
}))

const mapDispatch = (dispatch: any) => ({
  handleInput: (event: string) => dispatch.phone.handleInput(event),
})

export default connect(mapState, mapDispatch)(Phone)
