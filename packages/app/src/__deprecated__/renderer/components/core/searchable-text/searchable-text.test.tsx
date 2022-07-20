/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import SearchableText from "App/__deprecated__/renderer/components/core/searchable-text/searchable-text.component"
import { SearchableTextTestIds } from "App/__deprecated__/renderer/components/core/searchable-text/searchable-text-test-ids.enum"

export const text = "Searchable Text"
export const search = text.substr(0, 3)

test("the strong tag is visible", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <SearchableText text={text} search={search} />
  )
  expect(getByTestId(SearchableTextTestIds.Strong)).toBeInTheDocument()
})
