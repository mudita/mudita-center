import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"

export function mockFullStorageDevice(path: string) {
  E2EMockClient.sendEventToDevice(path, {
    type: "backup-storage-status",
    payload: {
      freeStorageSpace: 0,
      isLowOnStorage: true,
      usedStorageSpace: 999999999,
    },
  })

  E2EMockClient.sendEventToDevice(path, {
    type: "backup-status",
    payload: {
      status: "ERROR",
      error: "DEVICE_STORAGE_FULL",
    },
  })
}
