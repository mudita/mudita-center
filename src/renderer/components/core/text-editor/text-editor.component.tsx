import React, { ChangeEvent, FocusEvent, TextareaHTMLAttributes } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Buttons,
  StatsInfo,
  Info,
  SaveButton,
  Textarea,
  TextEditorWrapper,
} from "Renderer/components/core/text-editor/text-editor.elements"
import { defineMessages } from "react-intl"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"

export const messages = defineMessages({
  clickToEdit: { id: "component.textEditor.status.clickToEdit" },
  editMode: { id: "component.textEditor.status.editMode" },
  autoSaving: { id: "component.textEditor.status.autosave.saving" },
  autoSaved: { id: "component.textEditor.status.autosave.saved" },
  unsaved: { id: "component.textEditor.status.save.unsaved" },
  saveButton: { id: "component.textEditor.button.save" },
  savingButton: { id: "component.textEditor.button.saving" },
  cancelButton: { id: "component.textEditor.button.cancel" },
})

export enum SaveStatus {
  Saving,
  Saved,
  Unsaved,
}

export interface Status {
  autosave?: SaveStatus
  save?: SaveStatus
  editMode?: boolean
  textChanged?: boolean
}

export interface Text {
  id: string
  text: string
}

interface Props {
  temporaryText: string
  keepTemporaryText: (event: ChangeEvent<HTMLTextAreaElement>) => void
  rejectChanges: () => void
  saveChanges: () => void
  statsInfo?: string
  enableEditMode?: () => void
  disableEditMode?: () => void
  status: Status
}

export type TextEditorProps = Props &
  TextareaHTMLAttributes<HTMLTextAreaElement>

const TextEditor: FunctionComponent<TextEditorProps> = ({
  temporaryText,
  keepTemporaryText,
  rejectChanges,
  saveChanges,
  statsInfo,
  onFocus = noop,
  onChange = noop,
  status,
  enableEditMode = noop,
  disableEditMode = noop,
  ...rest
}) => {
  const reject = () => {
    rejectChanges()
    disableEditMode()
  }

  const save = async () => {
    await saveChanges()
    disableEditMode()
  }

  const focus = (event: FocusEvent<HTMLTextAreaElement>) => {
    onFocus(event)
    enableEditMode()
  }

  const change = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event)
    keepTemporaryText(event)
  }

  const getAutosaveStatusMessage = () => {
    const { save: saveStatus, autosave, textChanged, editMode } = status
    switch (true) {
      case textChanged && saveStatus === SaveStatus.Unsaved:
        return messages.unsaved
      case textChanged && autosave === SaveStatus.Saving:
        return messages.autoSaving
      case textChanged && autosave === SaveStatus.Saved:
        return messages.autoSaved
      case editMode:
        return messages.editMode
      default:
        return messages.clickToEdit
    }
  }

  const saving = status.save === SaveStatus.Saving

  return (
    <TextEditorWrapper>
      <Info data-testid="status" message={getAutosaveStatusMessage()} />
      <Textarea
        {...rest}
        value={temporaryText}
        onChange={change}
        onFocus={focus}
      />
      {statsInfo && <StatsInfo data-testid="stats-info">{statsInfo}</StatsInfo>}
      {(status.editMode || status.save === SaveStatus.Unsaved) && (
        <Buttons>
          <ButtonComponent
            data-testid="reject"
            displayStyle={DisplayStyle.Secondary}
            labelMessage={messages.cancelButton}
            onClick={reject}
            disabled={saving || !status.textChanged}
          />
          <SaveButton
            data-testid="save"
            saving={saving}
            disabled={!status.textChanged}
            labelMessage={saving ? messages.savingButton : messages.saveButton}
            onClick={save}
            Icon={saving ? Type.Reload : undefined}
          />
        </Buttons>
      )}
    </TextEditorWrapper>
  )
}

export default TextEditor
