/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { PasswordFieldTestIds } from "Core/ui/components/password-field/password-field-test-ids.enum"
import {
  FieldWrapper,
  FormInput,
  IconWrapper,
} from "Core/ui/components/password-field/password-field.styled"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

interface PasswordFieldProps {
  errorMessage?: string
  showPassword?: boolean
  label: {
    id: string
  }
  relativeError?: boolean
}

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(({ label, errorMessage, showPassword = true, ...props }, ref) => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleToggleInputType = () => {
    setVisible(!visible)
  }

  return (
    <FieldWrapper>
      <FormInput
        data-testid={PasswordFieldTestIds.Input}
        type={visible ? "text" : "password"}
        errorMessage={errorMessage}
        label={intl.formatMessage(label)}
        ref={ref}
        {...props}
      />
      {showPassword && (
        <IconWrapper
          data-testid={PasswordFieldTestIds.VisibilityButton}
          onClick={handleToggleInputType}
        >
          <Icon
            size={IconSize.Bigger}
            type={visible ? IconType.Hidden : IconType.Visible}
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
})
