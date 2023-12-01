/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ImportingContactsModal, {
  ImportingContactsModalProps,
} from "App/contacts/components/importing-contacts-modal/importing-contacts-modal.component"

const renderer = (
  props: ImportingContactsModalProps = { count: 0, total: 0, open: true }
) => {
  return renderWithThemeAndIntl(<ImportingContactsModal {...props} />)
}

test("download icon is rendered properly", () => {
  const { queryByTestId } = renderer()

  expect(queryByTestId("icon-Download")).toBeInTheDocument()
})

test("percentage value is displayed and calculated properly", () => {
  const { getByText } = renderer({ count: 9, total: 10, open: true })

  expect(getByText("90%")).toBeInTheDocument()
})
