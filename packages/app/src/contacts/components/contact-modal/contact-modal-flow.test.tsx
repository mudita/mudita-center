/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"
import ContactModalFlow, {
  ContactModalFlowState,
} from "App/contacts/components/contact-modal/contact-modal-flow.component"
import { screen } from "@testing-library/react"

const renderer = (extraProps?: {}) => {
  const defaultProps: ComponentProps<typeof ContactModalFlow> = {
    config: {
      [ContactModalFlowState.Contact]: false,
      [ContactModalFlowState.Success]: false,
      [ContactModalFlowState.Fail]: false,
    },
    sendForm: jest.fn(),
    closeSuccessModal: jest.fn(),
    closeFailModal: jest.fn(),
    closeContactModal: jest.fn(),
  }
  return renderWithThemeAndIntl(
    <ContactModalFlow {...defaultProps} {...extraProps} />
  )
}

test("initially no modal is opened", () => {
  renderer()
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
})

test("contact support modal is rendered", () => {
  renderer({
    config: {
      [ContactModalFlowState.Contact]: true,
    },
  })
  expect(screen.getByRole("dialog")).toBeInTheDocument()
  expect(
    screen.getByText("[value] component.supportModalTitle")
  ).toBeInTheDocument()
})

test("success modal is rendered", () => {
  renderer({
    config: {
      [ContactModalFlowState.Success]: true,
    },
  })
  expect(screen.getByRole("dialog")).toBeInTheDocument()
  expect(
    screen.getByText("[value] component.supportModalSuccessTitle")
  ).toBeInTheDocument()
})

test("fail modal is rendered", () => {
  renderer({
    config: {
      [ContactModalFlowState.Fail]: true,
    },
  })

  expect(screen.getByRole("dialog")).toBeInTheDocument()
  expect(
    screen.getByText("[value] component.supportModalFailTitle")
  ).toBeInTheDocument()
})

test("fail modal can be closed", () => {
  const closeFailModal = jest.fn()
  renderer({
    config: {
      [ContactModalFlowState.Fail]: true,
    },
    closeFailModal,
  })
  screen.getByText("[value] component.modalCloseButton").click()
  expect(closeFailModal).toHaveBeenCalled()
})

test("success modal can be closed", () => {
  const closeSuccessModal = jest.fn()
  renderer({
    config: {
      [ContactModalFlowState.Success]: true,
    },
    closeSuccessModal,
  })
  screen.getByText("[value] component.modalCloseButton").click()
  expect(closeSuccessModal).toHaveBeenCalled()
})
