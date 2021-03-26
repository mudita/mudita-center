import { AppFunctionComponent } from "@mudita/app-function-component"
import React from "react"
import { Spacing } from "Theme/spacing"
import { getColor, getSpacing } from "Theme/theme-getters"
import { theme } from "Theme/theme-provider"

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
