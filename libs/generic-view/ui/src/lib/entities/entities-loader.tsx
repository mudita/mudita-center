/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { APIFC } from "generic-view/utils"
import { EntitiesLoaderConfig } from "generic-view/models"
import {
  getEntitiesDataAction,
  selectActiveApiDeviceId,
  selectEntitiesLoadingState,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import styled from "styled-components"
import { H3 } from "../texts/headers"
import { ProgressBar } from "../interactive/progress-bar/progress-bar"
import { sum } from "lodash"

export const EntitiesLoader: APIFC<undefined, EntitiesLoaderConfig> = ({
  config,
  data,
  children,
  ...props
}) => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveApiDeviceId)!
  const entitiesLoadingStates = useSelector((state: ReduxRootState) =>
    selectEntitiesLoadingState(state, { deviceId })
  )
  const allLoaded = config.entitiesTypes.every(
    (entitiesType) => entitiesLoadingStates[entitiesType].state === "loaded"
  )
  const [showProgress, setShowProgress] = useState(!allLoaded)
  const [totalProgress, setTotalProgress] = useState(0)

  useEffect(() => {
    const progress: Record<string, number> = {}

    for (const entitiesType of config.entitiesTypes) {
      const entity = entitiesLoadingStates[entitiesType]
      if (entity.state === "idle") {
        progress[entitiesType] = 0
        dispatch(getEntitiesDataAction({ entitiesType, deviceId }))
      } else if (entity.state === "loading" || entity.state === "loaded") {
        progress[entitiesType] = entity.progress
      }
    }
    setTotalProgress(
      sum(Object.values(progress)) / Object.keys(progress).length
    )
  }, [config.entitiesTypes, deviceId, dispatch, entitiesLoadingStates])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (allLoaded) {
      timeout = setTimeout(() => setShowProgress(false), 300)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [allLoaded])

  if (!showProgress) {
    return children
  }
  return (
    <div {...props}>
      {config.text && <H3>{config.text}</H3>}
      <Progress config={{ maxValue: 100 }} data={{ value: totalProgress }} />
    </div>
  )
}

const Progress = styled(ProgressBar)`
  max-width: 22.3rem;
`
