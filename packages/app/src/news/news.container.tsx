/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { loadNews } from "App/news/actions"
import News from "App/news/components/news/news.component"
import { newsSortedByCreationDateSelector } from "App/news/selectors"
import {
  ReduxRootState,
  RootState,
  TmpDispatch,
} from "App/__deprecated__/renderer/store"
import { connect } from "react-redux"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    newsItems: newsSortedByCreationDateSelector(state),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  loadData: () => dispatch(loadNews()),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
