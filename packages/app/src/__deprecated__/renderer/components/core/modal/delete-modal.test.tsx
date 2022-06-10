/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import DeleteModal from "App/__deprecated__/renderer/components/core/modal/delete-modal.component"
import { DeleteModalTestIds } from "App/__deprecated__/renderer/components/core/modal/delete-modal.enum"

const renderer = () => renderWithThemeAndIntl(<DeleteModal />)

test("renders properly", () => {
  const { queryByTestId } = renderer()

  expect(queryByTestId(DeleteModalTestIds.Wrapper)).toBeInTheDocument()
})

test("has content", () => {
  const { queryByTestId } = renderer()

  expect(queryByTestId(DeleteModalTestIds.Content)).toBeInTheDocument()
})
