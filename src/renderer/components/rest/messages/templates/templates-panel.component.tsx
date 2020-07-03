import React, { ChangeEvent } from "react"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { intl } from "Renderer/utils/intl"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon from "Renderer/components/core/icon/icon.component"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { Template } from "App/renderer/modules/messages/tabs/templates-ui.component"
import { defineMessages } from "react-intl"

export const messages = defineMessages({
  searchPlaceholder: {
    id: "view.name.messages.templates.searchPlaceholder",
  },
  selectionsNumber: {
    id: "view.name.messages.templates.selectionsNumber",
  },
  newButton: {
    id: "view.name.messages.templates.newButton",
  },
  deleteButton: {
    id: "view.name.messages.templates.deleteButton",
  },
})

const Panel = styled.div<{ selectionMode?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 38rem 1fr;
  padding: 3.2rem 3rem 3.2rem 4rem;
  background-color: ${backgroundColor("main")};
  border-bottom: solid 0.1rem ${borderColor("list")};

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
    padding: 0.5rem 0.8rem;
  }
`

export interface TemplatesTopPanelProps {
  onSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void
  onNewButtonClick: () => void
  onDeleteButtonClick: () => void
  selectedItemsCount: number
  allItemsSelected?: boolean
  toggleAll: UseTableSelect<Template>["toggleAll"]
}

const TemplatesPanel: FunctionComponent<TemplatesTopPanelProps> = ({
  onSearchTermChange,
  onNewButtonClick,
  onDeleteButtonClick,
  selectedItemsCount,
  allItemsSelected,
  toggleAll,
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
              label={intl.formatMessage(messages.deleteButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Delete}
              onClick={onDeleteButtonClick}
            />,
          ]}
        />
      ) : (
        <InputComponent
          leadingIcons={[<Icon type={Type.Magnifier} key={1} />]}
          label={intl.formatMessage(messages.searchPlaceholder)}
          onChange={onSearchTermChange}
          type="search"
          outlined
        />
      )}
      <Buttons>
        <ButtonComponent
          Icon={Type.PlusSign}
          labelMessage={messages.newButton}
          onClick={onNewButtonClick}
        />
      </Buttons>
    </Panel>
  )
}

export default TemplatesPanel
