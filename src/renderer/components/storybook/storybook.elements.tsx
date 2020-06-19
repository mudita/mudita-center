import styled from "styled-components"

export const Button = styled.span<{ enabled?: boolean; visible?: boolean }>`
  cursor: pointer;
  display: block;
  visibility: ${({ visible = true }) => (visible ? "initial" : "hidden")};
  opacity: ${({ visible = true }) => (visible ? 1 : 0)};
  width: 2.8rem;
  height: 2.8rem;
  padding: 0.2rem;
  box-sizing: border-box;
  user-select: none;
  transition: background-color 0.15s ease-in-out, opacity 0.25s ease-in-out,
    visibility 0.25s ease-in-out;

  &:hover {
    background-color: #e4e4e4;
  }

  svg {
    width: 100%;
    height: 100%;
    transition: opacity 0.15s ease-in-out;
    opacity: ${({ enabled }) => (enabled ? 1 : 0.3)};
  }
`

export const Heading = styled.h1`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  margin: 0 0 1rem 0;
  user-select: none;
  line-height: 1.2;
  white-space: pre-line;

  // Default storybook font
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular",
    "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
`

export const Wrapper = styled.div`
  margin: 1rem;
`
