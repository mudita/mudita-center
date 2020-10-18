import registerConnectDeviceEmitter from "Backend/emiiters/register-connect-device.emitter"

const registerPureNodeDataListener = (pureNode: any) => {
  pureNode.on("data", registerConnectDeviceEmitter)
}

export default registerPureNodeDataListener
