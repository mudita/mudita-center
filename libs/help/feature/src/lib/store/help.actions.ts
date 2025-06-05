/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"
import { HelpData } from "help/models"

export const setHelpData = createAction<HelpData>("help/set")

export const rateArticle = createAsyncThunk<
  string,
  { articleId: string; positive: boolean },
  { state: AppState }
>("help/rate", async ({ articleId, positive }, { getState }) => {
  const article = getState().help.data.articles[articleId]
  const version = article?.version ?? "unknown"

  // will be added later
  // await trackWithoutDeviceCheckRequest({
  //   e_c: TrackEventCategory.HelpFeedbackVote,
  //   e_a: `${articleId}/${version}/${positive ? "y" : "n"}`,
  // })

  return articleId
})
