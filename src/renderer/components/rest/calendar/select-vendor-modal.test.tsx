import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import { fireEvent } from "@testing-library/react"
import SelectVendorModal, {
  SelectVendorModalProps,
} from "Renderer/components/rest/calendar/select-vendor-modal.component"
import { asyncNoop } from "Renderer/utils/noop"

const renderModal = ({
  onGoogleButtonClick,
}: Partial<SelectVendorModalProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <SelectVendorModal onGoogleButtonClick={onGoogleButtonClick || asyncNoop} />
  )
  return {
    ...outcome,
    googleButton: () => outcome.getByTestId("google-button"),
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
