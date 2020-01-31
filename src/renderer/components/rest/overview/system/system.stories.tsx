import { storiesOf } from "@storybook/react"
import React from "react"
import System from "Renderer/components/rest/overview/system/system.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"

const fakeSystemInfo = getFakeAdapters().purePhone

export const CustomizableSystem = ({
  osVersion = fakeSystemInfo.getOsVersion(),
  lastUpdate,
  onUpdatesCheck,
}: Partial<SystemProps>) => {
  return (
    <System
      osVersion={osVersion}
      lastUpdate={lastUpdate}
      onUpdatesCheck={onUpdatesCheck}
    />
  )
}

storiesOf("Overview/System", module).add("Basic", () => {
  return (
    <div style={{ margin: "2rem", maxWidth: "59rem" }}>
      <Text displayStyle={TextDisplayStyle.SmallText}>Not updated yet</Text>
      <br />
      <CustomizableSystem />
      <br />
      <br />
      <Text displayStyle={TextDisplayStyle.SmallText}>Updated month ago</Text>
      <br />
      <CustomizableSystem lastUpdate={fakeSystemInfo.getOsUpdateDate()} />
      <br />
      <br />
      <Text displayStyle={TextDisplayStyle.SmallText}>
        New update available
      </Text>
      <br />
      <CustomizableSystem lastUpdate={fakeSystemInfo.getOsUpdateDate()} />
    </div>
  )
})
