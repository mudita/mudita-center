import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import TemplateModal from "Renderer/modules/messages/template-modal.component"

storiesOf("Views|Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Messages list={rowsMessages} searchValue={""} />
  </div>
))

storiesOf("Views|Messages/Modals", module).add("Checking for updates", () => (
  <TemplateModal />
))
