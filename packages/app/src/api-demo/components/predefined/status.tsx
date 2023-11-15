import React, { FunctionComponent } from "react"

interface Field {

}

interface DeviceStatusProperties {
  fields?: Field[]
}

export const DeviceStatus: FunctionComponent<DeviceStatusProperties> = ({}) => {
  return <div>
    <h1>Status</h1>
  </div>
}
