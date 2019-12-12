import { connect } from "react-redux"
import { select } from "Renderer/store"
import Phone from "./phone.component"

const mapState = select(models => ({
  contactList: models.phone.grouped,
}))

const mapDispatch = ({ phone }: any) => ({
  handleInput: (event: string) => phone.handleInput(event),
})

export default connect(mapState, mapDispatch)(Phone)
