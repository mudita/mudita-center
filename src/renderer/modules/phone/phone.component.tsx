import React, { ChangeEvent } from "react"
import { InitialContactList } from "Renderer/models/phone/phone.interface"
import { dispatch } from "Renderer/store"
import FunctionComponent from "Renderer/types/function-component.interface"

const Phone: FunctionComponent<InitialContactList> = ({
  grouped,
  contactList,
}) => {
  console.log(grouped)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "phoneView/handleInput", payload: event.target.value })
  }
  return (
    <div>
      <input type="text" onChange={onChange} />
      <pre>{JSON.stringify(grouped, null, 2)}</pre>
    </div>
  )
}

export default Phone
