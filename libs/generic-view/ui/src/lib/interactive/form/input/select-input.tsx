/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FormSelectInputConfig, FormSelectInputData } from "generic-view/models"
import { APIFC, useViewFormContext } from "generic-view/utils"
import React, { useId } from "react"

export const SelectInput: APIFC<FormSelectInputData, FormSelectInputConfig> = ({
  data,
  config,
  ...props
}) => {
  const id = useId()
  const getFormContext = useViewFormContext()
  const { register, setValue, getValues, watch } = getFormContext()

  const fieldRegistrar = register(inputName, {
    ...config.validation,
  })
}
