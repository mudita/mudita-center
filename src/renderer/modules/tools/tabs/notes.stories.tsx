import React from "react"
import { storiesOf } from "@storybook/react"
import { exampleData } from "App/__mocks__/notes"
import Notes from "Renderer/modules/tools/tabs/notes.component"
import AppViewStory from "Renderer/components/rest/storybook/app-view.component"

storiesOf("Views|Tools/Notes", module)
  .add("Default", () => (
    <AppViewStory>
      <Notes data={exampleData} />
    </AppViewStory>
  ))
  .add("Empty", () => (
    <AppViewStory>
      <Notes data={[]} />
    </AppViewStory>
  ))
