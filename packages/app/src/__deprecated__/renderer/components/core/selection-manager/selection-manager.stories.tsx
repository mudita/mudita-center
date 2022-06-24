/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React from "react"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import SelectionManager from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"
import styled, { css } from "styled-components"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export const deleteButton = (
  <ButtonComponent
    key="delete"
    label={"Delete"}
    displayStyle={DisplayStyle.Link}
    Icon={IconType.Delete}
    data-testid="button"
    onClick={action("delete")}
  />
)

export const exportButton = (
  <ButtonComponent
    key="export"
    label={"Export"}
    displayStyle={DisplayStyle.Link}
    Icon={IconType.Upload}
    data-testid="button"
    onClick={action("export")}
  />
)

const storyStyles = css`
  main > * {
    width: 45rem;
  }
`

const CustomSelectionManager = styled(SelectionManager)`
  grid-template-columns: 4.2rem 1fr auto;
`

storiesOf("Components|Core/Selection Manager", module).add("Default", () => {
  return (
    <>
      <StoryContainer title="States" column customStyle={storyStyles}>
        <Story title="Few items selected">
          <SelectionManager
            message={{
              id: "module.messages.conversationsSelectionsNumber",
            }}
            selectedItemsNumber={5}
          />
        </Story>
        <Story title="All items selected">
          <SelectionManager
            message={{
              id: "module.messages.conversationsSelectionsNumber",
            }}
            selectedItemsNumber={5}
            allItemsSelected
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers" column customStyle={storyStyles}>
        <Story title="With button">
          <SelectionManager
            message={{
              id: "module.messages.conversationsSelectionsNumber",
            }}
            selectedItemsNumber={5}
            buttons={[deleteButton]}
          />
        </Story>
        <Story title="With two buttons">
          <SelectionManager
            message={{
              id: "module.messages.conversationsSelectionsNumber",
            }}
            selectedItemsNumber={5}
            buttons={[exportButton, deleteButton]}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Customizations" column customStyle={storyStyles}>
        <Story title="Styling">
          <CustomSelectionManager
            message={{
              id: "module.messages.conversationsSelectionsNumber",
            }}
            selectedItemsNumber={5}
          />
        </Story>
        <Story title="Checkbox size (small)">
          <SelectionManager
            message={{
              id: "module.messages.conversationsSelectionsNumber",
            }}
            selectedItemsNumber={5}
            checkboxSize={Size.Small}
          />
        </Story>
        <Story title="Checkbox size (medium)">
          <SelectionManager
            message={{
              id: "module.messages.conversationsSelectionsNumber",
            }}
            selectedItemsNumber={5}
            checkboxSize={Size.Medium}
          />
        </Story>
      </StoryContainer>
    </>
  )
})
