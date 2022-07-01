/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import News from "App/__deprecated__/news/components/news/news.component"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { select, TmpDispatch } from "App/__deprecated__/renderer/store"
import { connect } from "react-redux"

const selection = select((models: any) => ({
  newsItems: models.muditaNews.newsSortedByCreationDateInDescendingOrder,
}))

const mapStateToProps = (state: RootModel) => {
  return {
    ...selection(state, null),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  loadData: () => dispatch.muditaNews.loadData(),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
