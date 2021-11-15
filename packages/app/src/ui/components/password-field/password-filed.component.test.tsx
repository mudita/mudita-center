/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { PasswordField } from "App/ui/components/password-field/password-filed.component"
import { PasswordFieldTestIds } from "App/ui/components/password-field/password-field-test-ids.enum"

const renderPasswordField = (props: ComponentProps<typeof PasswordField>) =>
  renderWithThemeAndIntl(<PasswordField {...props} />)

test("renders provided label", () => {
  const { getByTestId } = renderPasswordField({
    label: { id: "module.overview.backupSetSecretKeyModalInputLabel" },
  })

  expect(getByTestId(PasswordFieldTestIds.Label)).toHaveTextContent(
    "[value] module.overview.backupSetSecretKeyModalInputLabel"
  )
})

test("disable show/hide password functionality", () => {
  const { queryByTestId } = renderPasswordField({
    label: { id: "module.overview.backupSetSecretKeyModalInputLabel" },
    showPassword: false,
  })

  expect(
    queryByTestId(PasswordFieldTestIds.VisibleIcon)
  ).not.toBeInTheDocument()
  expect(queryByTestId(PasswordFieldTestIds.HiddenIcon)).not.toBeInTheDocument()
})

test("changing input type on visibility icon click", () => {
  const { getByTestId } = renderPasswordField({
    label: { id: "module.overview.backupSetSecretKeyModalInputLabel" },
  })
  const visibilityButton = getByTestId(PasswordFieldTestIds.VisibilityButton)

  expect(getByTestId(PasswordFieldTestIds.Input)).toHaveProperty(
    "type",
    "password"
  )
  expect(getByTestId(PasswordFieldTestIds.HiddenIcon)).toBeInTheDocument()

  fireEvent.click(visibilityButton)

  expect(getByTestId(PasswordFieldTestIds.Input)).toHaveProperty("type", "text")
  expect(getByTestId(PasswordFieldTestIds.VisibleIcon)).toBeInTheDocument()
})
