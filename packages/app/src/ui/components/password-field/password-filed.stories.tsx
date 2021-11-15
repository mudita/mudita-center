/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Meta } from "@storybook/react"
import { PasswordField } from "App/ui/components/password-field/password-filed.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import { css } from "styled-components"
import { Story as StoryInterface } from "@storybook/react"

const storyContainerStyle = css`
  main > * {
    height: 20.5rem;
    width: 62rem;
  }
`

type Props = ComponentProps<typeof PasswordField> & { storyTitle: string }

const Template: StoryInterface<Props> = (args) => {
  return (
    <StoryContainer column customStyle={storyContainerStyle}>
      <Story title={args.storyTitle} transparentMode>
        <PasswordField label={args.label} errorMessage={args.errorMessage} />
      </Story>
    </StoryContainer>
  )
}

export const DefaultPasswordField = Template.bind({})
DefaultPasswordField.args = {
  label: { id: "password" },
}

export const ErrorPasswordField = Template.bind({})
ErrorPasswordField.args = {
  label: { id: "password" },
  errorMessage: "Passwords doesn't match",
}

export default {
  title: "UI|Input/Password",
  component: PasswordField,
} as Meta
