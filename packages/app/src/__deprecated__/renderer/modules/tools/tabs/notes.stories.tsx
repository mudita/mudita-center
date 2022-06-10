/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import { notesSeed } from "App/__deprecated__/seeds/notes"
import Notes from "App/__deprecated__/renderer/modules/tools/tabs/notes.component"
import AppViewStory from "App/__deprecated__/renderer/components/rest/storybook/app-view.component"
import { action } from "@storybook/addon-actions"
import { SortOrder } from "App/__deprecated__/common/enums/sort-order.enum"

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
