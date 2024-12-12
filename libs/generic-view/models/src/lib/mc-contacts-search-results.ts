/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  firstLine: z.string(),
  secondLine: z.string().or(z.array(z.string())),
  highlightPhrase: z.string().optional(),
})

export type ContactsSearchResultsData = z.infer<typeof dataValidator>

const configValidator = z.undefined().optional()

export type ContactsSearchResultsConfig = z.infer<typeof configValidator>

export const mcContactsSearchResults = {
  key: "mc-contacts-search-results",
  dataValidator,
  configValidator,
} as const
