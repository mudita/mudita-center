/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
  saveNote: action("save note"),
  onRemoveNotes: action("remove notes"),
  createNewNote: action("create new note"),
}

storiesOf("Views|Tools/Notes", module)
  .add("Default", () => (
    <AppViewStory>
      <Notes notes={notesSeed.notes} {...commonProps} />
    </AppViewStory>
  ))
  .add("Empty", () => (
    <AppViewStory>
      <Notes notes={[]} {...commonProps} />
    </AppViewStory>
  ))
