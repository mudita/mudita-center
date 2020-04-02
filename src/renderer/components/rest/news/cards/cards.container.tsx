import { connect } from "react-redux"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { RootModel } from "Renderer/models/models"
import { select } from "Renderer/store"

const selection = select((models: any) => ({
  sortedIds: models.muditaNews.sortedIds,
}))

const mapStateToProps = (state: RootModel) => {
  return { ...state.muditaNews, ...selection(state, null) }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.muditaNews.loadData(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
