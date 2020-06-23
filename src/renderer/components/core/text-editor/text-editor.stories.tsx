import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import TextEditor, {
  SaveStatus,
  Text,
  TextEditorProps,
} from "Renderer/components/core/text-editor/text-editor.component"
import { notes } from "Renderer/components/core/table/table.fake-data"
import styled from "styled-components"
import { useTextEditor } from "Renderer/components/core/text-editor/text-editor.hook"
import { noop } from "Renderer/utils/noop"

const StoryWrapper = styled.div`
  padding: 2rem;
  max-width: 50rem;
  height: 100vh;
  box-sizing: border-box;
`

const defaultText = notes[0]

const StaticStory = ({
  temporaryText = defaultText.text,
  keepTemporaryText = noop,
  rejectChanges = noop,
  saveChanges = noop,
  status = {},
  ...props
}: Partial<TextEditorProps>) => (
  <StoryWrapper>
    <TextEditor
      temporaryText={temporaryText}
      keepTemporaryText={keepTemporaryText}
      rejectChanges={rejectChanges}
      saveChanges={saveChanges}
      statsInfo={`${temporaryText.length} characters`}
      status={status}
      {...props}
    />
  </StoryWrapper>
)

storiesOf("Components|TextEditor", module)
  .add("Preview mode", () => <StaticStory />)
  .add("Edit mode", () => <StaticStory status={{ editMode: true }} />)
  .add("Edit mode: text changed", () => (
    <StaticStory status={{ editMode: true, textChanged: true }} />
  ))
  .add("Edit mode: autosaving changes", () => (
    <StaticStory
      status={{
        editMode: true,
        autosave: SaveStatus.Saving,
        textChanged: true,
      }}
    />
  ))
  .add("Edit mode: autosaved changes", () => (
    <StaticStory
      status={{ editMode: true, autosave: SaveStatus.Saved, textChanged: true }}
    />
  ))
  .add("Edit mode: saving to phone", () => (
    <StaticStory
      status={{
        editMode: true,
        autosave: SaveStatus.Saved,
        save: SaveStatus.Saving,
        textChanged: true,
      }}
    />
  ))
  .add("Interactive (no real saving)", () => {
    // External data (store like) imitation
    const [note, setNote] = useState(notes[0])

    const fakeSave = (newNote: Text) => {
      return new Promise(resolve => {
        setTimeout(() => {
          setNote(newNote)
          resolve()
        }, 1500)
      })
    }

    const editorProps = useTextEditor(note, fakeSave)

    return <StaticStory {...editorProps} />
  })
