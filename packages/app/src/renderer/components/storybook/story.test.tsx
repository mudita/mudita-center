/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Story, {
  StoryProps,
} from "Renderer/components/storybook/story.component"
import { css } from "styled-components"

const renderStory = ({ ...props }: Partial<StoryProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Story {...props}>
      <div>I'm a component</div>
    </Story>
  )
  return {
    ...outcome,
    getCard: () => outcome.container.querySelector("main"),
  }
}

test("renders default story properly", () => {
  const { getByText } = renderStory()
  expect(getByText("I'm a component")).toBeInTheDocument()
})

test("renders default styles properly", () => {
  const { getCard } = renderStory()
  expect(getCard()).toHaveStyleRule("background-color", "#ffffff")
  expect(getCard()).toHaveStyleRule("box-shadow", "0 0.2rem 2rem 0 #00000014")
})

test("renders dark mode properly", () => {
  const { getCard } = renderStory({ darkMode: true })
  expect(getCard()).toHaveStyleRule("background-color", "#999999")
})

test("renders transparent mode properly", () => {
  const { getCard } = renderStory({ transparentMode: true })
  expect(getCard()).toHaveStyleRule("background-color", "transparent")
})

test("renders border mode properly", () => {
  const { getCard } = renderStory({ borderMode: true })
  expect(getCard()?.children[0]).toHaveStyle(
    "box-shadow: 0 0 0 0.1rem #ff0000;"
  )
})

test("passes custom styles properly", () => {
  const { getCard } = renderStory({
    customStyle: css`
      opacity: 0.5;
    `,
  })
  expect(getCard()).toHaveStyleRule("opacity", "0.5")
})

test("renders title properly", () => {
  const { getByText } = renderStory({ title: "I'm a title" })
  expect(getByText("I'm a title")).toBeInTheDocument()
})
