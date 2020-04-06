import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import { select } from "Renderer/store"
import News from "Renderer/modules/news/news-ui.component"

const selection = select((models: any) => ({
  newsItems: models.muditaNews.newsSortedByCreationDateInDescendingOrder,
}))

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.muditaNews,
    ...state.networkStatus,
    ...selection(state, null),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.muditaNews.loadData(),
  loadOfflineData: () => dispatch.muditaNews.loadOfflineData(),
  updateData: (data: any) => dispatch.muditaNews.updateData(data),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
