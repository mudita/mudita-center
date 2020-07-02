import React from "react"
import { storiesOf } from "@storybook/react"
import { exampleData } from "App/__mocks__/notes"

import Notes from "Renderer/modules/tools/tabs/notes.component"

storiesOf("Views|Tools", module)
  .add("Notes – default", () => (
    <div style={{ width: "97.5rem" }}>
      <Notes data={exampleData} />
    </div>
  ))
  .add("Notes – empty", () => (
    <div style={{ width: "97.5rem" }}>
      <Notes data={[]} />
    </div>
  ))
