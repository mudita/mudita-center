import React from "react"
import { storiesOf } from "@storybook/react"
import { notesSeed } from "App/seeds/notes"
import Notes from "Renderer/modules/tools/tabs/notes.component"
import AppViewStory from "Renderer/components/rest/storybook/app-view.component"

storiesOf("Views|Tools/Notes", module)
  .add("Default", () => (
    <AppViewStory>
      <Notes notesList={notesSeed.notesList} />
    </AppViewStory>
  ))
  .add("Empty", () => (
    <AppViewStory>
      <Notes notesList={[]} />
    </AppViewStory>
  ))
