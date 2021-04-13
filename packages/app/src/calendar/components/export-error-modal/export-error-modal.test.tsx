/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ExportErrorModal from "App/calendar/components/export-error-modal/export-error-modal.component"
import React from "react"
import { ExportErrorModalTestIds } from "App/calendar/components/export-error-modal/export-error-modal-test-ids.enum"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<ExportErrorModal {...props} />)


test("subtitle has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ExportErrorModalTestIds.Subtitle)).toHaveTextContent(
    "[value] view.name.calendar.exportFailed.subtitle"
  )
})

test("body has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ExportErrorModalTestIds.Body)).toHaveTextContent(
    "[value] view.name.calendar.exportFailed.body"
  )
})
