/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { random } from "lodash"
import { ApiDevice, EntityData } from "devices/api-device/models"
import {
  ContactToImportAsFile,
  TransferFilesActionType,
  TransferMode,
} from "devices/common/models"
import { preDataTransferPost } from "../../api/pre-data-transfer-post"
import { dataTransferGet } from "../../api/data-transfer-get"
import { dataTransferPost } from "../../api/data-transfer-post"
import { transferFiles } from "../transfer-files/transfer-files"
import { dataTransferDelete } from "../../api/data-transfer-delete"

const domainsMapping = {
  contacts: "contacts-v1",
}

type Data = {
  entityType: "contacts"
  data: ContactToImportAsFile[]
}

export type SendEntitiesAsFileParams = Data & {
  device: ApiDevice
  abortController: AbortController
  onProgress?: (progress: number) => void
}

export const sendEntitiesAsFile = async ({
  device,
  entityType,
  data,
  onProgress,
  abortController,
}: SendEntitiesAsFileParams): Promise<{
  failedEntities?: EntityData[]
}> => {
  const dataTransferId = random(1, 100000)

  let preTransferProgress = 0
  let transferProgress = 0
  let postTransferProgress = 0

  const handleAbort = async () => {
    await dataTransferDelete(device, { dataTransferId })
  }

  abortController.signal.addEventListener("abort", handleAbort)

  const handleProgress = () => {
    const totalProgress =
      preTransferProgress * 0.05 +
      transferProgress * 0.15 +
      postTransferProgress * 0.8
    onProgress?.(Math.floor(totalProgress))
  }

  handleProgress()

  try {
    const domain =
      domainsMapping[entityType as keyof typeof domainsMapping] ?? undefined

    if (!domain) {
      throw new Error(`Unsupported entity type: ${entityType}`)
    }
    if (abortController.signal.aborted) {
      throw new Error("Sending entities aborted")
    }

    // Pre data transfer
    const preDataResponse = await preDataTransferPost(device, {
      dataTransferId,
      domains: [domain],
    })
    if (!preDataResponse.ok) {
      throw new Error("Pre data transfer failed")
    }
    const targetPath = preDataResponse.body.domains[domain]
    if (!targetPath) {
      throw new Error(`No target path for domain: ${domain}`)
    }
    preTransferProgress = 100
    handleProgress()

    // File transfer
    if (abortController.signal.aborted) {
      throw new Error("Sending entities aborted")
    }
    const fileData = Buffer.from(JSON.stringify(data), "utf-8").toString(
      "base64"
    )
    const transferResponse = await transferFiles({
      device,
      transferMode: TransferMode.Serial,
      action: TransferFilesActionType.Upload,
      files: [
        {
          id: `entity-${entityType}`,
          source: {
            type: "memory",
            data: fileData,
          },
          target: {
            type: "path",
            path: targetPath,
          },
        },
      ],
      abortController,
      onProgress: (progressData) => {
        transferProgress = progressData.progress
        handleProgress()
      },
    })
    if (!transferResponse.ok) {
      throw new Error("File transfer failed")
    }
    transferProgress = 100
    handleProgress()

    // Post data transfer
    if (abortController.signal.aborted) {
      throw new Error("Sending entities aborted")
    }
    const postTransferResponse = await dataTransferPost(device, {
      dataTransferId,
    })
    if (!postTransferResponse.ok) {
      throw new Error("Post data transfer failed")
    }

    if (postTransferResponse.status === 200) {
      postTransferProgress = 100
      handleProgress()
      return {}
    }

    if (postTransferResponse.status !== 202) {
      throw new Error("Post data transfer unexpected response")
    }

    // Optional polling for transfer completion
    let postTransferComplete = false
    do {
      if (abortController.signal.aborted) {
        throw new Error("Sending entities aborted")
      }
      const getTransferResponse = await dataTransferGet(device, {
        dataTransferId,
      })
      if (!getTransferResponse.ok) {
        throw new Error("Post data transfer status check failed")
      }
      if (getTransferResponse.status === 200) {
        postTransferComplete = true
        postTransferProgress = 100
        handleProgress()
      } else if (getTransferResponse.status === 202) {
        const progress = getTransferResponse.body.progress
        if (progress) {
          postTransferProgress = progress
          handleProgress()
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } while (!postTransferComplete)

    return {}
  } catch {
    if (abortController.signal.aborted) {
      return {}
    }
    return {
      failedEntities: data,
    }
  } finally {
    onProgress?.(100)
  }
}
