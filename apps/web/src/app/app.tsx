/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppRoutes } from "app-routing/routes"
import { useDevicesListener } from "devices/common/feature"

export function App() {
  useDevicesListener()
  // const dispatch = useDispatch()
  // useSql()
  //
  // const connectedDevices = useSelector(selectConnectedDevices)
  // const currentDevice = useSelector(selectCurrentDevice)
  //
  // const handleSelect = useCallback(
  //   (device: SerialPortDeviceInfo) => {
  //     dispatch(setCurrentDevice(device.path))
  //   },
  //   [dispatch]
  // )
  //
  // const handleApiConfigurationCall = useCallback(async () => {
  //   if (ApiDeviceSerialPort.isCompatible(currentDevice)) {
  //     const response = await getApiConfig(currentDevice)
  //
  //     if (response.ok) {
  //       console.log(response.body)
  //     } else {
  //       console.warn(response.status, response.body, response.error)
  //     }
  //   }
  // }, [currentDevice])
  //
  // const handleMenuConfigurationCall = useCallback(async () => {
  //   if (ApiDeviceSerialPort.isCompatible(currentDevice)) {
  //     const response = await getMenuConfig(currentDevice)
  //
  //     if (response.ok) {
  //       console.log(response.body)
  //     } else {
  //       console.warn(response.status, response.body, response.error)
  //     }
  //   }
  // }, [currentDevice])

  return <AppRoutes />
}

export default App
