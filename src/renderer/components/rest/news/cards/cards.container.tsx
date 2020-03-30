import { connect } from "react-redux"
import { select } from "Renderer/store"
import Cards from "Renderer/components/rest/news/cards/cards.component"

const mapStateToProps = select(models => ({
  cards: models.muditaNews.newsCards,
}))

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.muditaNews.loadData(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
