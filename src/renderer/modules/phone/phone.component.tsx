import React from "react"

import FunctionComponent from "Renderer/types/function-component.interface"

const Phone: FunctionComponent = props => {
  console.log(props)
  return <div>Phone</div>
}

export default Phone
