/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { ApiDevice } from "devices/api-device/models"
import { Icon } from "app-theme/ui"
import { useApiFeatureQuery } from "devices/api-device/feature"
import { IconSize, IconType } from "app-theme/models"
import { motion } from "motion/react"
import { useActiveDeviceQuery } from "devices/common/feature"
import styled from "styled-components"
import { DashboardHeaderTitle } from "app-routing/feature"
import { McOverviewAbout } from "devices/api-device/ui"

export const McAboutScreen: FunctionComponent = () => {
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: feature } = useApiFeatureQuery("mc-overview", device)

  if (!feature?.about) {
    return (
      <LoaderWrapper
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Icon type={IconType.Spinner} size={IconSize.Large} />
      </LoaderWrapper>
    )
  }

  return (
    <>
      <DashboardHeaderTitle title={feature.title} back />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <McOverviewAbout {...feature.about} />
      </motion.div>
    </>
  )
}

const LoaderWrapper = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
