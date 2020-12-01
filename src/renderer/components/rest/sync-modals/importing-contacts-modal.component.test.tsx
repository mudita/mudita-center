import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ImportingContactsModal, {
  ImportingContactsModalProps,
} from "Renderer/components/rest/sync-modals/importing-contacts-modal.component"

const renderer = (props: ImportingContactsModalProps) => {
  return renderWithThemeAndIntl(<ImportingContactsModal {...props} />)
}

test("loader is displayed when no contacts is processed", () => {
  const { queryByTestId } = renderer({ count: 0, total: 10 })

  expect(queryByTestId("loader-spinner")).toBeVisible()
  expect(queryByTestId("icon-10")).not.toBeInTheDocument()
})

test("loader is displayed until all contacts are processed", () => {
  const { queryByTestId } = renderer({ count: 9, total: 10 })

  expect(queryByTestId("loader-spinner")).toBeVisible()
  expect(queryByTestId("icon-Check")).not.toBeInTheDocument()
})

test("check icon is displayed when all contacts are processed", () => {
  const { queryByTestId } = renderer({ count: 10, total: 10 })

  expect(queryByTestId("loader-spinner")).not.toBeInTheDocument()
  expect(queryByTestId("icon-Check")).toBeVisible()
})
