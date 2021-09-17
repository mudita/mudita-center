/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import { select } from "Renderer/store"
import News from "App/news/components/news/news.component"
import { DefaultNewsItems } from "App/main/default-news-item"

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

// TODO replace any with legit `Dispatch`
const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.muditaNews.loadData(),
  updateData: (data: DefaultNewsItems | { updating: boolean }) =>
    dispatch.muditaNews.updateData(data),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
