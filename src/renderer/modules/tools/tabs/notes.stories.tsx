import React from "react"
import { storiesOf } from "@storybook/react"
import { notesSeed } from "App/seeds/notes"
import Notes from "Renderer/modules/tools/tabs/notes.component"
import AppViewStory from "Renderer/components/rest/storybook/app-view.component"
import { action } from "@storybook/addon-actions"
import { SortOrder } from "Common/enums/sort-order.enum"

const commonProps = {
  sortOrder: SortOrder.Descending,
  changeSortOrder: action("toggle sort order"),
}

storiesOf("Views|Tools/Notes", module)
  .add("Default", () => (
    <AppViewStory>
      <Notes notesList={notesSeed.notesList} {...commonProps} />
    </AppViewStory>
  ))
  .add("Empty", () => (
    <AppViewStory>
      <Notes notesList={[]} {...commonProps} />
    </AppViewStory>
  ))
