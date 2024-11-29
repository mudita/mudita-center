/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactElement, useMemo } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectComponentConfig } from "generic-view/store"
import { ComponentPropsByName } from "generic-view/utils"

interface Props {
  children: (props: {
    config: ComponentPropsByName["config"] | undefined
  }) => ReactElement
  viewKey: string
  componentKey: string
}

export const ComponentWithConfig: FunctionComponent<Props> = ({
  children,
  viewKey,
  componentKey,
}) => {
  const config = useSelector((state: ReduxRootState) => {
    return selectComponentConfig(state, { viewKey, componentKey })
  })
  const configDependency = JSON.stringify(config)

  return useMemo(() => {
    return children({ config })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configDependency, viewKey, componentKey])
}
