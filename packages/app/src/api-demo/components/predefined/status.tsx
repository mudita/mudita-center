import { APIFC } from "App/api-demo/models/api-fc"
import React, { FunctionComponent } from "react"

interface Field {}

interface DeviceStatusProperties {
  fields?: Field[]
}

export const DeviceStatus: APIFC<DeviceStatusProperties> = ({}) => {
  return (
    <div>
      <h1>Status</h1>
    </div>
  )
}
