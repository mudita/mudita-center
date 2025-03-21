/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { sum } from "lodash"
import { APIFC } from "generic-view/utils"
import { EntitiesLoaderConfig } from "generic-view/models"
import {
  getEntitiesConfigAction,
  getEntitiesDataAction,
  getEntitiesMetadataAction,
  selectActiveApiDeviceId,
  selectEntitiesLoadingState,
  selectIsSomeLoadEntitiesCanceled,
} from "generic-view/store"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Typography } from "../typography"
import { ProgressBar } from "../interactive/progress-bar/progress-bar"

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
  const someLoadEntitiesCanceled = useSelector((state: ReduxRootState) =>
    selectIsSomeLoadEntitiesCanceled(state, {
      deviceId,
      entityTypes: config.entityTypes,
    })
  )
  const allLoaded = config.entityTypes.every(
    (entitiesType) => entitiesLoadingStates[entitiesType]?.state === "loaded"
  )
  const [showProgress, setShowProgress] = useState(!allLoaded)
  const [totalProgress, setTotalProgress] = useState(0)

  const fetchEntityData = useCallback(
    async (entitiesType: string) => {
      await dispatch(getEntitiesConfigAction({ deviceId, entitiesType }))
      await dispatch(getEntitiesMetadataAction({ entitiesType, deviceId }))
      await dispatch(getEntitiesDataAction({ entitiesType, deviceId }))
    },
    [dispatch, deviceId]
  )

  const fetchEntitiesData = useCallback(async () => {
    void config.entityTypes.reduce(async (promise, entityType) => {
      await promise
      return fetchEntityData(entityType)
    }, Promise.resolve())
  }, [config.entityTypes, fetchEntityData])

  const fetchPostCancelTriggered = React.useRef(false)

  useEffect(() => {
    if (someLoadEntitiesCanceled && !fetchPostCancelTriggered.current) {
      fetchPostCancelTriggered.current = true
      void fetchEntitiesData()
    }
  }, [fetchEntitiesData, someLoadEntitiesCanceled])

  useEffect(() => {
    const progress = config.entityTypes.reduce((acc, entityType) => {
      acc[entityType] = 0
      const entity = entitiesLoadingStates[entityType]
      if (entity?.state === "loading" || entity?.state === "loaded") {
        acc[entityType] = entity.progress
      }
      return acc
    }, {} as Record<string, number>)

    const totalProgress =
      Object.keys(progress).length > 0
        ? Math.round(
            sum(Object.values(progress)) / Object.keys(progress).length
          )
        : 0
    setTotalProgress(totalProgress)
  }, [config.entityTypes, dispatch, entitiesLoadingStates])

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
      {config.text && <Typography.H3 config={config} />}
      <Progress config={{ maxValue: 100 }} data={{ value: totalProgress }} />
    </div>
  )
}

const Progress = styled(ProgressBar)`
  max-width: 22.3rem;
`
