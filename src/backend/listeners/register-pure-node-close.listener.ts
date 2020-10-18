import registerDisconnectDeviceEmitter from "Backend/emiiters/register-disconnect-device.emitter"

const registerPureNodeCloseListener = (pureNode: any) => {
  pureNode.on("close", registerDisconnectDeviceEmitter)
}

export default registerPureNodeCloseListener
