import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"

storiesOf("Views|Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Messages list={rowsMessages} searchValue={""} />
  </div>
))
