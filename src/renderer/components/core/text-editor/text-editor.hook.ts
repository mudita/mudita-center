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
import { asyncNoop } from "Renderer/utils/noop"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"

const normalizeText = (text: string) => {
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

export const useTextEditor = (
  defaultTextObject: Text = { id: "", content: "" },
  saveResults: (textObject: Text) => Promise<any> = asyncNoop,
  options: Options = {
    autosaveDebounceTime: 1000,
    statusChangeDelay: 500,
  }
) => {
  const {
    set: setTemporaryText,
    get: getTemporaryText,
    remove: removeTemporaryText,
  } = useTemporaryStorage(defaultTextObject.id)

  const defaultText = getTemporaryText() || defaultTextObject.content

  const { autosaveDebounceTime, statusChangeDelay } = options
  const [text, setText] = useState(defaultText)
  const init = useRef(true)

  const textChanged =
    normalizeText(text) !== normalizeText(defaultTextObject.content)

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
    setTemporaryText(text)
    debounceAutoSavedStatusSetter()
  }
  const debounceAutoSave = useCallback(
    debounce(autoSave, autosaveDebounceTime),
    [text]
  )

  const clearAutoSave = () => {
    setStatus({ type: Action.AutoSave, payload: undefined })
    removeTemporaryText()
  }

  const rejectChanges = () => {
    clearAutoSave()
    resetSaveStatus()
    disableEditMode()
    setText(defaultTextObject.content)
  }

  const saveChanges = async () => {
    setStatus({ type: Action.Save, payload: SaveStatus.Saving })
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
    if (init.current) {
      if (textChanged) {
        setStatus({ type: Action.Save, payload: SaveStatus.NotSaved })
      } else {
        setStatus({ type: Action.Save, payload: undefined })
        setStatus({ type: Action.EditMode, payload: false })
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
    init.current = true
  }, [defaultTextObject.content])

  return {
    temporaryText: text,
    keepTemporaryText: handleChangeEvent,
    rejectChanges,
    saveChanges,
    enableEditMode,
    disableEditMode,
    status: {
      ...status,
      textChanged,
    },
  }
}
