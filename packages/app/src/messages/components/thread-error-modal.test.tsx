import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ThreadErrorModal from "App/messages/components/thread-error-modal.component"
import { ThreadErrorModalTestIds } from "App/messages/components/thread-error-modal-test-ids.enum"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<ThreadErrorModal {...props} />)

test("modal has correct body text rendered", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ThreadErrorModalTestIds.Body)).toHaveTextContent(
    "[value] view.name.messages.modal.loadingThreadError.body"
  )
})
