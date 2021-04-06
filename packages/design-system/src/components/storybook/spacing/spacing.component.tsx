import { AppFunctionComponent } from "@mudita/app-function-component"
import React from "react"
import { Spacing, getColor, getSpacing, theme } from "../../.."

interface Props {
  size: Spacing
}

export const SpaceBox: AppFunctionComponent<Props> = ({ size }) => (
  <div
    style={{
      backgroundColor: getColor("blue300")({ theme }),
      height: getSpacing(size)({ theme }),
    }}
  />
)
