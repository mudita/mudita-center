import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputFile, {
  InputFileProps,
} from "Renderer/components/core/input-file/input-file.component"
import { renderWithTheme } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/react"

const renderInputFile = ({ ...props }: Partial<InputFileProps> = {}) => {
  const outcome = renderWithTheme(<InputFile {...props} />)
  return {
    ...outcome,
    input: outcome.container.querySelector(
      "input[type='file']"
    ) as HTMLInputElement,
    listItems: () => outcome.queryAllByRole("listitem"),
  }
}

const mockJpg = (name: string) => {
  return new File(["(⌐□_□)"], name + ".jpg", {
    type: "image/jpg",
  })
}

const mockEvent = (...files: File[]) => ({
  target: {
    files: [...files],
  },
})

test("file input renders properly", () => {
  const { input, getByText, getByRole } = renderInputFile()
  expect(input).toBeInTheDocument()
  expect(getByText("form.field.fileUpload.description")).toBeInTheDocument()
  expect(getByRole("list")).toBeInTheDocument()
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
