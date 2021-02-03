import { storiesOf } from "@storybook/react"
import React, { useEffect, useState } from "react"
import System from "Renderer/components/rest/overview/system/system.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { action } from "@storybook/addon-actions"
import { css } from "styled-components"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

const fakeSystemInfo = getFakeAdapters().purePhone
const updated = new Date(fakeSystemInfo.getOsUpdateDate()).toLocaleDateString(
  "en-US"
)

const storyStyle = css`
  > * {
    width: 59rem;
  }
`

storiesOf("Views|Overview/System", module).add("System", () => {
  const [osVersion, setOsVersion] = useState("")
  useEffect(() => {
    const fetch = async () => {
      const { data = "" } = await fakeSystemInfo.getOsVersion()
      setOsVersion(data)
    }
    fetch()
  }, [])

  return (
    <StoryContainer column>
      <Story title="Not updated yet" customStyle={storyStyle}>
        <System
          osVersion={osVersion}
          onUpdateCheck={action("checked for update")}
          lastUpdate={"2020-01-14T11:31:08.244Z"}
        />
      </Story>
      <Story title="Updated some time ago" customStyle={storyStyle}>
        <System
          osVersion={osVersion}
          lastUpdate={updated}
          onUpdateCheck={action("checked for update")}
        />
      </Story>
      <Story title="New update available" customStyle={storyStyle}>
        <System
          osVersion={osVersion}
          lastUpdate={updated}
          onUpdate={action("update requested")}
          updateAvailable
        />
      </Story>
      <Story title="New (first) update available" customStyle={storyStyle}>
        <System
          osVersion={osVersion}
          onUpdate={action("update requested")}
          updateAvailable
          lastUpdate={"2020-01-14T11:31:08.244Z"}
        />
      </Story>
      <Story title="Updated just now (custom text)" customStyle={storyStyle}>
        <System
          osVersion={osVersion}
          lastUpdate={"just now"}
          onUpdateCheck={action("checked for update")}
        />
      </Story>
    </StoryContainer>
  )
})
