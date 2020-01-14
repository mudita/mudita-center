import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { select } from "Renderer/store"

const mapStateToProps = select(models => ({
  unreadMessages: models.messages.unreadMessages,
}))

export default connect(mapStateToProps)(Menu)
