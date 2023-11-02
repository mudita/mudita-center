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

export default {
  title: "Components|Core/TextEditor",
}

export const PreviewMode = () => (
  <Story customStyle={storyStyles}>
    <TextEditor
      temporaryText={defaultText}
      keepTemporaryText={noop}
      onChangesReject={noop}
      onChangesSave={noop}
      statsInfo={`${defaultText.length} characters`}
    />
  </Story>
)

PreviewMode.story = {
  name: "Preview mode",
}

export const EditMode = () => (
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
)

EditMode.story = {
  name: "Edit mode",
}

export const EditModeTextChanged = () => (
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
)

EditModeTextChanged.story = {
  name: "Edit mode: text changed",
}

export const EditModeAutosavingChanges = () => (
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
)

EditModeAutosavingChanges.story = {
  name: "Edit mode: autosaving changes",
}

export const EditModeAutosavedChanges = () => (
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
)

EditModeAutosavedChanges.story = {
  name: "Edit mode: autosaved changes",
}

export const EditModeSavingToPhone = () => (
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
)

EditModeSavingToPhone.story = {
  name: "Edit mode: saving to phone",
}

export const InteractiveNoRealSaving = () => {
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        temporaryText={temporaryText}
        keepTemporaryText={keepTemporaryText}
        onChangesReject={rejectChanges}
        onChangesSave={saveChanges}
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        statsInfo={`${temporaryText.length} characters`}
        status={status}
        enableEditMode={enableEditMode}
        disableEditMode={disableEditMode}
      />
    </Story>
  )
}

InteractiveNoRealSaving.story = {
  name: "Interactive (no real saving)",
}
