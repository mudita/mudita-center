import { Dispatch, SetStateAction } from "react"

export type ButtonTogglerKey = string | number | boolean

interface Option {
  label: string
  key: ButtonTogglerKey
}

type ToggleDispatch = Dispatch<SetStateAction<ButtonTogglerKey>>

type ToggleFunction = (key: ButtonTogglerKey) => void

export interface ButtonTogglerProps {
  activeKey?: ButtonTogglerKey
  options: Option[]
  onToggle: ToggleFunction | ToggleDispatch
  filled?: boolean
}
