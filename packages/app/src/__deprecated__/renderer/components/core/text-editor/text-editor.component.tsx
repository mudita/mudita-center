/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ChangeEvent,
  FocusEvent,
  TextareaHTMLAttributes,
  useState,
} from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  Buttons,
  StatsInfo,
  Info,
  SaveButton,
  Textarea,
  TextEditorWrapper,
} from "App/__deprecated__/renderer/components/core/text-editor/text-editor.elements"
import { defineMessages } from "react-intl"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export const messages = defineMessages({
  clickToEdit: { id: "component.textEditorStatusClickToEdit" },
  editMode: { id: "component.textEditorStatusEditMode" },
  autoSaving: { id: "component.textEditorStatusSaving" },
  autoSaved: { id: "component.textEditorStatusSavedTemporarily" },
  unsaved: { id: "component.textEditorStatusUnsaved" },
  saveButton: { id: "component.textEditorSaveButton" },
  savingButton: { id: "component.textEditorSavingButton" },
  cancelButton: { id: "component.textEditorCancelButton" },
  savedToPhone: { id: "component.textEditorStatusSaved" },
})

export enum SaveStatus {
  Saving,
  Saved,
  NotSaved,
}

export interface Status {
  autosave?: SaveStatus
  save?: SaveStatus
  editMode?: boolean
  textChanged?: boolean
  newText?: boolean
}

export interface Text {
  id: string
  content: string
}

interface Props {
  temporaryText: string
  keepTemporaryText: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onChangesReject: () => void
  onChangesSave: () => void
  statsInfo?: string
  statsInfoError?: boolean
  enableEditMode?: () => void
  disableEditMode?: () => void
  status?: Status
  autoFocus?: boolean
}

export type TextEditorProps = Props &
  TextareaHTMLAttributes<HTMLTextAreaElement>

const TextEditor: FunctionComponent<TextEditorProps> = ({
  temporaryText,
  keepTemporaryText,
  onChangesReject,
  onChangesSave,
  statsInfo,
  statsInfoError,
  onFocus = noop,
  onChange = noop,
  status = {},
  enableEditMode = noop,
  disableEditMode = noop,
  ...rest
}) => {
  const [messageSaved, setMessageSaved] = useState(false)
  const reject = () => {
    onChangesReject()
    disableEditMode()
  }

  const save = async () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await onChangesSave()
    setMessageSaved(true)
    disableEditMode()
  }

  const focus = (event: FocusEvent<HTMLTextAreaElement>) => {
    onFocus(event)
    enableEditMode()
  }

  const change = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event)
    keepTemporaryText(event)
    setMessageSaved(false)
  }

  const getAutosaveStatusMessage = () => {
    const { save: saveStatus, autosave, textChanged, editMode } = status
    switch (true) {
      case textChanged && saveStatus === SaveStatus.NotSaved:
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
      <Info
        element="span"
        data-testid="status"
        message={
          messageSaved ? messages.savedToPhone : getAutosaveStatusMessage()
        }
      />
      <Textarea
        {...rest}
        value={temporaryText}
        onChange={change}
        onFocus={focus}
      />
      {statsInfo && (
        <StatsInfo error={statsInfoError} data-testid="stats-info">
          {statsInfo}
        </StatsInfo>
      )}
      {(status.editMode || status.save === SaveStatus.NotSaved) && (
        <Buttons>
          <ButtonComponent
            data-testid="reject"
            displayStyle={DisplayStyle.Secondary}
            labelMessage={messages.cancelButton}
            onClick={reject}
            disabled={saving || !(status.textChanged || status.newText)}
          />
          <SaveButton
            data-testid="save"
            saving={saving}
            disabled={!status.textChanged || temporaryText.length === 0}
            labelMessage={saving ? messages.savingButton : messages.saveButton}
            onClick={save}
            Icon={saving ? IconType.Reload : undefined}
          />
        </Buttons>
      )}
    </TextEditorWrapper>
  )
}

export default TextEditor
