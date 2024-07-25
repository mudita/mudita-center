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
>(ActionName.HelpRateArticle, async ({ articleId, positive }) => {
  console.log("article id:", articleId, "positive:", positive)
  return articleId
})
