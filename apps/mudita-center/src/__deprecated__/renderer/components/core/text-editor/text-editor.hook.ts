/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import debounce from "lodash/debounce"
import {
  SaveStatus,
  Status,
  Text,
} from "App/__deprecated__/renderer/components/core/text-editor/text-editor.component"
import { asyncNoop } from "App/__deprecated__/renderer/utils/noop"
import { useTemporaryStorage } from "App/__deprecated__/renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const normalizeText = (text: string) => {
  return text.replace(new RegExp(/\r?\n|\r/g), " ")
}

enum Action {
  AutoSave,
  Save,
  EditMode,
}

type ReducerAction =
  | { type: Action.AutoSave; payload?: SaveStatus }
  | { type: Action.Save; payload?: SaveStatus }
  | { type: Action.EditMode; payload?: boolean }

interface Options {
  autosaveDebounceTime?: number
  statusChangeDelay?: number
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTextEditor = (
  defaultTextObject: Text = { id: "", content: "" },
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveResults: (textObject: Text) => Promise<any> = asyncNoop,
  options: Options = {
    autosaveDebounceTime: 1000,
    statusChangeDelay: 500,
  }
) => {
  const { setTemporaryValue, getTemporaryValue, removeTemporaryValue } =
    useTemporaryStorage(defaultTextObject.id)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const temporaryValue = getTemporaryValue()

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const defaultText =
    temporaryValue === undefined ? defaultTextObject.content : temporaryValue

  const { autosaveDebounceTime, statusChangeDelay } = options
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [text, setText] = useState(defaultText)
  const init = useRef(true)

  const textChanged =
    normalizeText(text) !== normalizeText(defaultTextObject.content)
  const tempTextChanged = normalizeText(text) !== normalizeText(defaultText)

  const newText = defaultTextObject.content.length === 0

  const reduceStatus = (state: Status, action: ReducerAction) => {
    switch (action.type) {
      case Action.AutoSave:
        return { ...state, autosave: action.payload }
      case Action.Save:
        return { ...state, save: action.payload }
      case Action.EditMode:
        return { ...state, editMode: action.payload }
    }
  }

  const [status, setStatus] = useReducer(reduceStatus, {
    autosave: undefined,
    save: undefined,
    editMode: false,
  })

  const enableEditMode = () =>
    setStatus({ type: Action.EditMode, payload: true })
  const disableEditMode = () =>
    setStatus({ type: Action.EditMode, payload: false })

  const setAutoSavedStatus = () =>
    setStatus({ type: Action.AutoSave, payload: SaveStatus.Saved })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceAutoSavedStatusSetter = useCallback(
    debounce(setAutoSavedStatus, statusChangeDelay),
    []
  )

  const resetSaveStatus = () =>
    setStatus({ type: Action.Save, payload: undefined })

  const autoSave = () => {
    setStatus({ type: Action.AutoSave, payload: SaveStatus.Saving })
    setTemporaryValue(text)
    debounceAutoSavedStatusSetter()
  }
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceAutoSave = useCallback(
    debounce(autoSave, autosaveDebounceTime),
    [text]
  )

  const clearAutoSave = () => {
    setStatus({ type: Action.AutoSave, payload: undefined })
    removeTemporaryValue()
  }

  const rejectChanges = () => {
    clearAutoSave()
    resetSaveStatus()
    disableEditMode()
    setText(defaultTextObject.content)
  }

  const saveChanges = async () => {
    setStatus({ type: Action.Save, payload: SaveStatus.Saving })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await saveResults({ ...defaultTextObject, content: text })
    clearAutoSave()
    resetSaveStatus()
    disableEditMode()
  }

  const handleChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    setStatus({ type: Action.AutoSave, payload: undefined })
    resetSaveStatus()

    if (init.current) {
      if (tempTextChanged) {
        debounceAutoSave()
      } else {
        setStatus({ type: Action.EditMode, payload: false })
      }
      init.current = false
    } else {
      if (textChanged) {
        debounceAutoSave()
      } else {
        clearAutoSave()
      }
    }

    return () => {
      debounceAutoSave.cancel()
      debounceAutoSavedStatusSetter.cancel()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    setText(defaultText)
    init.current = true
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTextObject.id, defaultTextObject.content])

  return {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    temporaryText: text,
    keepTemporaryText: handleChangeEvent,
    rejectChanges,
    saveChanges,
    enableEditMode,
    disableEditMode,
    status: {
      ...status,
      textChanged,
      newText,
    },
  }
}
