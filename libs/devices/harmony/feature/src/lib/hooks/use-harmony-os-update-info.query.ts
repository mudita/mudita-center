/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { harmonyQueryKeys } from "./harmony-query-keys"
import { Harmony, HarmonyOSUpdateError } from "devices/harmony/models"
import semver from "semver"
import { AppFileSystem, AppHttp } from "app-utils/renderer"
import { getHarmonyOsDownloadLocation } from "./use-harmony-os-download.mutation"

export interface HarmonyOsUpdateInfoFile {
  url: string
  size: number
  name: string
  version: string
}

interface HarmonyOsUpdateInfo {
  version: string
  date: Date
  file: HarmonyOsUpdateInfoFile
  mandatoryVersions: string[]
}

interface HarmonyOsUpdateInfoParams {
  serialNumber?: string
  version?: string
}

const getHarmonyOsUpdateInfo = (
  { serialNumber, version = "latest" }: HarmonyOsUpdateInfoParams,
  signal?: AbortSignal
) => {
  const promise = AppHttp.request<HarmonyOsUpdateInfo>({
    method: "GET",
    url: `${import.meta.env.VITE_MUDITA_CENTER_SERVER_URL}/v2-get-release/`,
    params: {
      product: "BellHybrid",
      version,
      environment: "production",
      deviceSerialNumber: serialNumber,
    },
  })

  signal?.addEventListener("abort", () => {
    promise?.abort()
  })

  return promise
}

const queryFn = async (
  {
    serialNumber,
    currentVersion,
  }: {
    serialNumber?: string
    currentVersion?: string
  },
  signal?: AbortSignal
) => {
  if (!currentVersion) {
    throw HarmonyOSUpdateError.AvailabilityCheckFailed
  }
  const allFiles: HarmonyOsUpdateInfoFile[] = []
  const filesToDownload: HarmonyOsUpdateInfoFile[] = []

  const latestRelease = await getHarmonyOsUpdateInfo({ serialNumber }, signal)
  if (!latestRelease.ok) {
    throw HarmonyOSUpdateError.AvailabilityCheckFailed
  }

  for (const mandatoryVersion of latestRelease.data.mandatoryVersions.sort(
    semver.compare
  )) {
    if (semver.gt(mandatoryVersion, currentVersion)) {
      const release = await getHarmonyOsUpdateInfo(
        {
          serialNumber,
          version: mandatoryVersion,
        },
        signal
      )
      if (release.ok) {
        allFiles.push({
          ...release.data.file,
          size: Number(release.data.file.size),
          version: release.data.version,
        })
      } else {
        throw HarmonyOSUpdateError.AvailabilityCheckFailed
      }
    }
  }

  if (semver.gt(latestRelease.data.version, currentVersion)) {
    allFiles.push({
      ...latestRelease.data.file,
      size: Number(latestRelease.data.file.size),
      version: latestRelease.data.version,
    })
  }

  for (const file of allFiles) {
    if (signal?.aborted) {
      break
    }
    const fileLocation = getHarmonyOsDownloadLocation(file.name)
    const exists = await AppFileSystem.pathExists(fileLocation)
    if (exists?.data) {
      const stats = await AppFileSystem.fileStats(fileLocation)
      if (stats.ok && stats.data.size !== file.size) {
        filesToDownload.push(file)
      }
    } else {
      filesToDownload.push(file)
    }
  }

  return {
    latestVersion: latestRelease.data.version,
    allFiles,
    filesToDownload,
  }
}

export const useHarmonyOsUpdateInfoQuery = (options: {
  device?: Harmony
  serialNumber?: string
  currentVersion?: string
}) => {
  const { device, ...info } = options

  return useQuery<Awaited<ReturnType<typeof queryFn>>, HarmonyOSUpdateError>({
    queryKey: useHarmonyOsUpdateInfoQuery.queryKey(device?.id),
    queryFn: ({ signal }) => queryFn(info, signal),
    enabled: !!device && !!info.currentVersion,
    retryOnMount: true,
    retry: 3,
    refetchOnReconnect: true,
  })
}
useHarmonyOsUpdateInfoQuery.queryKey = harmonyQueryKeys.osUpdateInfo
useHarmonyOsUpdateInfoQuery.queryFn = queryFn
