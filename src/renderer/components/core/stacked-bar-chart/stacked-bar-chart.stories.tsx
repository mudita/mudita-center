import { storiesOf } from "@storybook/react"
import * as React from "react"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { css } from "styled-components"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

const customStoryStyles = css`
  main > * {
    width: 20rem;
  }
`

const biggerStoryStyles = css`
  > * {
    width: 40rem !important;
  }
`

storiesOf("Components|Core/StackedBarChart", module).add("Default", () => {
  return (
    <>
      <StoryContainer title="Types" customStyle={customStoryStyles}>
        <Story title="Thick (default)">
          <StackedBarChart
            chartData={[
              { value: 7, color: "red" },
              { value: 3, color: "pink" },
            ]}
            displayStyle={DisplayStyle.Thick}
          />
        </Story>
        <Story title="Thin">
          <StackedBarChart
            chartData={[
              { value: 7, color: "red" },
              { value: 3, color: "pink" },
            ]}
            displayStyle={DisplayStyle.Thin}
          />
        </Story>
      </StoryContainer>
      <StoryContainer
        title="Customizations"
        customStyle={customStoryStyles}
        column
      >
        <Story title="Multicolor">
          <StackedBarChart
            chartData={[
              { value: 1, color: "#f00" },
              { value: 2, color: "orange" },
              { value: 3, color: "yellow" },
              { value: 1, color: "green" },
              { value: 2, color: "blue" },
              { value: 3, color: "rgba(0,0,0,.2)" },
            ]}
            displayStyle={DisplayStyle.Thick}
          />
        </Story>
        <Story title="With labels" customStyle={biggerStoryStyles}>
          <StackedBarChart
            chartData={[
              { value: 1024 ** 3, color: "#f00" },
              { value: 2 * 1024 ** 3, color: "orange" },
              { value: 3 * 1024 ** 3, color: "blue" },
              { value: 2.5 * 1024 ** 3, color: "rgba(0,0,0,.2)", free: true },
            ]}
            displayStyle={DisplayStyle.Thick}
            labels
          />
        </Story>
      </StoryContainer>
    </>
  )
})
