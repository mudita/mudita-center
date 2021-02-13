import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

export const DataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor("row")};
  height: 15.3rem;
  width: 27.5rem;
`

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const TextWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 0.8rem;

  span:nth-child(even):not(:last-of-type) {
    margin-right: 0.8rem;
  }
`
