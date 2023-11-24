import { ComponentProps } from "react"
import { OverviewConfig } from "../input/input-config"
import { Components } from "../components"

export type Exact<T> = {
  [P in keyof T]: T[P]
}

export type ComponentPropsByName<C extends keyof Components> = Pick<
  ComponentProps<Components[C]>,
  "parameters"
> & {
  component: C
  // parameters?: Exact<
  //   Omit<ComponentProps<Components[C]>, "children" | "data" | "className">
  // >
  // parameters?: Exact<Pick<ComponentProps<Components[C]>, "parameters">>
  childrenKeys?: string[]
}

// export type ComponentPropsByName<C extends keyof Components> = C extends string
//   ? Pick<ComponentProps<Components[C]>, "parameters"> & {
//       component: C
//       // parameters?: Exact<
//       //   Omit<ComponentProps<Components[C]>, "children" | "data" | "className">
//       // >
//       // parameters?: Exact<Pick<ComponentProps<Components[C]>, "parameters">>
//       childrenKeys?: string[]
//     }
//   : never

type Component<K extends keyof Components = keyof Components> =
  ComponentPropsByName<K>

export type View = {
  main: Component
  [key: string]: Component
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
