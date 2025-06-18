/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { HelpData } from "help/models"
import { helpDatabase } from "help/utils"

export const setHelpData = createAsyncThunk<HelpData, HelpData>(
  "help/set",
  async (helpData) => {
    const db = await helpDatabase
    await db.updateData(helpData.articles)
    return helpData
  }
)

export const setArticleRated = createAction<string>("help/setArticleRated")
