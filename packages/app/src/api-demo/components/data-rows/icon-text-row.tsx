import React from "react"
import { APIFC } from "App/api-demo/models/api-fc"

interface IconTextRowProps {
  icon: string
  text: string
}

const IconTextRow: APIFC<IconTextRowProps> = ({
  parameters,
  children,
  ...props
}) => {
  const { icon, text } = parameters
  return (
    <div {...props}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

export default IconTextRow
