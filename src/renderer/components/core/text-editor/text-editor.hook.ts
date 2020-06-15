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
} from "Renderer/components/core/text-editor/text-editor.component"

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

export const useTextEditor = (
  defaultTextObject: Text = { id: "", text: "" },
  saveResults: (textObject: Text) => Promise<any>,
  options: Options = {
    autosaveDebounceTime: 1000,
    statusChangeDelay: 500,
  }
) => {
  const sessionItemKey = `autosave_${defaultTextObject.id}`
  const autosavedText = window.sessionStorage.getItem(sessionItemKey)
  const defaultText = autosavedText || defaultTextObject.text

  const { autosaveDebounceTime, statusChangeDelay } = options
  const [text, setText] = useState(defaultText)
  const init = useRef(true)

  const textChanged =
    text.replace(new RegExp(/\r?\n|\r/g), " ") !==
    defaultTextObject.text.replace(new RegExp(/\r?\n|\r/g), " ")

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
  const debounceAutoSavedStatusSetter = useCallback(
    debounce(setAutoSavedStatus, statusChangeDelay),
    []
  )

  const resetSaveStatus = () =>
    setStatus({ type: Action.Save, payload: undefined })

  const autoSave = () => {
    setStatus({ type: Action.AutoSave, payload: SaveStatus.Saving })
    window.sessionStorage.setItem(sessionItemKey, text)
    debounceAutoSavedStatusSetter()
  }
  const debounceAutoSave = useCallback(
    debounce(autoSave, autosaveDebounceTime),
    [text]
  )

  const clearAutoSave = () => {
    setStatus({ type: Action.AutoSave, payload: undefined })
    window.sessionStorage.removeItem(sessionItemKey)
  }

  const rejectChanges = () => {
    clearAutoSave()
    resetSaveStatus()
    disableEditMode()
    setText(defaultTextObject.text)
  }

  const saveChanges = async () => {
    setStatus({ type: Action.Save, payload: SaveStatus.Saving })
    await saveResults({ ...defaultTextObject, text })
    clearAutoSave()
    resetSaveStatus()
    disableEditMode()
  }

  const handleChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    setStatus({ type: Action.AutoSave, payload: undefined })
    if (init.current) {
      if (textChanged) {
        setStatus({ type: Action.Save, payload: SaveStatus.Unsaved })
      }
      init.current = false
    } else {
      resetSaveStatus()
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
  }, [text])

  useEffect(() => {
    setText(defaultText)
  }, [defaultTextObject])

  return {
    temporaryText: text,
    keepTemporaryText: handleChangeEvent,
    rejectChanges,
    saveChanges,
    textChanged,
    enableEditMode,
    disableEditMode,
    status: {
      ...status,
      textChanged,
    },
  }
}
