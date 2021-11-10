/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { useState } from "react"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { PasswordFieldTestIds } from "App/ui/components/password-field/password-field-test-ids.enum"
import {
  FieldWrapper,
  FormInputLabel,
  FormInput,
  IconWrapper,
} from "App/ui/components/password-field/password-field.styled"

interface PasswordInputProps {
  errorMessage?: string
  showPassword?: boolean
  label: {
    id: string
  }
}

export const PasswordInput: FunctionComponent<PasswordInputProps> = ({
  label,
  errorMessage,
  showPassword = true,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleToggleInputType = () => {
    setVisible(!visible)
  }

  return (
    <FieldWrapper>
      <FormInputLabel
        data-testid={PasswordFieldTestIds.Label}
        withError={Boolean(errorMessage)}
        displayStyle={TextDisplayStyle.SmallFadedText}
        message={label}
      />
      <FormInput
        data-testid={PasswordFieldTestIds.Input}
        type={visible ? "text" : "password"}
        errorMessage={errorMessage}
        {...props}
      />
      {showPassword && (
        <IconWrapper
          data-testid={PasswordFieldTestIds.VisibilityButton}
          onClick={handleToggleInputType}
        >
          <Icon
            size={IconSize.Bigger}
            type={visible ? Type.Hidden : Type.Visible}
            data-testid={
              visible
                ? PasswordFieldTestIds.VisibleIcon
                : PasswordFieldTestIds.HiddenIcon
            }
          />
        </IconWrapper>
      )}
    </FieldWrapper>
  )
}
