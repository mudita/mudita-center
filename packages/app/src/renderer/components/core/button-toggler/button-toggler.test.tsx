/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import { waitFor } from "@testing-library/react"
import React from "react"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { noop } from "Renderer/utils/noop"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { ButtonTogglerTestIds } from "Renderer/components/core/button-toggler/button-toggler-test-ids.enum"

export const singleStateToggler = ["Turn on"]

export const twoStateToggler = ["On", "Off"]

export const threeStateToggler = ["Weekly", "Monthly", "Yearly"]

const renderButtonToggler = (
  options: typeof singleStateToggler,
  onClick: (label: string) => void = noop
) => {
  const outcome = renderWithThemeAndIntl(
    <ButtonToggler
      tooltipTitle={mockDefineMessages()}
      tooltipDescription={mockDefineMessages()}
    >
      {options.map((label, i) => {
        const onClickHandler = () => onClick(label)
        return (
          <ButtonTogglerItem key={i} label={label} onClick={onClickHandler} />
        )
      })}
    </ButtonToggler>
  )
  return {
    ...outcome,
    getButtons: () => outcome.queryAllByRole("button"),
  }
}

test("matches snapshot", () => {
  const { container } = renderButtonToggler(twoStateToggler)
  expect(container).toMatchSnapshot()
})

test("render single-state toggler properly", () => {
  const { getButtons } = renderButtonToggler(singleStateToggler)
  expect(getButtons()).toHaveLength(singleStateToggler.length)
})

test("render two-state toggler properly", () => {
  const { getButtons } = renderButtonToggler(twoStateToggler)
  expect(getButtons()).toHaveLength(twoStateToggler.length)
})

test("render three-state toggler properly", () => {
  const { getButtons } = renderButtonToggler(threeStateToggler)
  expect(getButtons()).toHaveLength(threeStateToggler.length)
})

test("render buttons labels properly", () => {
  const { getButtons } = renderButtonToggler(twoStateToggler)
  expect(getButtons()[0]).toHaveTextContent(twoStateToggler[0])
  expect(getButtons()[1]).toHaveTextContent(twoStateToggler[1])
})

test("switches active state properly", async () => {
  const onToggle = jest.fn()

  const { getButtons } = renderButtonToggler(threeStateToggler, onToggle)

  const clickOnButton = async (index: number) => {
    fireEvent.click(getButtons()[index])
    await waitFor(() =>
      expect(onToggle).toHaveBeenCalledWith(threeStateToggler[index])
    )
  }

  await clickOnButton(1)
  await clickOnButton(0)
  await clickOnButton(2)
})

test("renders tooltip", () => {
  const { getByTestId } = renderButtonToggler(twoStateToggler)
  expect(getByTestId("icon-Tooltip")).toBeInTheDocument()
})

test("tooltip has correct text", () => {
  const { getByTestId } = renderButtonToggler(twoStateToggler)
  expect(getByTestId(ButtonTogglerTestIds.Tooltip)).toHaveTextContent(
    "[value] view.name.news[value] view.name.news"
  )
})
