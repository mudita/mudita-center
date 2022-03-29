/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { intl } from "Renderer/utils/intl"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { Template } from "App/templates/store/templates.interface"
import { defineMessages } from "react-intl"
import { TemplatesTestIds } from "App/templates/components/templates/templates.enum"
import { IconType } from "Renderer/components/core/icon/icon-type"

export const messages = defineMessages({
  searchPlaceholder: {
    id: "module.templates.searchPlaceholder",
  },
  selectionsNumber: {
    id: "module.templates.selectionsNumber",
  },
  newButton: {
    id: "module.templates.newButton",
  },
  deleteButton: {
    id: "module.templates.deleteButton",
  },
})

const Panel = styled.div<{ selectionMode?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 38rem 1fr;
  padding: 3.2rem 3rem 3.2rem 4rem;
  background-color: ${backgroundColor("main")};

  label {
    width: auto;
  }

  ${({ selectionMode }) =>
    selectionMode &&
    css`
      padding-left: 0.6rem;
      grid-column-gap: 4rem;
      grid-template-columns: 1fr auto;
    `}
`

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(17rem, 1fr);
  grid-column-gap: 1.6rem;
  justify-self: end;

  button {
    width: auto;
  }
`

const TemplatesSelectionManager = styled(SelectionManager)`
  grid-template-columns: 3.2rem 1fr auto;

  button {
    padding: 0 0.8rem;
  }
`

export interface TemplatesTopPanelProps {
  onSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void
  onNewButtonClick: () => void
  onDeleteButtonClick: () => void
  selectedItemsCount: number
  allItemsSelected?: boolean
  toggleAll: UseTableSelect<Template>["toggleAll"]
  newButtonDisabled?: boolean
}

const TemplatesPanel: FunctionComponent<TemplatesTopPanelProps> = ({
  onSearchTermChange,
  onNewButtonClick,
  onDeleteButtonClick,
  selectedItemsCount,
  allItemsSelected,
  toggleAll,
  newButtonDisabled,
}) => {
  const selectionMode = selectedItemsCount > 0
  return (
    <Panel selectionMode={selectionMode}>
      {selectionMode ? (
        <TemplatesSelectionManager
          selectedItemsNumber={selectedItemsCount}
          allItemsSelected={allItemsSelected}
          message={messages.selectionsNumber}
          checkboxSize={Size.Small}
          onToggle={toggleAll}
          buttons={[
            <ButtonComponent
              key="delete"
              labelMessage={messages.deleteButton}
              displayStyle={DisplayStyle.Link}
              Icon={IconType.Delete}
              onClick={onDeleteButtonClick}
            />,
          ]}
        />
      ) : (
        <InputComponent
          leadingIcons={[<Icon type={IconType.Magnifier} key={1} />]}
          label={intl.formatMessage(messages.searchPlaceholder)}
          onChange={onSearchTermChange}
          type="search"
          outlined
        />
      )}
      <Buttons>
        <ButtonComponent
          Icon={IconType.PlusSign}
          labelMessage={messages.newButton}
          onClick={onNewButtonClick}
          data-testid={TemplatesTestIds.AddTemplateButton}
          disabled={newButtonDisabled}
        />
      </Buttons>
    </Panel>
  )
}

export default TemplatesPanel
