import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import "jest-styled-components"
import * as React from "react"
import FilesPage from "./files.page"

test("matches snapshot", () => {
  const { getByText } = render(<FilesPage />)
  // expect(getByText("Files")).toBeInDocument()
  expect(getByText("Files")).toBeDefined()
})
