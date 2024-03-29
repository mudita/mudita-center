/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { NewsEvent } from "Core/news/constants"
import { NewsEntry } from "Core/news/dto"

export const setNews = createAction<NewsEntry[]>(NewsEvent.SetNews)
