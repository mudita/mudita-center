/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { act, renderHook } from "@testing-library/react"
import { DeviceManageFileFeature } from "./device-manage-files.types"
import { useDeviceManageFiles } from "./use-device-manage-files"

const mockFeatureQuery = jest.fn()

jest.mock("devices/common/feature", () => ({
  useActiveDeviceQuery: () => ({ data: { id: "device" } }),
}))
jest.mock("devices/api-device/feature", () => ({
  useApiFeatureQuery: (...args: unknown[]) => mockFeatureQuery(...args),
  useApiEntitiesDataQueries: (
    types: string[],
    _device: unknown,
    select: (files: { isInternal: boolean }[]) => number
  ) => ({
    data: Object.fromEntries(
      types.map((type) => [
        type,
        select([
          { isInternal: true },
          { isInternal: true },
          { isInternal: false },
        ]),
      ])
    ),
    isLoading: false,
  }),
}))
jest.mock("app-localize/utils", () => ({
  defineMessages: (messages: unknown) => messages,
  formatMessage: () => "",
}))
jest.mock("devices/common/ui", () => ({ manageFilesMessages: {} }))
jest.mock("app-theme/ui", () => ({ formatBytes: String }))

it.each([
  [DeviceManageFileFeature.Internal, 2],
  [DeviceManageFileFeature.External, 1],
] as const)(
  "loads %s when the other storage is unavailable",
  (feature, count) => {
    mockFeatureQuery.mockClear()
    mockFeatureQuery.mockImplementation((requestedFeature) =>
      requestedFeature === feature
        ? {
            isSuccess: true,
            isError: false,
            data: {
              data: {
                storageInformation: [
                  {
                    path: "/storage/fixture/",
                    totalSpaceBytes: 2048,
                    freeSpaceBytes: 1536,
                    usedSpaceBytes: 512,
                    totalSpaceString: "2 KB",
                    freeSpaceString: "1.5 KB",
                    usedSpaceString: "512 B",
                    categoriesSpaceInformation: {},
                  },
                ],
              },
              config: {
                main: {
                  screenTitle: "Manage Files",
                  component: "mc-file-manager-view",
                  config: {
                    storages: [{ label: "Storage", path: "/storage/fixture/" }],
                    categories: [
                      {
                        entityType: "imageFiles",
                        label: "Photos",
                        icon: "photo-catalog",
                        markerColor: "#0E7490",
                        directoryPath: "Pictures/",
                        supportedFileTypes: ["jpg"],
                        fileListEmptyStateDescription: "Add photos.",
                      },
                    ],
                  },
                },
              },
            },
          }
        : { isError: true }
    )

    const { result } = renderHook(() => useDeviceManageFiles(feature))

    expect(result.current.data.categories).toMatchObject([
      { id: "imageFiles", count },
    ])
    expect(result.current.isConfigError).toBe(false)
    expect(mockFeatureQuery.mock.calls.map(([requested]) => requested)).toEqual(
      [feature]
    )
  }
)

it("retries the selected storage when its configuration is unavailable", async () => {
  const refetch = jest.fn().mockResolvedValue(undefined)
  mockFeatureQuery.mockReturnValue({
    isSuccess: true,
    data: { config: {} },
    refetch,
  })
  const { result } = renderHook(() =>
    useDeviceManageFiles(DeviceManageFileFeature.Internal)
  )

  expect(result.current.isConfigError).toBe(true)
  await act(async () => {
    await result.current.refetch()
  })
  expect(refetch).toHaveBeenCalledTimes(1)
  expect(result.current.isLoading).toBe(false)
})
