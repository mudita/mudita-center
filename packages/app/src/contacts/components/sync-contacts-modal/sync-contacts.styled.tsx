import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import Button from "Renderer/components/core/button/button.component"

export const ModalText = styled(Text)`
  text-align: center;
  margin-top: 1.2rem;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 4.8rem;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  button:first-child {
    margin-bottom: 1.6rem;
  }
`

export const SyncButton = styled(Button)`
  width: 24.4rem;
`
