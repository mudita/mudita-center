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

type ReducerAction =
  | { type: "autosave"; payload?: SaveStatus }
  | { type: "save"; payload?: SaveStatus }
  | { type: "editMode"; payload?: boolean }

interface Options {
  autosaveDebounceTime?: number
  statusChangeDelay?: number
}

export const useTextEditor = (
  defaultTextObject: Text,
  saveResults: (textObject: Text) => Promise<any>,
  options: Options = {
    autosaveDebounceTime: 1000,
    statusChangeDelay: 500,
  }
) => {
  const sessionItemKey = `autosave_${defaultTextObject.id}`
  const autosavedText = window.sessionStorage.getItem(sessionItemKey)

  const { autosaveDebounceTime, statusChangeDelay } = options
  const [text, setText] = useState(autosavedText || defaultTextObject.text)
  const init = useRef(true)

  const textChanged =
    text.replace(new RegExp(/\r?\n|\r/g), " ") !==
    defaultTextObject.text.replace(new RegExp(/\r?\n|\r/g), " ")

  const reduceStatus = (state: Status, action: ReducerAction) => {
    switch (action.type) {
      case "autosave":
        return { ...state, autosave: action.payload }
      case "save":
        return { ...state, save: action.payload }
      case "editMode":
        return { ...state, editMode: action.payload }
    }
  }

  const [status, setStatus] = useReducer(reduceStatus, {
    autosave: undefined,
    save: undefined,
    editMode: false,
  })

  const enableEditMode = () => setStatus({ type: "editMode", payload: true })
  const disableEditMode = () => setStatus({ type: "editMode", payload: false })

  const setAutoSavedStatus = () =>
    setStatus({ type: "autosave", payload: SaveStatus.Saved })
  const _setAutoSavedStatus = useCallback(
    debounce(setAutoSavedStatus, statusChangeDelay),
    []
  )

  const resetSaveStatus = () => setStatus({ type: "save", payload: undefined })

  const autoSave = () => {
    setStatus({ type: "autosave", payload: SaveStatus.Saving })
    window.sessionStorage.setItem(sessionItemKey, text)
    _setAutoSavedStatus()
  }
  const _autoSave = useCallback(debounce(autoSave, autosaveDebounceTime), [
    text,
  ])

  const clearAutoSave = () => {
    setStatus({ type: "autosave", payload: undefined })
    window.sessionStorage.removeItem(sessionItemKey)
  }

  const rejectChanges = () => {
    clearAutoSave()
    resetSaveStatus()
    disableEditMode()
    setText(defaultTextObject.text)
  }

  const saveChanges = async () => {
    setStatus({ type: "save", payload: SaveStatus.Saving })
    await saveResults({ ...defaultTextObject, text })
    clearAutoSave()
    resetSaveStatus()
    disableEditMode()
  }

  const handleChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    setStatus({ type: "autosave", payload: undefined })
    if (init.current) {
      if (textChanged) {
        setStatus({ type: "save", payload: SaveStatus.Unsaved })
      }
      init.current = false
    } else {
      resetSaveStatus()
      if (textChanged) {
        _autoSave()
      } else {
        clearAutoSave()
      }
    }

    return () => {
      _autoSave.cancel()
      _setAutoSavedStatus.cancel()
    }
  }, [text])

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
