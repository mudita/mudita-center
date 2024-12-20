/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"
import { AppSerialPort } from "app-serialport/renderer"
import { ChangedDevices } from "app-serialport/models"
import { isEmpty } from "lodash"

export const useSerialPortListener = () => {
  // const interval = useRef<NodeJS.Timeout>()
  const ref = useRef(false)

  const listenPorts = useCallback(async () => {
    if (!ref.current) {
      ref.current = true
      const onAttach = async (added: NonNullable<ChangedDevices["added"]>) => {
        const apiConfigurationResponse = await AppSerialPort.write(added.path, {
          endpoint: "API_CONFIGURATION",
          method: "GET",
          body: {},
          options: {
            connectionTimeOut: 30000,
          },
        })
        const entitiesConfigurationResponse = await AppSerialPort.write(
          added.path,
          {
            endpoint: "ENTITIES_CONFIGURATION",
            method: "GET",
            body: {
              entityType: "contacts",
            },
            options: {
              connectionTimeOut: 30000,
            },
          }
        )
        console.log({ apiConfigurationResponse, entitiesConfigurationResponse })
      }
      AppSerialPort.onChange((changes) => {
        console.log(changes)
        if (!isEmpty(changes.added)) {
          void onAttach(changes.added)
        }
      })
    }

    // const req1 = () =>
    //   AppSerialPort.write(ports[0].path, {
    //     endpoint: "API_CONFIGURATION",
    //     method: "GET",
    //     body: {},
    //     options: {
    //       connectionTimeOut: 30000,
    //     },
    //   })

    // const req2 = () =>
    //   AppSerialPort.write(ports[0].path, {
    //     endpoint: "ENTITIES_CONFIGURATION",
    //     method: "GET",
    //     body: {
    //       entityType: "contacts",
    //     },
    //     options: {
    //       connectionTimeOut: 30000,
    //     },
    //   })

    // await AppSerialPort.write(ports[0].path, {
    //   endpoint: "API_CONFIGURATION",
    //   method: "GET",
    //   body: {},
    //   options: {
    //     connectionTimeOut: 30000,
    //   },
    // })
    // await new Promise((resolve) => setTimeout(resolve, 100))
    // await AppSerialPort.write(ports[0].path, {
    //   endpoint: "ENTITIES_CONFIGURATION",
    //   method: "GET",
    //   body: {
    //     entityType: "contacts",
    //   },
    //   options: {
    //     connectionTimeOut: 30000,
    //   },
    // })
    // await new Promise((resolve) => setTimeout(resolve, 100))
    // void AppSerialPort.write(ports[0].path, {
    //   endpoint: "ENTITIES_DATA",
    //   method: "GET",
    //   body: {
    //     entityType: "contacts",
    //     responseType: "json",
    //   },
    //   options: {
    //     connectionTimeOut: 30000,
    //   },
    // })
    // await new Promise((resolve) => setTimeout(resolve, 100))
    // await AppSerialPort.write(ports[0].path, {
    //   endpoint: "ENTITIES_CONFIGURATION",
    //   method: "GET",
    //   body: {
    //     entityType: "contacts",
    //   },
    //   options: {
    //     connectionTimeOut: 30000,
    //   },
    // })

    Promise.all([
      // AppSerialPort.write(ports[0].path, {
      //   endpoint: "API_CONFIGURATION",
      //   method: "GET",
      //   body: {},
      //   options: {
      //     connectionTimeOut: 30000,
      //   },
      // }),
      // AppSerialPort.write(ports[0].path, {
      //   endpoint: "ENTITIES_CONFIGURATION",
      //   method: "GET",
      //   body: {
      //     entityType: "contacts",
      //   },
      //   options: {
      //     connectionTimeOut: 30000,
      //   },
      // }),
      // AppSerialPort.write(ports[0].path, {
      //   endpoint: "ENTITIES_DATA",
      //   method: "GET",
      //   body: {
      //     entityType: "contacts",
      //     responseType: "json",
      //   },
      //   options: {
      //     connectionTimeOut: 30000,
      //   },
      // }),
    ]).then((resp) => {
      console.log(resp)
    })
  }, [])

  useEffect(() => {
    void listenPorts()
    // interval.current = setInterval(listenPorts, 2000)
    // return () => clearInterval(interval.current)
  }, [listenPorts])
}
