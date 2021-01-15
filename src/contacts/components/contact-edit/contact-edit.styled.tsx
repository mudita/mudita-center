import styled, { css } from "styled-components"
import { ListItem } from "Renderer/components/core/list/list.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import { Sidebar } from "Renderer/components/core/table/table.component"

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.8rem;

  > div {
    width: calc(50% - 3.2rem);
  }

  select {
    height: 1.8rem;
    margin-top: 3.8rem;
    margin-bottom: 0.7rem;
  }
`
export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  grid-column-gap: 1.6rem;
  width: fit-content;
  margin: 4.8rem 0 1rem auto;

  button {
    width: auto;
  }
`
export const Input = styled(InputComponent)<InputComponentProps>`
  margin-top: 1.8rem;

  input {
    font-weight: ${fontWeight("default")};
  }
`
export const SpeedDialListItem = styled(ListItem)<{
  inactive?: boolean
}>`
  ${({ inactive }) =>
    inactive &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`
export const SpeedDialSettings = styled(ButtonComponent)`
  padding: 0.9rem;
  height: auto;
  width: auto;
`
export const SpeedDial = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.8rem;

  label {
    width: 8.5rem;
  }
`
export const speedDialListStyles = css`
  li {
    padding-left: 0.8rem;
  }
`
export const ContactDetailsWrapper = styled(Sidebar)`
  margin-top: 6.3rem;
`
export const CustomCheckbox = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3.3rem;
  padding-bottom: 1.4rem;
  cursor: pointer;

  p {
    margin: 0 0.8rem 0 1.2rem;
    text-transform: initial;
  }
`
