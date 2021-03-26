export interface ButtonProps {
  label: string
  primary?: boolean
  backgroundColor?: string
  size?: "small" | "medium" | "large"
  onClick?: () => void
}
