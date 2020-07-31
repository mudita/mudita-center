import Help from "Renderer/modules/help/help.component"
import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { helpSeed } from "App/seeds/help"

const HelpWrapper: FunctionComponent<{}> = () => <Help list={helpSeed.list} />

export default HelpWrapper
