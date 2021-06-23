/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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
        />
      </Story>
      <Story title="New update available" customStyle={storyStyle}>
        <System
          osVersion={osVersion}
          onUpdate={action("update requested")}
          updateAvailable
        />
      </Story>
    </StoryContainer>
  )
})
