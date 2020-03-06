import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { convertBytes } from "Renderer/utils/convert-bytes"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import { FilesManagerProps } from "Renderer/components/rest/overview/files-manager/files-manager.interface"
import { noop } from "Renderer/utils/noop"
import { fireEvent } from "@testing-library/dom"
import { wait } from "@testing-library/react"

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

test("triggers opening files manager after button click", async () => {
  const onFilesOpen = jest.fn()

  const { getByRole } = renderFilesManager({
    onFilesOpen,
  })

  fireEvent.click(getByRole("button"))

  await wait(() => {
    expect(onFilesOpen).toHaveBeenCalled()
  })
})
