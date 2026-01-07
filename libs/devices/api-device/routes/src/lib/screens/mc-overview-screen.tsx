/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo } from "react"
import { ApiDevice } from "devices/api-device/models"
import { Overview } from "devices/common/ui"
import { DeviceImageColor, DeviceImageType } from "devices/common/models"
import { Icon } from "app-theme/ui"
import { useApiFeatureQuery } from "devices/api-device/feature"
import { IconSize, IconType } from "app-theme/models"
import { motion } from "motion/react"
import { useActiveDeviceQuery } from "devices/common/feature"
import styled from "styled-components"
import { DashboardHeaderTitle } from "app-routing/feature"
import { McOverviewStatus, McOverviewUpdate } from "devices/api-device/ui"
import { SerialPortDeviceSubtype } from "app-serialport/models"
import { useParams } from "react-router"
import { BackupSection } from "../components/backup-section/backup-section"
import { useHelpShortcut } from "help/feature"

export const McOverviewScreen: FunctionComponent = () => {
  const { subviewKey } = useParams()
  const helpShortcut = useHelpShortcut()
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: feature } = useApiFeatureQuery("mc-overview", device)

  const deviceImageType = useMemo(() => {
    if (device?.deviceSubtype === SerialPortDeviceSubtype.Kompakt) {
      return DeviceImageType.Kompakt
    }
    return DeviceImageType.Kompakt
  }, [device?.deviceSubtype])

  const onHelpButtonClick = useCallback(() => {
    helpShortcut("how-to-update-kompakt")
  }, [helpShortcut])

  const sections = useMemo(() => {
    const status = feature?.status && {
      title: feature.status.title,
      badgeText: feature.status.badgeText,
      children: <McOverviewStatus fields={feature.status.fields} />,
    }
    const update = feature?.update && {
      title: feature.update.title,
      children: (
        <McOverviewUpdate
          version={feature.update.version}
          onHelpButtonClick={onHelpButtonClick}
        />
      ),
    }
    const backup = feature?.backup && {
      title: feature.backup.title,
      children: (
        <BackupSection
          backupFeatures={feature.backup.backupFeatures}
          restoreFeatures={feature.backup.restoreFeatures}
        />
      ),
    }
    return [status, update, backup].filter(Boolean)
  }, [feature, onHelpButtonClick])

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
      <DashboardHeaderTitle title={feature.title} back={!!subviewKey} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Overview
          deviceImageType={deviceImageType}
          deviceImageColor={feature.summary.imgVariant as DeviceImageColor}
          serialNumberLabel={feature.summary.serialNumber?.label}
          serialNumber={feature.summary.serialNumber?.value}
          deviceTypeLabel={feature.summary.deviceVersion?.label}
          deviceType={feature.summary.deviceVersion?.value}
          detailsSections={sections}
          aboutSection={
            feature.summary.about?.button
              ? {
                  icon: feature.summary.about.button.icon,
                  buttonText: feature.summary.about.button.text,
                }
              : undefined
          }
        />
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
