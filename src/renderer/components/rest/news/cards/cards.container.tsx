import { connect } from "react-redux"
import { select } from "Renderer/store"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { RootModel } from "Renderer/models/models"

const selection = select(models => ({
  cards: models.muditaNews.newsCards,
}))

const mapStateToProps = (state: RootModel) => {
  console.log(state.muditaNews)
  return {
    commentsCount: state.muditaNews.commentsCount,
    ...selection(state, null),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.muditaNews.loadData(),
  getCommentsCount: (postId: number) =>
    dispatch.muditaNews.getCommentsCount(postId),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
