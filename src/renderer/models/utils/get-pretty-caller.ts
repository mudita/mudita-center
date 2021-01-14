import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/store/phone.helpers"
import { Caller } from "Renderer/models/calls/calls.interface"

const getPrettyCaller = (caller: Caller): string => {
  return isNameAvailable(caller) ? createFullName(caller) : caller.phoneNumber
}

export default getPrettyCaller
