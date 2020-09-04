import { storiesOf } from "@storybook/react"
import React from "react"
import System from "Renderer/components/rest/overview/system/system.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"

const fakeSystemInfo = getFakeAdapters().purePhone
const osVersion = fakeSystemInfo.getOsVersion()
const updated = new Date(fakeSystemInfo.getOsUpdateDate()).toLocaleDateString(
  "en-US"
)

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

storiesOf("Overview/System", module).add("System", () => {
  return (
    <div style={{ maxWidth: "59rem" }}>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Not updated yet</Text>
        <System
          osVersion={osVersion}
          onUpdateCheck={action("checked for update")}
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
    </div>
  )
})
