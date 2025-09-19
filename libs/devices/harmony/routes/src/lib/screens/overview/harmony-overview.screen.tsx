/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { useHarmonyTimeQuery } from "devices/harmony/feature"
import {
  useActiveDeviceQuery,
  useDeviceConfigQuery,
} from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import { DeviceImageType } from "devices/common/models"
import { DashboardHeaderTitle } from "app-routing/feature"
import { Overview, OverviewDetailsSection } from "devices/common/ui"
import { HarmonyOverviewStatusSection } from "./harmony-overview-status-section"
import { HarmonyOverviewTimeSynchronizationSection } from "./harmony-overview-time-synchronization-section"
import { HarmonyOverviewOsSection } from "./harmony-overview-os-section"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  pageTitle: {
    id: "page.overview.title",
  },
  statusTitle: {
    id: "harmony.overview.status.title",
  },
  osTitle: {
    id: "harmony.overview.os.title",
  },
  timeAndDateTitle: {
    id: "harmony.overview.time.title",
  },
  timeAndDateDescription: {
    id: "harmony.overview.time.description",
  },
})

export const HarmonyOverviewScreen: FunctionComponent = () => {
  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()
  const { data: config } = useDeviceConfigQuery<Harmony>(activeDevice)
  const { data: harmonyTime } = useHarmonyTimeQuery(activeDevice)

  const deviceImageType =
    config?.caseColour === "black"
      ? DeviceImageType.Harmony2
      : DeviceImageType.Harmony1

  const statusSection: OverviewDetailsSection = useMemo(() => {
    if (config?.batteryLevel === undefined) {
      return
    }
    return {
      title: formatMessage(messages.statusTitle),
      children: (
        <HarmonyOverviewStatusSection batteryLevel={config.batteryLevel} />
      ),
    }
  }, [config?.batteryLevel])

  const osSection: OverviewDetailsSection = useMemo(() => {
    if (!config?.version || !activeDevice) {
      return
    }
    return {
      title: formatMessage(messages.osTitle),
      children: (
        <HarmonyOverviewOsSection
          device={activeDevice}
          currentVersion={config.version}
          serialNumber={config.serialNumber}
          batteryLevel={config.batteryLevel}
        />
      ),
    }
  }, [
    activeDevice,
    config?.batteryLevel,
    config?.serialNumber,
    config?.version,
  ])

  const timeAndDateSection: OverviewDetailsSection = useMemo(() => {
    if (!harmonyTime) {
      return
    }
    return {
      title: formatMessage(messages.timeAndDateTitle),
      description: formatMessage(messages.timeAndDateDescription),
      children: (
        <HarmonyOverviewTimeSynchronizationSection
          time={harmonyTime.formattedTime}
          date={harmonyTime.formattedDate}
        />
      ),
    }
  }, [harmonyTime])

  const sections = useMemo(() => {
    return [statusSection, osSection, timeAndDateSection]
  }, [osSection, statusSection, timeAndDateSection])

  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      <Overview
        deviceImageType={deviceImageType}
        serialNumber={config?.serialNumber}
        detailsSections={sections}
      />
    </>
  )
}
