/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import { APIComponents } from "App/api-demo/models/api-components.types"
import { OverviewConfig } from "../input/input-config"

export type ComponentPropsByName<
  C extends keyof APIComponents = keyof APIComponents
> = Pick<ComponentProps<APIComponents[C]>, "parameters"> & {
  component: C
  childrenKeys?: string[]
}

export type View = {
  main: ComponentPropsByName
  [key: string]: ComponentPropsByName
}

type ViewGenerator<Config> = (config: Config) => View

export const generateOverviewLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  return {
    main: {
      component: "grid",
      parameters: {
        layout: {
          rows: [1, 1, 1],
          columns: [1, 2],
        },
        options: {
          fillParentHeight: true,
        },
      },
      childrenKeys: ["summary", "status"],
    },
    summary: {
      component: "grid-item",
      parameters: {
        placement: {
          row: 1,
          column: 1,
          width: 1,
          height: 3,
        },
      },
      childrenKeys: ["about-button"],
    },
    "about-button": {
      component: "device-about-button",
      parameters: {
        buttonLabel: "asdf",
        modalContent: "2134234",
      },
    },
    status: {
      component: "grid-item",
      parameters: {
        placement: {
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
      },
      childrenKeys: ["device-status"],
    },
    "device-status": {
      component: "block-box",
      parameters: {},
      childrenKeys: ["battery-status", "imei1", "imei2"],
    },
    "battery-status": {
      component: "icon-text-row",
      parameters: {
        icon: "asd",
        text: "text - asads",
      },
    },
    imei1: {
      component: "icon-text-row",
      parameters: {
        icon: "asd",
        text: "text - asads",
      },
    },
    imei2: {
      component: "icon-text-row",
      parameters: {
        icon: "asd",
        text: "text - asads",
      },
    },
  }
}

type DataGenerator<Data> = (data: Data) => Record<string, unknown>

export const generateOverviewData: DataGenerator<OverviewConfig> = (data) => {
  return {}
}
