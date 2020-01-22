import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import { wait } from "@testing-library/react"
import "jest-styled-components"
import React from "react"
import ButtonToggler from "Renderer/components/core/button-toggler/button-toggler.component"
import { ButtonTogglerProps } from "Renderer/components/core/button-toggler/button-toggler.interface"
import {
  singleStateToggler,
  threeStateToggler,
  twoStateToggler,
} from "Renderer/components/core/button-toggler/button-toggler.stories"
import { noop } from "Renderer/utils/noop"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const renderButtonToggler = ({
  options = singleStateToggler,
  onToggle = noop,
  ...props
}: Partial<ButtonTogglerProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <ButtonToggler options={options} onToggle={onToggle} {...props} />
  )
  return {
    ...outcome,
    getButtons: () => outcome.queryAllByRole("button"),
  }
}

test("matches snapshot", () => {
  const { container } = renderButtonToggler({ options: twoStateToggler })
  expect(container).toMatchSnapshot()
})

test("render single-state toggler properly", () => {
  const { getButtons } = renderButtonToggler({ options: singleStateToggler })
  expect(getButtons()).toHaveLength(singleStateToggler.length)
})

test("render two-state toggler properly", () => {
  const { getButtons } = renderButtonToggler({ options: twoStateToggler })
  expect(getButtons()).toHaveLength(twoStateToggler.length)
})

test("render three-state toggler properly", () => {
  const { getButtons } = renderButtonToggler({ options: threeStateToggler })
  expect(getButtons()).toHaveLength(threeStateToggler.length)
})

test("render buttons labels properly", () => {
  const { getButtons } = renderButtonToggler({ options: twoStateToggler })
  expect(getButtons()[0]).toHaveTextContent(twoStateToggler[0].label)
  expect(getButtons()[1]).toHaveTextContent(twoStateToggler[1].label)
})

test("switches active state properly", async () => {
  const onToggle = jest.fn()

  const { getButtons } = renderButtonToggler({
    options: threeStateToggler,
    onToggle,
  })

  const clickOnButton = async (index: number) => {
    fireEvent.click(getButtons()[index])
    await wait(() =>
      expect(onToggle).toHaveBeenCalledWith(threeStateToggler[index].key)
    )
  }

  await clickOnButton(1)
  await clickOnButton(0)
  await clickOnButton(2)
})
