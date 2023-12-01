/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VirtualizedContactListGroupItem } from "App/contacts/components/virtualized-contact-list-group-item/virtualized-contact-list-group-item.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const renderer = (category = "Hello world!") => {
  return renderWithThemeAndIntl(
    <VirtualizedContactListGroupItem category={category} />
  )
}

test("category name should be rendered", () => {
  const { queryByText } = renderer("Test category!")

  expect(queryByText("Test category!")).toBeInTheDocument()
})
