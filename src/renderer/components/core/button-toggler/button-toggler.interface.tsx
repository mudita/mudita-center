interface Option {
  label: string
  key: any
}

export interface ButtonTogglerProps {
  activeKey?: any
  options: Option[]
  onToggle: (prop?: any) => void
  filled?: boolean
}
