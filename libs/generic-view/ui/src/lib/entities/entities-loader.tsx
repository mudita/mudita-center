/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { APIFC } from "generic-view/utils"
import { EntitiesLoaderConfig } from "generic-view/models"
import {
  getEntitiesDataAction,
  selectActiveApiDeviceId,
  selectEntitiesLoadingState,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { SpinnerLoader } from "../shared/spinner-loader"
import styled from "styled-components"

export const EntitiesLoader: APIFC<undefined, EntitiesLoaderConfig> = ({
  config,
  children,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveApiDeviceId)!
  const entitiesLoadingStates = useSelector((state: ReduxRootState) =>
    selectEntitiesLoadingState(state, { deviceId })
  )
  const allLoaded = config.entitiesTypes.every(
    (entitiesType) => entitiesLoadingStates[entitiesType] === "loaded"
  )

  useEffect(() => {
    for (const entitiesType of config.entitiesTypes) {
      if (entitiesLoadingStates[entitiesType] === "idle") {
        dispatch(getEntitiesDataAction({ entitiesType, deviceId }))
      }
    }
  }, [config.entitiesTypes, deviceId, dispatch, entitiesLoadingStates])

  if (allLoaded) {
    return children
  }
  return (
    <Wrapper>
      <SpinnerLoader dark />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > * {
    width: 5rem;
    height: 5rem;
  }
`
