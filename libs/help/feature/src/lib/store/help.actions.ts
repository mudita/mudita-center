/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"
import { HelpData } from "help/models"
import { helpDatabase } from "../database/help-database"

export const setHelpData = createAsyncThunk<HelpData, HelpData>(
  "help/set",
  async (helpData) => {
    const db = await helpDatabase
    await db.updateData(helpData.articles)
    return helpData
  }
)

export const rateArticle = createAsyncThunk<
  string,
  { articleId: string; positive: boolean },
  { state: AppState }
>(
  "help/rate",
  async ({ articleId, positive: _positive }, { getState: _getState }) => {
    // TODO: will be added later
    // const article = getState().help.data.articles[articleId]
    // const version = article?.version ?? "unknown"

    // await trackWithoutDeviceCheckRequest({
    //   e_c: TrackEventCategory.HelpFeedbackVote,
    //   e_a: `${articleId}/${version}/${positive ? "y" : "n"}`,
    // })

    return articleId
  }
)
