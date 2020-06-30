import styled, { css } from "styled-components"
import { ButtonTogglerItem } from "Renderer/components/core/button-toggler/button-toggler.component"
import InputText from "Renderer/components/core/input-text/input-text.component"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import { FiltersWrapper } from "Renderer/components/rest/messages/topics-table.component"

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const MessagesButtonTogglerItem = styled(ButtonTogglerItem)`
  width: 13.8rem;
`

export const SearchInput = styled(InputText)`
  width: 38rem;
`

export const MessageSelectionManager = styled(SelectionManager)`
  grid-template-columns: 4.8rem 1fr;
  padding: 0 1.6rem;

  button {
    padding: 0.5rem 0.8rem;
  }
`

export const MessageFiltersWrapper = styled(FiltersWrapper)<{
  selectionMode: boolean
}>`
  ${({ selectionMode }) =>
    selectionMode &&
    css`
      grid-template-areas: "Search New";
      grid-template-columns: 1fr auto;
    `}
  padding: 0 4rem;
`
