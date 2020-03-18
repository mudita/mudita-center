import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import UpdateButtonComponent from "Renderer/components/rest/news/update-button/update-button.component"
import { fireEvent, wait } from "@testing-library/react"

test("calls function passed through props", async () => {
  const onUpdating = jest.fn()

  const { getByText } = renderWithThemeAndIntl(
    <UpdateButtonComponent onUpdating={onUpdating} />
  )

  const button = getByText("Update")

  fireEvent.click(button)

  await wait(() => {
    expect(onUpdating).toHaveBeenCalled()
  })
})
