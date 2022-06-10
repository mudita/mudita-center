/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { screen, fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { CrashDumpModal, CrashDumpProps } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal.component"
import { CrashDumpModalTestingIds } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal-testing-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const propsMock: CrashDumpProps = {
  open: false,
  onClose: jest.fn(),
  onAccept: jest.fn(),
}

const render = (extraProps?: CrashDumpProps) => {
  return renderWithThemeAndIntl(<CrashDumpModal {...propsMock} {...extraProps} />)
}

test("Modal isn't rendering if `open` flag is equal to `false`", () => {
  render()

  expect(screen.queryByTestId(CrashDumpModalTestingIds.Content)).not.toBeInTheDocument()
})

test("Modal rendering with a content if `open` flag is equal to `true`", () => {
  render({
    ...propsMock,
    open: true,
  })

  expect(screen.getByTestId(CrashDumpModalTestingIds.Content)).toBeInTheDocument()
  expect(screen.getByTestId(CrashDumpModalTestingIds.Label)).toHaveTextContent("[value] component.crashDumpModal.label")
  expect(screen.getByTestId(CrashDumpModalTestingIds.Text)).toHaveTextContent("[value] component.crashDumpModal.text")
})

test("Modal buttons react on click actions", () => {
  render({
    ...propsMock,
    open: true,
  })

  const crossButton = screen.getByTestId(ModalTestIds.CloseButton)
  const closeButton = screen.getByTestId(ModalTestIds.CloseBottomButton)
  const actionButton = screen.getByTestId(ModalTestIds.ModalActionButton)

  expect(propsMock.onClose).toHaveBeenCalledTimes(0)
  expect(propsMock.onAccept).toHaveBeenCalledTimes(0)

  fireEvent.click(crossButton)
  fireEvent.click(closeButton)
  fireEvent.click(actionButton)

  expect(propsMock.onClose).toHaveBeenCalledTimes(2)
  expect(propsMock.onAccept).toHaveBeenCalledTimes(1)
})
