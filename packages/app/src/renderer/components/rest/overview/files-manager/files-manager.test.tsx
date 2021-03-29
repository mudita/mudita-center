/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { convertBytes } from "Renderer/utils/convert-bytes"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import { FilesManagerProps } from "Renderer/components/rest/overview/files-manager/files-manager.interface"
import { noop } from "Renderer/utils/noop"
import { fireEvent } from "@testing-library/dom"
import history from "Renderer/routes/history"
import { Router } from "react-router"

const renderFilesManager = ({
  onFilesOpen = noop,
  usedSpace = 0,
  ...props
}: Partial<FilesManagerProps> = {}) => {
  return renderWithThemeAndIntl(
    <Router history={history}>
      <FilesManager
        onFilesOpen={onFilesOpen}
        usedSpace={usedSpace}
        {...props}
      />
    </Router>
  )
}

test("renders space info properly", () => {
  const { getByText } = renderFilesManager({
    usedSpace: 33.5,
    maxSpace: 512,
  })
  expect(getByText(convertBytes(33.5))).toBeInTheDocument()
  expect(getByText(`/ ${convertBytes(512)}`)).toBeInTheDocument()
})

test("triggers opening files manager after button click", () => {
  const onFilesOpen = jest.fn()

  const { getByRole } = renderFilesManager({
    onFilesOpen,
  })

  fireEvent.click(getByRole("link"))

  expect(onFilesOpen).toHaveBeenCalled()
})
