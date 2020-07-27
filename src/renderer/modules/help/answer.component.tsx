import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import AnswerUI from "Renderer/components/rest/help/answer-ui.component"

const mapStateToProps = ({ help }: RootModel) => ({
  ...help,
})

export default connect(mapStateToProps, null)(AnswerUI)
