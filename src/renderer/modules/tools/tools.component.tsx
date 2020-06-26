import React from "react"

import FunctionComponent from "Renderer/types/function-component.interface"
import Notes from "Renderer/modules/tools/tabs/notes.component"
import { exampleData } from "Renderer/modules/tools/tabs/notes.stories"

const Tools: FunctionComponent = () => <Notes data={exampleData} />

export default Tools
