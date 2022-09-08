/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ExportContactFailedModal } from "App/contacts/components/export-contact-failed-modal/export-contact-failed-modal.component"
import React, { ComponentProps } from "react"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { ExportContactFailedModalTestIds } from "App/contacts/components/export-contact-failed-modal/export-contact-failed-modal-test-ids.component"

type Props = ComponentProps<typeof ModalDialog>

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    open: true,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ExportContactFailedModal {...props} />)
}

test("ExportContactFailedModal title has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ModalTestIds.Title)).toHaveTextContent(
    "[value] module.contacts.errorExportModalTitle"
  )
})

test("ExportContactFailedModal body has correct text", () => {
  const { getByTestId } = renderer()
  expect(
    getByTestId(ExportContactFailedModalTestIds.Description)
  ).toHaveTextContent("[value] module.contacts.errorExportModalDescription")
})
