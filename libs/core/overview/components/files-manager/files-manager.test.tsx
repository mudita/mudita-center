/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { convertBytes } from "Core/core/helpers/convert-bytes/convert-bytes"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import FilesManager from "Core/overview/components/files-manager/files-manager.component"
import { FilesManagerProps } from "Core/overview/components/files-manager/files-manager.interface"
import { noop } from "Core/__deprecated__/renderer/utils/noop"

const renderFilesManager = ({
  onFilesOpen = noop,
  usedSpace = 0,
  ...props
}: Partial<FilesManagerProps> = {}) => {
  return renderWithThemeAndIntl(
    <FilesManager onFilesOpen={onFilesOpen} usedSpace={usedSpace} {...props} />
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
