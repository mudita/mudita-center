/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { TmpDispatch, select } from "App/__deprecated__/renderer/store"
import News from "App/__deprecated__/news/components/news/news.component"
import { DefaultNewsItems } from "App/__deprecated__/main/default-news-item"

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

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  loadData: () => dispatch.muditaNews.loadData(),
  updateData: (data: DefaultNewsItems | { updating: boolean }) =>
    dispatch.muditaNews.updateData(data),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
