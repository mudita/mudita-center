import { AppHotkeys } from "App/hotkeys/hotkeys.types"
import hotkeys from "App/hotkeys/hotkeys"
import {
  toggleDevMode,
  togglePhoneSimulation,
} from "App/dev-mode/store/dev-mode.helpers"

const registerHotkeys = () => {
  hotkeys.register(AppHotkeys.DevMode, toggleDevMode)
  hotkeys.register(AppHotkeys.PhoneSimulation, togglePhoneSimulation)
}

export default registerHotkeys
