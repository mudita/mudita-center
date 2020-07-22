import React from "react"
import { storiesOf } from "@storybook/react"
import { notesList } from "App/__mocks__/notes"
import Notes from "Renderer/modules/tools/tabs/notes-ui.component"
import AppViewStory from "Renderer/components/rest/storybook/app-view.component"

storiesOf("Views|Tools/Notes", module)
  .add("Default", () => (
    <AppViewStory>
      <Notes notesList={notesList} />
    </AppViewStory>
  ))
  .add("Empty", () => (
    <AppViewStory>
      <Notes notesList={[]} />
    </AppViewStory>
  ))
