import React, {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
} from "react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import { ComponentPropsByName, Exact } from "../output/overview-output"
import { layoutComponents } from "./layout/layout-components"
import { predefinedComponents } from "./predefined"
import { blocks } from "./blocks/blocks"
import { rows } from "./data-rows/data-rows"
import { APIFC } from "../models/api-fc"

export const components = {
  ...layoutComponents,
  ...predefinedComponents,
  ...blocks,
  ...rows,
}

// interface RecursiveComponentProperties<
//   K extends keyof Components = keyof Components
// > extends PropsWithChildren {
//   componentKey: string
//   component: K
//   // parameters?: Exact<Omit<ComponentProps<Components[K]>, "children" | "data">>
//   childrenKeys?: string[]
// }

type RecursiveComponentProperties<
  K extends keyof Components = keyof Components
> = ComponentPropsByName<K> & { componentKey: string }

export const RecursiveLayout = ({
  componentKey,
  component,
  parameters,
  childrenKeys,
}: RecursiveComponentProperties) => {
  const { layout } = useSelector((state: ReduxRootState) => state.generic)
  const Component = components[component] as APIFC<typeof parameters>

  // console.log()

  //   return <div>asd</div>
  return (
    <Component parameters={parameters}>
      {childrenKeys?.map((key) => {
        const item = layout[key]
        return <RecursiveLayout key={key} componentKey={key} {...item} />
      })}
    </Component>
  )
}

export type Components = typeof components
