/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Orama, TypedDocument } from "@orama/orama"

export const articlesSchema = {
  id: "string",
  title: "string",
  categoryId: "string",
  textContent: "string",
} as const
export type ArticleDocument = TypedDocument<Orama<typeof articlesSchema>>
