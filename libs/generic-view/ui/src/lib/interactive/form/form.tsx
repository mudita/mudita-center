/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { FormProvider } from "./form-provider"

export const Form: APIFC = ({ children, ...props }) => {
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //
  //   console.log("Form submitted")
  //   console.log(event)
  // }

  return (
    <FormProvider>
      <FormWrapper {...props}>{children}</FormWrapper>
    </FormProvider>
  )
}

export default Form

const FormWrapper = styled.form`
  width: 100%;
`
