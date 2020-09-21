import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import {
  SyncCalendarModal,
  SynchronizingFailedModal,
} from "Renderer/components/rest/calendar/calendar.modals"

test("google button action is performed", () => {
  const onGoogleButtonClick = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <SyncCalendarModal onGoogleButtonClick={onGoogleButtonClick} />
  )
  const googleButton = getByText(
    "[value] view.name.phone.contacts.googleButtonText"
  )
  googleButton.click()
  expect(onGoogleButtonClick).toBeCalled()
})

test("refresh button action is performed ", () => {
  const onRefresh = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <SynchronizingFailedModal onRefresh={onRefresh} />
  )
  const refreshButton = getByText(
    "[value] view.name.calendar.synchronizingFailedModal.refreshButton"
  )
  refreshButton.click()
  expect(onRefresh).toBeCalled()
})
