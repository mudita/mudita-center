import React from "react"

import FunctionComponent from "Renderer/types/function-component.interface"
import Notes from "Renderer/modules/tools/tabs/notes.component"
import { exampleData } from "App/__mocks__/notes"

const Tools: FunctionComponent = () => <Notes data={exampleData} />

export default Tools
