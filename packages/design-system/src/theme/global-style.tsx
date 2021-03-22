import { createGlobalStyle } from "styled-components"
import { theme } from "Theme/theme-provider"
import { color } from "Theme/theme-getters"

export const MuditaGlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  html, body  {
    --scrollbar-width: .2rem;

    background-color: ${color("grey100")};
    font-family: "GT Pressura", "Roboto Condensed", sans-serif;
    /* stylelint-disable unit-allowed-list */
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
  }
  a {
    appearance: none;
    color: ${color("black")};
    text-decoration: none;
  }
  * {
    ::-webkit-scrollbar {
      width: var(--scrollbar-width);
    }
    ::-webkit-scrollbar-track {
      border-radius: var(--scrollbar-width);
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: var(--scrollbar-width);
      background-color: transparent;
    }
    ::-webkit-scrollbar:horizontal {
      height: var(--scrollbar-width);
    }
    ::-webkit-scrollbar-track:horizontal {
      border-radius: var(--scrollbar-width);
      background: transparent;
    }
    ::-webkit-scrollbar-thumb:horizontal {
      border-radius: var(--scrollbar-width);
      background-color: transparent;
    }
    /* stylelint-disable no-descending-specificity */
    :hover, :focus {
      ::-webkit-scrollbar-thumb {
        background-color: ${color("grey600")};
      }
      ::-webkit-scrollbar-thumb:horizontal {
        background-color: ${color("grey600")};
      }
    }
    /* stylelint-enable no-descending-specificity */
  }
`
