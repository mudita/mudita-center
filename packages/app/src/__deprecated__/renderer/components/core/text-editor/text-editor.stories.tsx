/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import TextEditor, {
  SaveStatus,
  Text,
} from "App/__deprecated__/renderer/components/core/text-editor/text-editor.component"
import { templates } from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import { css } from "styled-components"
import { useTextEditor } from "App/__deprecated__/renderer/components/core/text-editor/text-editor.hook"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"

const storyStyles = css`
  width: auto;
  max-width: 50rem;
  height: 90vh;

  > * {
    width: 100%;
  }
`

const defaultText = templates[0].content

storiesOf("Components|Core/TextEditor", module)
  .add("Preview mode", () => (
    <Story customStyle={storyStyles}>
      <TextEditor
        temporaryText={defaultText}
        keepTemporaryText={noop}
        onChangesReject={noop}
        onChangesSave={noop}
        statsInfo={`${defaultText.length} characters`}
      />
    </Story>
  ))
  .add("Edit mode", () => (
    <Story customStyle={storyStyles}>
      <TextEditor
        temporaryText={defaultText}
        keepTemporaryText={noop}
        onChangesReject={noop}
        onChangesSave={noop}
        statsInfo={`${defaultText.length} characters`}
        status={{ editMode: true }}
      />
    </Story>
  ))
  .add("Edit mode: text changed", () => (
    <Story customStyle={storyStyles}>
      <TextEditor
        temporaryText={defaultText}
        keepTemporaryText={noop}
        onChangesReject={noop}
        onChangesSave={noop}
        statsInfo={`${defaultText.length} characters`}
        status={{ editMode: true, textChanged: true }}
      />
    </Story>
  ))
  .add("Edit mode: autosaving changes", () => (
    <Story customStyle={storyStyles}>
      <TextEditor
        temporaryText={defaultText}
        keepTemporaryText={noop}
        onChangesReject={noop}
        onChangesSave={noop}
        statsInfo={`${defaultText.length} characters`}
        status={{
          editMode: true,
          autosave: SaveStatus.Saving,
          textChanged: true,
        }}
      />
    </Story>
  ))
  .add("Edit mode: autosaved changes", () => (
    <Story customStyle={storyStyles}>
      <TextEditor
        temporaryText={defaultText}
        keepTemporaryText={noop}
        onChangesReject={noop}
        onChangesSave={noop}
        statsInfo={`${defaultText.length} characters`}
        status={{
          editMode: true,
          autosave: SaveStatus.Saved,
          textChanged: true,
        }}
      />
    </Story>
  ))
  .add("Edit mode: saving to phone", () => (
    <Story customStyle={storyStyles}>
      <TextEditor
        temporaryText={defaultText}
        keepTemporaryText={noop}
        onChangesReject={noop}
        onChangesSave={noop}
        statsInfo={`${defaultText.length} characters`}
        status={{
          editMode: true,
          autosave: SaveStatus.Saved,
          save: SaveStatus.Saving,
          textChanged: true,
        }}
      />
    </Story>
  ))
  .add("Interactive (no real saving)", () => {
    // External data (store like) imitation
    const [note, setNote] = useState(templates[0])

    const fakeSave = (newNote: Text) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setNote(newNote)
          resolve(undefined)
        }, 1500)
      })
    }

    const {
      temporaryText,
      keepTemporaryText,
      rejectChanges,
      saveChanges,
      status,
      enableEditMode,
      disableEditMode,
    } = useTextEditor(note, fakeSave)

    return (
      <Story customStyle={storyStyles}>
        <TextEditor
          temporaryText={temporaryText}
          keepTemporaryText={keepTemporaryText}
          onChangesReject={rejectChanges}
          onChangesSave={saveChanges}
          statsInfo={`${temporaryText.length} characters`}
          status={status}
          enableEditMode={enableEditMode}
          disableEditMode={disableEditMode}
        />
      </Story>
    )
  })
