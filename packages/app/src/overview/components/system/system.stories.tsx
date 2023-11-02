import React from "react"
import System from "App/overview/components/system/system.component"
import { action } from "@storybook/addon-actions"
import { css } from "styled-components"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"

const storyStyle = css`
  > * {
    height: 20.5rem;
    width: 62rem;
  }
`

export default {
  title: "Views|Overview/System",
}

export const _System = () => {
  return (
    <StoryContainer column>
      <Story title="New update available" customStyle={storyStyle}>
        <System
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
          updateAvailable
          checkForUpdatePerformed
          updateDownloaded={false}
          checkForUpdateInProgress={false}
          checkForUpdateFailed={false}
        />
      </Story>
      <Story title="Update available and downloaded" customStyle={storyStyle}>
        <System
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
          updateAvailable
          checkForUpdatePerformed
          updateDownloaded
          checkForUpdateInProgress={false}
          checkForUpdateFailed={false}
        />
      </Story>
      <Story title="System up to date" customStyle={storyStyle}>
        <System
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
          checkForUpdatePerformed
          updateAvailable={false}
          updateDownloaded={false}
          checkForUpdateInProgress={false}
          checkForUpdateFailed={false}
        />
      </Story>
      <Story title="Update failed" customStyle={storyStyle}>
        <System
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
          checkForUpdateFailed
          updateAvailable={false}
          checkForUpdateInProgress={false}
          checkForUpdatePerformed={false}
          updateDownloaded={false}
        />
      </Story>
      <Story title="Check for update in progress" customStyle={storyStyle}>
        <System
          osVersion={"1.0.0"}
          onUpdate={action("update requested")}
          checkForUpdateInProgress
          updateAvailable={false}
          checkForUpdatePerformed={false}
          checkForUpdateFailed={false}
          updateDownloaded={false}
        />
      </Story>
    </StoryContainer>
  )
}
