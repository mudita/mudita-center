import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"

const mapState = select(models => ({
  grouped: models.phoneView.grouped,
}))

export default connect(mapState)(Phone)
