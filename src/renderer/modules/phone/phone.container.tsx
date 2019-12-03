import { connect } from "react-redux"
import { InitialContactList } from "Renderer/models/phone/phone.interface"

import Phone from "./phone.component"

const mapStateToProps = ({ phoneView }: { phoneView: InitialContactList }) => ({
  ...phoneView,
})

export default connect(mapStateToProps)(Phone)
