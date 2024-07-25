/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "generic-view/store"
import { HelpData } from "help/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getHelpData } from "./requests"
import { helpDatabase } from "help/feature"
import { trackWithoutDeviceCheckRequest } from "Core/analytic-data-tracker/requests"

export const setHelpData = createAsyncThunk<
  HelpData,
  undefined,
  { state: ReduxRootState }
>(ActionName.HelpSetData, async () => {
  const helpData = await getHelpData()

  const db = await helpDatabase
  await db.updateData(helpData.articles)

  return helpData
})

export const rateArticle = createAsyncThunk<
  string,
  {
    articleId: string
    positive: boolean
  },
  { state: ReduxRootState }
>(
  ActionName.HelpRateArticle,
  async ({ articleId, positive }, { getState, dispatch }) => {
    const articles = getState().helpV2.data.articles
    const { version } = articles[articleId]

    void trackWithoutDeviceCheckRequest({
      action_name: "help/article-feedback",
      e_c: articleId,
      e_a: `${version}`,
      e_n: positive ? "positive" : "negative",
      e_v: positive ? 1 : -1,
    })
    console.log(
      "article id:",
      articleId,
      "positive:",
      positive,
      "version:",
      version
    )
    return articleId
  }
)
