import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import { wait } from "@testing-library/react"
import "jest-styled-components"
import React from "react"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import {
  singleStateToggler,
  threeStateToggler,
  twoStateToggler,
} from "Renderer/components/core/button-toggler/button-toggler.stories"
import { noop } from "Renderer/utils/noop"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const renderButtonToggler = (
  options: typeof singleStateToggler,
  onClick: (label: string) => void = noop
) => {
  const outcome = renderWithThemeAndIntl(
    <ButtonToggler>
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
    await wait(() =>
      expect(onToggle).toHaveBeenCalledWith(threeStateToggler[index])
    )
  }

  await clickOnButton(1)
  await clickOnButton(0)
  await clickOnButton(2)
})
