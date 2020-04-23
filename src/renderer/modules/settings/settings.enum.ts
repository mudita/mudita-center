export enum ToggleState {
  On = "view.name.settings.onLabel",
  Off = "view.name.settings.offLabel",
}

export const twoStateToggler = [ToggleState.Off, ToggleState.On] as const
