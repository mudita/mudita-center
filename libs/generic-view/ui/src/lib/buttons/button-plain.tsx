/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { ButtonPlainConfig } from "generic-view/models"
import { useButtonAction } from "./button-base/use-button-action"

export const ButtonPlain: APIFC<undefined, ButtonPlainConfig> = ({
  data,
  config,
  children,
  ...props
}) => {
  const callButtonAction = useButtonAction(props.viewKey as string)
  const callAction = () => callButtonAction(config.actions)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === "Space") {
      void callAction()
    }
  }

  return (
    <div
      data-testid={`button-plain_${props.componentKey}`}
      {...props}
      role={"button"}
      tabIndex={0}
      onClick={callAction}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}
