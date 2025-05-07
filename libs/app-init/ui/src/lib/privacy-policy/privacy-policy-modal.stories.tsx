/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { PrivacyPolicyModal } from "./privacy-policy-modal"

const Decorator = styled.div`
  width: 100%;
  height: 100%;

  .ReactModalPortal {
    width: 100%;
    height: 100%;
  }

  .ReactModal__Overlay {
    width: 100%;
    height: 100%;
    position: relative !important;
    padding: 2rem !important;
    box-sizing: border-box !important;
  }
`

const meta: Meta<typeof PrivacyPolicyModal> = {
  title: "App/Modals",
  component: PrivacyPolicyModal,
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator"}>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof PrivacyPolicyModal>

export const Default: Story = {
  name: "Privacy Policy Acceptance",
  argTypes: {
    opened: storybookHelper
      .assignCategory("Functional")
      .addDescription("Decides whether the modal is opened or closed.")
      .apply(),
    onClose: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines an action that is triggered when the modal is closed."
      )
      .apply(),
    onAccept: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines an action that is triggered when the modal is accepted."
      )
      .apply(),
  },
  args: {
    opened: true,
  },
}
