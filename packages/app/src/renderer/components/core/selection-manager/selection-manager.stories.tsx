/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import styled, { css } from "styled-components"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

export const deleteButton = (
  <ButtonComponent
    key="delete"
    label={"Delete"}
    displayStyle={DisplayStyle.Link1}
    Icon={Type.Delete}
    data-testid="button"
    onClick={action("delete")}
  />
)

export const exportButton = (
  <ButtonComponent
    key="export"
    label={"Export"}
    displayStyle={DisplayStyle.Link1}
    Icon={Type.Upload}
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
              id: "view.name.messages.conversations.selectionsNumber",
            }}
            selectedItemsNumber={5}
          />
        </Story>
        <Story title="All items selected">
          <SelectionManager
            message={{
              id: "view.name.messages.conversations.selectionsNumber",
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
              id: "view.name.messages.conversations.selectionsNumber",
            }}
            selectedItemsNumber={5}
            buttons={[deleteButton]}
          />
        </Story>
        <Story title="With two buttons">
          <SelectionManager
            message={{
              id: "view.name.messages.conversations.selectionsNumber",
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
              id: "view.name.messages.conversations.selectionsNumber",
            }}
            selectedItemsNumber={5}
          />
        </Story>
        <Story title="Checkbox size (small)">
          <SelectionManager
            message={{
              id: "view.name.messages.conversations.selectionsNumber",
            }}
            selectedItemsNumber={5}
            checkboxSize={Size.Small}
          />
        </Story>
        <Story title="Checkbox size (medium)">
          <SelectionManager
            message={{
              id: "view.name.messages.conversations.selectionsNumber",
            }}
            selectedItemsNumber={5}
            checkboxSize={Size.Medium}
          />
        </Story>
      </StoryContainer>
    </>
  )
})
