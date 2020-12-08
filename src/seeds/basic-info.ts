import { StoreValues } from "Renderer/models/basic-info/basic-info.typings"

//TODO: Move mocked basicInfo to backend layer -> https://appnroll.atlassian.net/browse/PDA-588
export const basicInfoSeed: Omit<
  StoreValues,
  "resultsState" | "disconnectedDevice"
> = {
  lastBackup: undefined,
  networkName: "",
  batteryLevel: 0.43,
  osVersion: "release-0.46.1-33-g4973babd",
  simCards: [
    {
      slot: 1,
      active: true,
      number: 12345678,
      network: "Y-Mobile",
      networkLevel: 0.5,
    },
  ],
  memorySpace: { full: 13913, free: 13727 },
  osUpdateDate: "2020-01-14T11:31:08.244Z",
}
