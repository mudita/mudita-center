/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsState } from "App/news/reducers"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Selector } from "reselect"

export const newsStateSelector: Selector<ReduxRootState, NewsState> = (state) =>
  state.news
