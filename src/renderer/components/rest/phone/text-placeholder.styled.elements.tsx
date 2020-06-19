import styled from "styled-components"
import {
  backgroundColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"

export const TextPlaceholder = styled.span<{ charsCount: number }>`
  display: block;
  background-color: ${backgroundColor("accent")};
  height: 1em;
  border-radius: ${borderRadius("medium")};
  width: ${({ charsCount }) => charsCount * 0.6}rem;
  min-width: 5rem;
`
