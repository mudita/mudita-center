import React from "react"
import StoryContainer, {
  StoryContainerProps,
} from "Renderer/components/storybook/story-container.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Story from "Renderer/components/storybook/story.component"
import { css } from "styled-components"

const renderStoryContainer = ({
  ...props
}: Partial<StoryContainerProps> = {}) => {
  return renderWithThemeAndIntl(
    <StoryContainer {...props}>
      <Story title="I'm a story">
        <div data-testid="component">I'm a component</div>
      </Story>
    </StoryContainer>
  )
}

test("renders default story container properly", () => {
  const { getByText } = renderStoryContainer()
  expect(getByText("I'm a component")).toBeInTheDocument()
})

test("renders story container title properly", () => {
  const { getByText } = renderStoryContainer({ title: "I'm a story container" })
  expect(getByText("I'm a story container")).toBeInTheDocument()
})

test("renders story title properly", () => {
  const { getByText } = renderStoryContainer()
  expect(getByText("I'm a story")).toBeInTheDocument()
})

test("renders column mode properly", () => {
  const { getByTestId } = renderStoryContainer({ column: true })
  expect(getByTestId("container")).toHaveStyleRule("flex-direction", "column")
})

test("renders dark mode properly", () => {
  const { getByTestId } = renderStoryContainer({ darkMode: true })
  expect(getByTestId("component").parentElement).toHaveStyleRule(
    "background-color",
    "#999999"
  )
})

test("passes custom styles properly", () => {
  const { getByTestId } = renderStoryContainer({
    customStyle: css`
      opacity: 0.5;
    `,
  })
  expect(getByTestId("container")).toHaveStyleRule("opacity", "0.5")
})
