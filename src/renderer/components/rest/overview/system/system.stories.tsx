import { storiesOf } from "@storybook/react"
import React, { useEffect, useState } from "react"
import System from "Renderer/components/rest/overview/system/system.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { action } from "@storybook/addon-actions"
import styled, { css } from "styled-components"
import StoryContainer from "Renderer/components/storybook/story-container.component"

const fakeSystemInfo = getFakeAdapters().purePhone
const updated = new Date(fakeSystemInfo.getOsUpdateDate()).toLocaleDateString(
  "en-US"
)

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

const storyContainerStyle = css`
  display: block;
  max-width: 59rem;
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
    <StoryContainer customStyle={storyContainerStyle}>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Not updated yet</Text>
        <System
          osVersion={osVersion}
          onUpdateCheck={action("checked for update")}
          lastUpdate={"2020-01-14T11:31:08.244Z"}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          Updated some time ago
        </Text>
        <System
          osVersion={osVersion}
          lastUpdate={updated}
          onUpdateCheck={action("checked for update")}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          New update available
        </Text>
        <System
          osVersion={osVersion}
          lastUpdate={updated}
          onUpdate={action("update requested")}
          updateAvailable
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          New (first) update available
        </Text>
        <System
          osVersion={osVersion}
          onUpdate={action("update requested")}
          updateAvailable
          lastUpdate={"2020-01-14T11:31:08.244Z"}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          Updated just now (custom text)
        </Text>
        <System
          osVersion={osVersion}
          lastUpdate={"just now"}
          onUpdateCheck={action("checked for update")}
        />
      </Part>
    </StoryContainer>
  )
})
