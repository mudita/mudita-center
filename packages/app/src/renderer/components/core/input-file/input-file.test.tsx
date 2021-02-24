/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputFile, {
  FileInputErrorReason,
  InputFileProps,
} from "Renderer/components/core/input-file/input-file.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/react"

const renderInputFile = ({ ...props }: Partial<InputFileProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<InputFile {...props} />)
  return {
    ...outcome,
    input: outcome.container.querySelector(
      "input[type='file']"
    ) as HTMLInputElement,
    listItems: () => outcome.queryAllByRole("listitem"),
  }
}

export const mockJpg = (name: string): File => {
  return new File(["(⌐□_□)"], name + ".jpg", {
    type: "image/jpg",
  })
}

export const mockEvent = (...files: File[]) => ({
  target: {
    files: [...files],
  },
})

test("file input renders properly", () => {
  const { input, getByRole } = renderInputFile()
  expect(input).toBeInTheDocument()
  expect(getByRole("list")).toBeInTheDocument()
  // TODO: Add check for text after implementing https://appnroll.atlassian.net/browse/PDA-159
})

test("file input shows uploaded file name properly", () => {
  const { input, listItems } = renderInputFile()
  fireEvent.change(input, mockEvent(mockJpg("image1")))
  expect(listItems()[0]).toHaveTextContent("image1.jpg")
})

test("file input replaces previously uploaded file properly", () => {
  const onUpdate = jest.fn()
  const { input } = renderInputFile({ onUpdate })
  fireEvent.change(input, mockEvent(mockJpg("image1")))
  fireEvent.change(input, mockEvent(mockJpg("image2")))
  expect(onUpdate).toBeCalledWith([mockJpg("image2")])
})

test("multiple file input shows uploaded files names properly", () => {
  const { input, listItems } = renderInputFile({ multiple: true })
  fireEvent.change(input, mockEvent(mockJpg("image1"), mockJpg("image2")))
  expect(listItems()[0]).toHaveTextContent("image1.jpg")
  expect(listItems()[1]).toHaveTextContent("image2.jpg")
})

test("multiple file input collects files from many events properly", () => {
  const onUpdate = jest.fn()
  const { input } = renderInputFile({ onUpdate, multiple: true })
  fireEvent.change(input, mockEvent(mockJpg("image1")))
  fireEvent.change(input, mockEvent(mockJpg("image2")))
  expect(onUpdate).toBeCalledWith([mockJpg("image1"), mockJpg("image2")])
})

test("removing files from multiple file input works properly", () => {
  const onUpdate = jest.fn()
  const { input, queryAllByRole } = renderInputFile({
    onUpdate,
    multiple: true,
  })
  fireEvent.change(input, mockEvent(mockJpg("image1"), mockJpg("image2")))
  expect(onUpdate).toBeCalledWith([mockJpg("image1"), mockJpg("image2")])
  fireEvent.click(queryAllByRole("button")[0])
  expect(onUpdate).toBeCalledWith([mockJpg("image2")])
})

test("passing wrong file type produces an error", () => {
  const onUpdate = jest.fn()
  const handleError = jest.fn()
  const jpg = mockJpg("image1")

  const { input } = renderInputFile({
    onUpdate,
    handleError,
    accept: "image/png",
  })
  fireEvent.change(input, mockEvent(jpg))
  expect(onUpdate).toBeCalledWith([])
  expect(handleError).toBeCalledWith({
    reason: FileInputErrorReason.Type,
    file: jpg,
  })
})

test("passing oversized file produces an error", () => {
  const onUpdate = jest.fn()
  const handleError = jest.fn()
  const jpg = mockJpg("image1")

  const { input } = renderInputFile({
    onUpdate,
    handleError,
    accept: "image/jpg",
    maxFileSize: 2, // 2 bytes
  })
  fireEvent.change(input, mockEvent(jpg))
  expect(onUpdate).toBeCalledWith([])
  expect(handleError).toBeCalledWith({
    reason: FileInputErrorReason.Size,
    file: jpg,
  })
})

test("passing too many files produces an error", () => {
  const onUpdate = jest.fn()
  const handleError = jest.fn()

  const { input } = renderInputFile({
    onUpdate,
    handleError,
    multiple: true,
    accept: "image/jpg",
    maxAllowedFiles: 2,
  })
  fireEvent.change(
    input,
    mockEvent(mockJpg("image1"), mockJpg("image2"), mockJpg("image3"))
  )
  expect(onUpdate).toBeCalledWith([])
  expect(handleError).toBeCalledWith({
    reason: FileInputErrorReason.Count,
  })
})
