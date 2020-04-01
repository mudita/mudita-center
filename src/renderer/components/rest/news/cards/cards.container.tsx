import { connect } from "react-redux"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { RootModel } from "Renderer/models/models"

const mapStateToProps = (state: RootModel) => {
  return state.muditaNews
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.muditaNews.loadData(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
