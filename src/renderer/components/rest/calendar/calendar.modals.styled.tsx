import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import { textColor } from "Renderer/styles/theming/theme-getters"
import UpdateButtonComponent from "Renderer/components/rest/news/update-button/update-button.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  strong {
    color: ${textColor("primary")};
  }
`

export const ModalSubText = styled(Text)`
  margin-top: 4.8rem;
  margin-bottom: 1.6rem;
`

export const RefreshButton = styled(UpdateButtonComponent)`
  width: 17rem;
`

export const EventsText = styled(ModalText)`
  width: 23rem;
`
