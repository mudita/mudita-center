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

export const McContactsDuplicatesScreen: FunctionComponent = () => {
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: feature } = useApiFeatureQuery("mc-contacts-duplicates", device)

  if (!feature) {
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
      <DashboardHeaderTitle title={feature.title} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        Contacts duplicates
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
