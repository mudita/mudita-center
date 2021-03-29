/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import { fireEvent } from "@testing-library/react"
import SelectVendorModal, {
  SelectVendorModalProps,
} from "App/calendar/components/select-vendor-modal/select-vendor-modal.component"
import { noop } from "Renderer/utils/noop"
import { SelectVendorModalTestIds } from "App/calendar/components/select-vendor-modal-test-ids.enum"

const renderModal = ({
  onGoogleButtonClick = noop,
  onManualImportClick = noop,
}: Partial<SelectVendorModalProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <SelectVendorModal
      onGoogleButtonClick={onGoogleButtonClick}
      onManualImportClick={onManualImportClick}
    />
  )
  return {
    ...outcome,
    googleButton: () =>
      outcome.getByTestId(SelectVendorModalTestIds.GoogleButton),
    manualImportButton: () =>
      outcome.getByTestId(SelectVendorModalTestIds.ManualImportButton),
  }
}

test("select calendar modal renders properly", () => {
  const { googleButton } = renderModal()

  expect(googleButton()).toHaveTextContent("[value] common.loginGoogleButton")
})

test("primary calendar is selected by default", () => {
  const onGoogleButtonClick = jest.fn()
  const { googleButton } = renderModal({ onGoogleButtonClick })

  fireEvent.click(googleButton())
  expect(onGoogleButtonClick).toHaveBeenCalled()
})

test("manual import button calls right function", () => {
  const onManualImportClick = jest.fn()
  const { manualImportButton } = renderModal({ onManualImportClick })
  fireEvent.click(manualImportButton())
  expect(onManualImportClick).toHaveBeenCalled()
})
