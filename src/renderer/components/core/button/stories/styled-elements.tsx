import Button from "Renderer/components/core/button/button.component"
import Text from "Renderer/components/core/text/text.component"
import styled from "styled-components"

export const StoryWrapper = styled.div`
  margin: 1rem;
`

export const ButtonsWidthRow = styled.div`
  display: flex;
  flex-direction: column;
`

export const SectionHeader = styled(Text)`
  text-align: center;
`

export const ButtonsRow = styled.div`
  display: flex;
  flex: 1;
`

export const ButtonsColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border: 0.1rem solid black;
  padding: 1rem;
  margin: 1rem;
`

export const ButtonHeader = styled(Text)`
  margin: 1rem 0;
`

export const ButtonElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const Button100 = styled(Button)`
  width: 100%;
`
