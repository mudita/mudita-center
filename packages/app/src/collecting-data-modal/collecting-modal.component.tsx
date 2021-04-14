import CollectingDataModal from "App/collecting-data-modal/collecting-data-modal.component"
import { connect } from "react-redux"

const mapDispatchToProps = (dispatch: any) => ({
  onActionButtonClick: () => dispatch.settings.setCollectingData(true),
  closeModal: () => dispatch.settings.setCollectingData(false)
})

const CollectingModal = connect(null, mapDispatchToProps)(CollectingDataModal)

export default CollectingModal
