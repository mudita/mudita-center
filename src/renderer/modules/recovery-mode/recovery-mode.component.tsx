import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { OptionBox } from "Renderer/components/rest/recovery-mode/recovery-mode.styled"
import { Link } from "react-router-dom"
import { URL_MAIN } from "Renderer/constants/urls"

const RecoveryMode: FunctionComponent<{}> = () => (
  <div>
    <Link to={URL_MAIN.messages}>
      <OptionBox />
    </Link>
  </div>
)

export default RecoveryMode
