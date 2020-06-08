import { random } from "lodash"
import React, { useEffect, useLayoutEffect, useState } from "react"
import {
  HelpComponentTestIds,
  HelpProps,
} from "Renderer/modules/help/help.interface"
import DevMode from "Renderer/modules/help/devmode/devmode.component"

import FunctionComponent from "Renderer/types/function-component.interface"

const Help: FunctionComponent<HelpProps> = props => {
  const [count, setCount] = useState<number>(0)
  const [cheat, setCheat] = useState<string>("")

  const increaseCount = () => {
    setCount(state => state + 1)
  }

  const getKeyboardInput = ({ key }: KeyboardEvent) => {
    setCheat(current => `${current}${key}`)
  }

  useLayoutEffect(() => {
    setCheat("") // Electron tends to write stuff here for some reason
    window.addEventListener("keyup", getKeyboardInput)

    return () => {
      window.removeEventListener("keyup", getKeyboardInput)
    }
  }, [])

  useEffect(() => {
    if (count >= random(7, 10) || cheat === "godmode") {
      setCheat("")
      setCount(0)

      props.enable()
    }
  }, [count, cheat])

  return (
    <div data-testid={HelpComponentTestIds.Wrapper}>
      Help
      <br />
      <p
        onClick={increaseCount}
        data-testid={HelpComponentTestIds.ToggleButton}
      >
        App Version 1.0.0
      </p>
      {props.devModeEnabled && <DevMode disable={props.disable} />}
    </div>
  )
}

export default Help
