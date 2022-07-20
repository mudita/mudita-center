/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import ImportEventsModal from "App/__deprecated__/calendar/components/import-events-modal/import-events-modal.component"
import { eventsData } from "App/__deprecated__/seeds/calendar"
import { ImportEventsModalTestIds } from "App/__deprecated__/calendar/components/import-events-modal/import-events-modal-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<ImportEventsModal events={eventsData} {...props} />)

test("table renders correct amount of rows", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(ImportEventsModalTestIds.Row)).toHaveLength(
    eventsData.length
  )
})

test("action button has correct text", () => {
  const { getByTestId } = renderer({ onActionButtonClick: jest.fn() })
  expect(getByTestId(ModalTestIds.ModalActionButton)).toHaveTextContent(
    "[value] component.okButton"
  )
})
