import { DevMode } from "Renderer/models/dev-mode/dev-mode.interface"

export enum HelpComponentTestIds {
  Wrapper = "help-component-wrapper",
  ToggleButton = "help-component-toggle-button",
}

export interface HelpProps extends DevMode {
  enable: () => void
  disable: () => void
}
