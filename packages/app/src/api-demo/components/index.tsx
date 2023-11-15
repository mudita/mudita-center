import React, { ComponentProps, FunctionComponent, PropsWithChildren } from "react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import { Exact } from "../output/overview-output"
import { genericComponents } from "./generic"
import { predefinedComponents } from "./predefined"
import { blocks } from "./blocks"

export const components = {
  ...genericComponents,
  ...predefinedComponents,
  ...blocks
}

interface RecursiveComponentProperties<K extends keyof Components = keyof Components> extends PropsWithChildren {
  componentKey: string
  component: K
  parameters?: Exact<Omit<ComponentProps<Components[K]>, "children" | "data">>
  childrenKeys?: string[]
}

export const RecursiveLayout = ({
                                  componentKey,
                                  component,
                                  parameters,
                                  childrenKeys,
                                }: RecursiveComponentProperties) => {
  const { layout } = useSelector((state: ReduxRootState) => state.generic)
  const Component = components[component] as FunctionComponent<typeof parameters>

  return <Component {...parameters}>
    {childrenKeys?.map(key => {
      const item = layout[key]
      return <RecursiveLayout key={key} componentKey={key} {...item} />
    })}
  </Component>
}

export type Components = typeof components
