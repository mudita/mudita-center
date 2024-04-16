/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { NewsEvent } from "Core/news/constants"
import { NewsEntry } from "Core/news/dto"

export interface NewsState {
  newsItems: NewsEntry[]
}

export type SetNewsAction = PayloadAction<
  NewsState["newsItems"],
  NewsEvent.SetNews
>
