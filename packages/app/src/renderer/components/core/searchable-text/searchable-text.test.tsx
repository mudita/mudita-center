import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import SearchableText from "Renderer/components/core/searchable-text/searchable-text.component"
import { SearchableTextTestIds } from "Renderer/components/core/searchable-text/searchable-text-test-ids.enum"

export const text = "Searchable Text"
export const search = text.substr(0, 3)

test("the strong tag is visible", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <SearchableText text={text} search={search} />
  )
  expect(getByTestId(SearchableTextTestIds.Strong)).toBeInTheDocument()
})
