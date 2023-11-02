import React from "react"
import PureSystem from "App/overview/components/pure-system/pure-system.component"

export default {
  title: "Views|Overview/PureSystem",
}

export const _PureSystem = () => {
  return <PureSystem serialNumber={"247"} />
}

_PureSystem.story = {
  name: "PureSystem",
}
