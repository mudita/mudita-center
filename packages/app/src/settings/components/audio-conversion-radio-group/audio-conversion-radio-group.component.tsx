/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import InputRadioGroup from "App/__deprecated__/renderer/components/core/input-radio-group/input-radio-group.component"
import { InputProps } from "App/__deprecated__/renderer/interfaces/input.interface"

interface Props {
  radioButtonsData: InputProps[]
  radioGroupName: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export const AudioConversionRadioGroup: FunctionComponent<Props> = ({
  radioButtonsData,
  ...props
}) => {
  return <InputRadioGroup {...props} data={radioButtonsData} />
}
