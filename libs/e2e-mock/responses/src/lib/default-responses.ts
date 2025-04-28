/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiResponse } from "Core/device/types/mudita-os"
import { MatchConfig } from "Libs/e2e-mock/server/src"
import { APIEndpointType, APIMethodsType } from "device/models"
import {
  contactsEntitiesConfiguration,
  filesEntitiesConfiguration,
} from "./entities-configuration-responses"
import {
  featureConfigurationContacts,
  featureConfigurationFileManagerInternal,
  featureConfigurationFileManagerExternal,
  featureConfigurationOverview,
} from "./feature-configuration-responses"

//import from "Core/device" breaks usage in e2e
enum ResponseStatus {
  Ok = 200,
  Accepted = 202,
  Redirect = 303,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  PhoneLocked = 403,
  NotAcceptable = 406,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501,
  UnprocessableEntity = 422,
  NotAccepted = 423,
  InsufficientStorage = 507,

  // lib status
  ConnectionError = 503,
  ParserError = 504,
  Timeout = 505,
}

export type ApiResponseWithConfig = ApiResponse<unknown> & {
  match?: MatchConfig
}

export type ApiResponsesWithConfigArray = ApiResponseWithConfig[]

type MethodObject = Partial<Record<APIMethodsType, ApiResponse<unknown>>>

type MethodArray = Partial<Record<APIMethodsType, ApiResponsesWithConfigArray>>

export type MockResponsesMap = Partial<Record<APIEndpointType, MethodObject>>
export type MocksArrayResponsesMap = Partial<
  Record<APIEndpointType, MethodArray>
>

export const DEFAULT_RESPONSES: MocksArrayResponsesMap = {
  API_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          apiVersion: "1.0.0",
          osVersion: "0.0.46 MuditaOS K",
          lang: "en-US",
          variant: "black",
          features: [
            "mc-overview",
            "mc-contacts",
            "mc-file-manager-internal",
            "mc-file-manager-external",
          ],
          entityTypes: [
            "contacts",
            "audioFiles",
            "imageFiles",
            "ebookFiles",
            "applicationFiles",
          ],
          productId: "2006",
          vendorId: "3310",
          serialNumber: "0123456789ABCDEF",
          otaApiConfig: {
            otaApiKey: "864055030180383",
            osVersionTimestamp: 1733752055000,
          },
        },
      },
    ],
  },
  MENU_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          title: "Kompakt",
          menuItems: [
            {
              feature: "mc-overview",
              displayName: "Overview",
              icon: "overview",
            },
            {
              feature: "mc-contacts",
              displayName: "Contacts",
              icon: "contacts-book",
            },
            {
              feature: "mc-file-manager-internal",
              displayName: "Manage Files",
              icon: "file-manager",
              submenu: [
                {
                  feature: "mc-file-manager-internal",
                  displayName: "Phone storage",
                },
                {
                  feature: "mc-file-manager-external",
                  displayName: "SD card",
                },
              ],
            },
          ],
        },
      },
    ],
  },
  OUTBOX: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: { features: [], data: [] },
      },
    ],
  },
  FEATURE_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: featureConfigurationContacts,
        match: {
          expected: {
            feature: "mc-contacts",
            lang: "en-US",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: featureConfigurationOverview,
        match: {
          expected: {
            feature: "mc-overview",
            lang: "en-US",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: featureConfigurationFileManagerInternal,
        match: {
          expected: {
            feature: "mc-file-manager-internal",
            lang: "en-US",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: featureConfigurationFileManagerExternal,
        match: {
          expected: {
            feature: "mc-file-manager-external",
            lang: "en-US",
          },
        },
      },
    ],
  },
  FEATURE_DATA: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          summary: {
            about: {
              serialNumber: { text: "0123456789ABCDEF" },
              imei1: { text: "864055030138811" },
              imei2: { text: "864055030138829" },
              sar: {
                text: "### SAR\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet ligula, viverra feugiat massa. In hac habitasse platea dictumst.\n\n1. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n2. Suspendisse consectetur, nibh non consequat hendrerit, nibh felis commodo lacus, id auctor ante purus vitae justo.\n3. Cras purus neque, pharetra vitae nulla ac, mollis facilisis felis. Sed sit amet ex diam.\n\n> Sed accumsan sem nec iaculis euismod.",
              },
            },
          },
          sections: {
            battery: {
              icon: "battery-charging-5",
              text: "100%",
              subText: "",
              show: true,
            },
            update: { text: "ANDROID 12", version: "0.3.0" },
            status: { badgeText: "Offline+" },
            "airplane-mode": {
              icon: "airplane-mode",
              text: "Airplane mode",
              show: true,
            },
            connection0: {
              icon: "network-signal-0",
              text: "No SIM",
              subText: "SIM 1 - no network",
              show: false,
            },
            connection1: {
              icon: "network-signal-0",
              text: "No SIM",
              subText: "SIM 2 - no network",
              show: false,
            },
          },
        },
        match: { expected: { feature: "mc-overview", lang: "en-US" } },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          storageInformation: [
            {
              path: "/storage/emulated/0",
              totalSpaceBytes: 32000000000,
              usedSpaceBytes: 9497676627,
              freeSpaceBytes: 22502323373,
              totalSpaceString: "32 GB",
              usedSpaceString: "9,5 GB",
              freeSpaceString: "22,5 GB",
              categoriesSpaceInformation: {
                imageFiles: {
                  storageCategory: "imageFiles",
                  spaceUsedBytes: 11109094,
                  spaceUsedString: "108.6 MB",
                },
                audioFiles: {
                  storageCategory: "audioFiles",
                  spaceUsedBytes: 1048576000,
                  spaceUsedString: "1 GB",
                },
                ebookFiles: {
                  storageCategory: "ebookFiles",
                  spaceUsedBytes: 0,
                  spaceUsedString: "0 B",
                },
                applicationFiles: {
                  storageCategory: "applicationFiles",
                  spaceUsedBytes: 0,
                  spaceUsedString: "0 B",
                },
                otherFiles: {
                  storageCategory: "otherFiles",
                  spaceUsedBytes: 8400000000,
                  spaceUsedString: "8.4 GB",
                },
              },
            },
          ],
        },
        match: {
          expected: { feature: "mc-file-manager-internal", lang: "en-US" },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          storageInformation: [
            {
              path: "/storage/9EBD-E8C5",
              totalSpaceBytes: 125064839168,
              usedSpaceBytes: 5690831667,
              freeSpaceBytes: 119374007501,
              totalSpaceString: "125,1 GB",
              usedSpaceString: "5,3 GB",
              freeSpaceString: "119,8 GB",
              categoriesSpaceInformation: {
                imageFiles: {
                  storageCategory: "imageFiles",
                  spaceUsedBytes: 0,
                  spaceUsedString: "0 B",
                },
                audioFiles: {
                  storageCategory: "audioFiles",
                  spaceUsedBytes: 0,
                  spaceUsedString: "0 B",
                },
                ebookFiles: {
                  storageCategory: "ebookFiles",
                  spaceUsedBytes: 743020953,
                  spaceUsedString: "708,6 MB",
                },
                applicationFiles: {
                  storageCategory: "applicationFiles",
                  spaceUsedBytes: 1825361100,
                  spaceUsedString: "1.7 GB",
                },
                otherFiles: {
                  storageCategory: "otherFiles",
                  spaceUsedBytes: 2895179610,
                  spaceUsedString: "2.9 GB",
                },
              },
            },
          ],
        },
        match: {
          expected: { feature: "mc-file-manager-external", lang: "en-US" },
        },
      },
    ],
  },
  ENTITIES_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: contactsEntitiesConfiguration,
        match: { expected: { entityType: "contacts" } },
      },
      {
        status: ResponseStatus.Ok,
        body: filesEntitiesConfiguration,
        match: { expected: { entityType: "audioFiles" } },
      },
      {
        status: ResponseStatus.Ok,
        body: filesEntitiesConfiguration,
        match: { expected: { entityType: "imageFiles" } },
      },
      {
        status: ResponseStatus.Ok,
        body: filesEntitiesConfiguration,
        match: { expected: { entityType: "ebookFiles" } },
      },
      {
        status: ResponseStatus.Ok,
        body: filesEntitiesConfiguration,
        match: { expected: { entityType: "applicationFiles" } },
      },
    ],
  },
  ENTITIES_METADATA: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: { totalEntities: 17, uniqueKey: "1733750368393" },
        match: { expected: { entityType: "contacts" } },
      },
      {
        status: ResponseStatus.Ok,
        body: { totalEntities: 1, uniqueKey: "1733750368394" },
        match: { expected: { entityType: "audioFiles" } },
      },
      {
        status: ResponseStatus.Ok,
        body: { totalEntities: 1, uniqueKey: "2733750368394" },
        match: { expected: { entityType: "imageFiles" } },
      },
      {
        status: ResponseStatus.Ok,
        body: { totalEntities: 1, uniqueKey: "3733750368394" },
        match: { expected: { entityType: "ebookFiles" } },
      },
      {
        status: ResponseStatus.Ok,
        body: { totalEntities: 1, uniqueKey: "4733750368394" },
        match: { expected: { entityType: "applicationFiles" } },
      },
    ],
  },
  ENTITIES_DATA: {
    GET: [
      {
        status: ResponseStatus.Accepted,
        body: {
          progress: 0,
        },
        match: {
          expected: {
            action: "create",
            entityType: "contacts",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          filePath: "../contact_entities.json",
          progress: 100,
        },
        match: {
          expected: {
            action: "get",
            entityType: "contacts",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Accepted,
        body: {
          progress: 0,
        },
        match: {
          expected: {
            action: "create",
            entityType: "audioFiles",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          filePath: "../audioFiles_entities.json",
          progress: 100,
        },
        match: {
          expected: {
            action: "get",
            entityType: "audioFiles",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Accepted,
        body: {
          progress: 0,
        },
        match: {
          expected: {
            action: "create",
            entityType: "imageFiles",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          filePath: "../imageFiles_entities.json",
          progress: 100,
        },
        match: {
          expected: {
            action: "get",
            entityType: "imageFiles",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Accepted,
        body: {
          progress: 0,
        },
        match: {
          expected: {
            action: "create",
            entityType: "ebookFiles",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          filePath: "../ebookFiles_entities.json",
          progress: 100,
        },
        match: {
          expected: {
            action: "get",
            entityType: "ebookFiles",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Accepted,
        body: {
          progress: 0,
        },
        match: {
          expected: {
            action: "create",
            entityType: "applicationFiles",
            responseType: "file",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          filePath: "../applicationFiles_entities.json",
          progress: 100,
        },
        match: {
          expected: {
            action: "get",
            entityType: "applicationFiles",
            responseType: "file",
          },
        },
      },
    ],
    DELETE: [
      {
        status: ResponseStatus.Ok,
      },
    ],
  },
  PRE_FILE_TRANSFER: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 48647,
          chunkSize: 6574,
          fileSize: 6574,
          crc32: "f8748c26",
        },
        match: {
          expected: {
            filePath: "../contact_entities.json",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30001,
          chunkSize: 314,
          fileSize: 314,
          crc32: "398cd2f3",
        },
        match: {
          expected: {
            filePath: "../audioFiles_entities.json",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30002,
          chunkSize: 312,
          fileSize: 312,
          crc32: "414499ca",
        },
        match: {
          expected: {
            filePath: "../imageFiles_entities.json",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30003,
          chunkSize: 322,
          fileSize: 322,
          crc32: "d65de84a",
        },
        match: {
          expected: {
            filePath: "../ebookFiles_entities.json",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1743672201446,
          chunkSize: 21,
          fileSize: 21,
          crc32: "918a0549",
        },
        match: {
          expected: {
            filePath: "path/to/backup/CONTACT_LIST",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1743672201351,
          chunkSize: 21,
          fileSize: 21,
          crc32: "918a0549",
        },
        match: {
          expected: {
            filePath: "path/to/backup/CALL_LOG",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744018209710,
          chunkSize: 21,
          fileSize: 21,
          crc32: "918a0549",
        },
        match: {
          expected: {
            filePath: "path/to/backup/MESSAGES",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744018209329,
          chunkSize: 21,
          fileSize: 21,
          crc32: "918a0549",
        },
        match: {
          expected: {
            filePath: "path/to/backup/NOTES",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744026253669,
          chunkSize: 21,
          fileSize: 21,
          crc32: "918a0549",
        },
        match: {
          expected: {
            filePath: "path/to/backup/CALENDAR_EVENTS",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744026253594,
          chunkSize: 21,
          fileSize: 21,
          crc32: "918a0549",
        },
        match: {
          expected: {
            filePath: "path/to/backup/OS_VERSION_AND_SETTINGS",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744026253664,
          chunkSize: 21,
          fileSize: 21,
          crc32: "918a0549",
        },
        match: {
          expected: {
            filePath: "path/to/backup/APP_SETTINGS",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30004,
          chunkSize: 372,
          fileSize: 372,
          crc32: "9526c492",
        },
        match: {
          expected: {
            filePath: "../applicationFiles_entities.json",
          },
        },
      },
    ],
  },
  FILE_TRANSFER: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 48647,
          chunkNumber: 1,
          data: "eyJkYXRhIjpbeyJjb250YWN0SWQiOiI0MjUiLCJlbnRpdHlUeXBlIjoiY29udGFjdHMiLCJzZWFyY2hOYW1lIjoiRHIuIEFubmEgTm93YWsgSnIuIiwic29ydEZpZWxkIjoiTm93YWtBbm5hIiwiZmlyc3ROYW1lIjoiQW5uYSIsImxhc3ROYW1lIjoiTm93YWsiLCJuYW1lUHJlZml4IjoiRHIuIiwibWlkZGxlTmFtZSI6Ik1hcmlhIiwibmFtZVN1ZmZpeCI6IkpyLiIsInBob25lTnVtYmVycyI6W3siaWQiOiIyOTgxIiwicGhvbmVOdW1iZXIiOiIrNDgxMjM0NTY3ODkiLCJwaG9uZVR5cGUiOiJNT0JJTEUifV0sImVtYWlsQWRkcmVzc2VzIjpbeyJpZCI6IjI5ODIiLCJlbWFpbEFkZHJlc3MiOiJhbm5hLm5vd2FrQGV4YW1wbGUuY29tIiwiZW1haWxUeXBlIjoiV09SSyJ9XSwiY29tcGFueSI6IkFCQyBDb3JwLiIsImRlcGFydG1lbnQiOiJIUiIsIndvcmtUaXRsZSI6Ik1hbmFnZXIiLCJhZGRyZXNzIjp7InN0cmVldEFkZHJlc3MiOiJNYWluIFN0cmVldCAxMiIsImNpdHkiOiJXYXJzYXciLCJjb3VudHJ5IjoiUG9sYW5kIiwidHlwZSI6IldPUksifSwid2Vic2l0ZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJub3RlcyI6IlZJUCBjbGllbnQiLCJzdGFycmVkIjpmYWxzZSwiZGlzcGxheU5hbWUxIjoiRHIuIiwiZGlzcGxheU5hbWUyIjoiQW5uYSIsImRpc3BsYXlOYW1lMyI6Ik5vd2FrIiwiZGlzcGxheU5hbWU0IjoiSnIuIn0seyJjb250YWN0SWQiOiI0MjciLCJlbnRpdHlUeXBlIjoiY29udGFjdHMiLCJzZWFyY2hOYW1lIjoiRHIuIE1pY2hhZWwgSm9obnNvbiBQaEQiLCJzb3J0RmllbGQiOiJKb2huc29uTWljaGFlbCIsImZpcnN0TmFtZSI6Ik1pY2hhZWwiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJuYW1lUHJlZml4IjoiRHIuIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibmFtZVN1ZmZpeCI6IlBoRCIsInBob25lTnVtYmVycyI6W3siaWQiOiIyOTk3IiwicGhvbmVOdW1iZXIiOiIrNDk4NzY1NDMyMTAiLCJwaG9uZVR5cGUiOiJNT0JJTEUifSx7ImlkIjoiMjk5OCIsInBob25lTnVtYmVyIjoiKzQ5ODcxMjM0NTY3IiwicGhvbmVUeXBlIjoiSE9NRSJ9XSwiZW1haWxBZGRyZXNzZXMiOlt7ImlkIjoiMjk5OSIsImVtYWlsQWRkcmVzcyI6Im1pY2hhZWwuakByZXNlYXJjaGxhYi5jb20iLCJlbWFpbFR5cGUiOiJXT1JLIn1dLCJjb21wYW55IjoiUmVzZWFyY2ggTGFicyIsImRlcGFydG1lbnQiOiJSJkQiLCJ3b3JrVGl0bGUiOiJDaGllZiBTY2llbnRpc3QiLCJhZGRyZXNzIjp7InN0cmVldEFkZHJlc3MiOiI3ODkgU2NpZW5jZSBCbHZkIiwiY2l0eSI6IkJlcmxpbiIsImNvdW50cnkiOiJHZXJtYW55IiwidHlwZSI6IldPUksifSwid2Vic2l0ZSI6Imh0dHBzOi8vbWljaGFlbGpvaG5zb25waGQuY29tIiwibm90ZXMiOiJDb2xsYWJvcmF0aW5nIG9uIEFJIHJlc2VhcmNoIHByb2plY3RzLiIsInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTEiOiJEci4iLCJkaXNwbGF5TmFtZTIiOiJNaWNoYWVsIiwiZGlzcGxheU5hbWUzIjoiSm9obnNvbiIsImRpc3BsYXlOYW1lNCI6IlBoRCJ9LHsiY29udGFjdElkIjoiNDI4IiwiZW50aXR5VHlwZSI6ImNvbnRhY3RzIiwic2VhcmNoTmFtZSI6IkxvbmcgRGlzcGxheSBOYW1lIChsYXN0IG5hbWUgaXMgbG9uZykgQW5uYSBNYXJpYSBLYXRhcnp5bmEgTm93YWstV2llbGthLVphYsWCb2NrYS1ExYJ1Z29zei1Pc3Ryb3dza2EtTWlja2lld2ljei1QacSZa25hLVNvYmllc2thLUtvd2FsZXdza2EtSmFnaWVsbG/FhHNrYS1TxYJvd2Fja2EtS3J6ecW8YW5vd3NrYS1Lb3JkZWNrYS1Lb8WbY2l1c3prb3dza2EiLCJzb3J0RmllbGQiOiJBbm5hIE1hcmlhIEthdGFyenluYSBOb3dhay1XaWVsa2EtWmFixYJvY2thLUTFgnVnb3N6LU9zdHJvd3NrYS1NaWNraWV3aWN6LVBpxJlrbmEtU29iaWVza2EtS293YWxld3NrYS1KYWdpZWxsb8WEc2thLVPFgm93YWNrYS1Lcnp5xbxhbm93c2thLUtvcmRlY2thLUtvxZtjaXVzemtvd3NrYUxvbmcgRGlzcGxheSBOYW1lIChsYXN0IG5hbWUgaXMgbG9uZykiLCJmaXJzdE5hbWUiOiJMb25nIERpc3BsYXkgTmFtZSAobGFzdCBuYW1lIGlzIGxvbmcpIiwibGFzdE5hbWUiOiJBbm5hIE1hcmlhIEthdGFyenluYSBOb3dhay1XaWVsa2EtWmFixYJvY2thLUTFgnVnb3N6LU9zdHJvd3NrYS1NaWNraWV3aWN6LVBpxJlrbmEtU29iaWVza2EtS293YWxld3NrYS1KYWdpZWxsb8WEc2thLVPFgm93YWNrYS1Lcnp5xbxhbm93c2thLUtvcmRlY2thLUtvxZtjaXVzemtvd3NrYSIsInBob25lTnVtYmVycyI6W3siaWQiOiIzMDA2IiwicGhvbmVOdW1iZXIiOiIrNDgxMjM0NTY3ODYiLCJwaG9uZVR5cGUiOiJNT0JJTEUifV0sInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTIiOiJMb25nIERpc3BsYXkgTmFtZSAobGFzdCBuYW1lIGlzIGxvbmcpIiwiZGlzcGxheU5hbWUzIjoiQW5uYSBNYXJpYSBLYXRhcnp5bmEgTm93YWstV2llbGthLVphYsWCb2NrYS1ExYJ1Z29zei1Pc3Ryb3dza2EtTWlja2lld2ljei1QacSZa25hLVNvYmllc2thLUtvd2FsZXdza2EtSmFnaWVsbG/FhHNrYS1TxYJvd2Fja2EtS3J6ecW8YW5vd3NrYS1Lb3JkZWNrYS1Lb8WbY2l1c3prb3dza2EifSx7ImNvbnRhY3RJZCI6IjQzNCIsImVudGl0eVR5cGUiOiJjb250YWN0cyIsInNlYXJjaE5hbWUiOiJNYXJlayBNYXJtYXJlY2tpIiwic29ydEZpZWxkIjoiTWFybWFyZWNraU1hcmVrIiwiZmlyc3ROYW1lIjoiTWFyZWsiLCJsYXN0TmFtZSI6Ik1hcm1hcmVja2kiLCJwaG9uZU51bWJlcnMiOlt7ImlkIjoiMzA0OCIsInBob25lTnVtYmVyIjoiNTAwNTAwNTAwIiwicGhvbmVUeXBlIjoiTU9CSUxFIn0seyJpZCI6IjMwNDkiLCJwaG9uZU51bWJlciI6IjUwMDUwMDYwMCIsInBob25lVHlwZSI6IldPUksifV0sInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTIiOiJNYXJlayIsImRpc3BsYXlOYW1lMyI6Ik1hcm1hcmVja2kifSx7ImNvbnRhY3RJZCI6IjQzNSIsImVudGl0eVR5cGUiOiJjb250YWN0cyIsInNlYXJjaE5hbWUiOiJOdW1lciAobGFzdCBuYW1lIGlzIG51bWVyaWMpIDEyMzQ1Iiwic29ydEZpZWxkIjoiMTIzNDVOdW1lciAobGFzdCBuYW1lIGlzIG51bWVyaWMpIiwiZmlyc3ROYW1lIjoiTnVtZXIgKGxhc3QgbmFtZSBpcyBudW1lcmljKSIsImxhc3ROYW1lIjoiMTIzNDUiLCJwaG9uZU51bWJlcnMiOlt7ImlkIjoiMzA1NiIsInBob25lTnVtYmVyIjoiKzQ4OTAxMjM0NTY3IiwicGhvbmVUeXBlIjoiTU9CSUxFIn1dLCJzdGFycmVkIjpmYWxzZSwiZGlzcGxheU5hbWUyIjoiTnVtZXIgKGxhc3QgbmFtZSBpcyBudW1lcmljKSIsImRpc3BsYXlOYW1lMyI6IjEyMzQ1In0seyJjb250YWN0SWQiOiI0NDQiLCJlbnRpdHlUeXBlIjoiY29udGFjdHMiLCJzZWFyY2hOYW1lIjoiKzQ4MzQ1Njc4OTAyIiwic29ydEZpZWxkIjoiKzQ4MzQ1Njc4OTAyIiwicGhvbmVOdW1iZXJzIjpbeyJpZCI6IjMxMTgiLCJwaG9uZU51bWJlciI6Iis0ODM0NTY3ODkwMiIsInBob25lVHlwZSI6Ik1PQklMRSJ9LHsiaWQiOiIzMTE5IiwicGhvbmVOdW1iZXIiOiIrNDg0NDU2Nzg5MDMiLCJwaG9uZVR5cGUiOiJIT01FIn0seyJpZCI6IjMxMjAiLCJwaG9uZU51bWJlciI6Iis0ODU1NTY3ODkwNCIsInBob25lVHlwZSI6IldPUksifV0sInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTMiOiIrNDgzNDU2Nzg5MDIifSx7ImNvbnRhY3RJZCI6IjQ1NiIsImVudGl0eVR5cGUiOiJjb250YWN0cyIsInNlYXJjaE5hbWUiOiJ3b3JrQGVtYWlsLmNvbSIsInNvcnRGaWVsZCI6IndvcmtAZW1haWwuY29tIiwiZW1haWxBZGRyZXNzZXMiOlt7ImlkIjoiMzIxNiIsImVtYWlsQWRkcmVzcyI6IndvcmtAZW1haWwuY29tIiwiZW1haWxUeXBlIjoiV09SSyJ9LHsiaWQiOiIzMjE3IiwiZW1haWxBZGRyZXNzIjoib3RoZXJAZW1haWwuY29tIiwiZW1haWxUeXBlIjoiT1RIRVIifV0sInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTMiOiJ3b3JrQGVtYWlsLmNvbSJ9LHsiY29udGFjdElkIjoiNDU4IiwiZW50aXR5VHlwZSI6ImNvbnRhY3RzIiwic2VhcmNoTmFtZSI6Iklubm92YXRpdmUgVGVjaG5vbG9naWVzIChjb21wYW55KSIsInNvcnRGaWVsZCI6Iklubm92YXRpdmUgVGVjaG5vbG9naWVzIChjb21wYW55KSIsImNvbXBhbnkiOiJJbm5vdmF0aXZlIFRlY2hub2xvZ2llcyAoY29tcGFueSkiLCJzdGFycmVkIjpmYWxzZSwiZGlzcGxheU5hbWUzIjoiSW5ub3ZhdGl2ZSBUZWNobm9sb2dpZXMgKGNvbXBhbnkpIn0seyJjb250YWN0SWQiOiI0NjkiLCJlbnRpdHlUeXBlIjoiY29udGFjdHMiLCJzZWFyY2hOYW1lIjoiTWljaGFlbCBCcm93biIsInNvcnRGaWVsZCI6IkJyb3duTWljaGFlbCIsImZpcnN0TmFtZSI6Ik1pY2hhZWwiLCJsYXN0TmFtZSI6IkJyb3duIiwiYWRkcmVzcyI6eyJzdHJlZXRBZGRyZXNzIjoiU3RyZWV0IDkiLCJ6aXBDb2RlIjoiMDAtMDAzIiwidHlwZSI6IkhPTUUifSwic3RhcnJlZCI6ZmFsc2UsImRpc3BsYXlOYW1lMiI6Ik1pY2hhZWwiLCJkaXNwbGF5TmFtZTMiOiJCcm93biJ9LHsiY29udGFjdElkIjoiNDcwIiwiZW50aXR5VHlwZSI6ImNvbnRhY3RzIiwic2VhcmNoTmFtZSI6Ik1pY2hhZWwgQnJvd24iLCJzb3J0RmllbGQiOiJCcm93bk1pY2hhZWwiLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJCcm93biIsImFkZHJlc3MiOnsic3RhdGUiOiJDYWxpZm9ybmlhIiwiY291bnRyeSI6IlVTQSIsInR5cGUiOiJIT01FIn0sInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTIiOiJNaWNoYWVsIiwiZGlzcGxheU5hbWUzIjoiQnJvd24ifSx7ImNvbnRhY3RJZCI6IjQ3MSIsImVudGl0eVR5cGUiOiJjb250YWN0cyIsInNlYXJjaE5hbWUiOiJzaXA6amFuLm5vd2FrQHNpcG9ubHkuY29tIiwic29ydEZpZWxkIjoic2lwOmphbi5ub3dha0BzaXBvbmx5LmNvbSIsInNpcCI6InNpcDpqYW4ubm93YWtAc2lwb25seS5jb20iLCJzdGFycmVkIjpmYWxzZSwiZGlzcGxheU5hbWUzIjoic2lwOmphbi5ub3dha0BzaXBvbmx5LmNvbSJ9LHsiY29udGFjdElkIjoiNDc4IiwiZW50aXR5VHlwZSI6ImNvbnRhY3RzIiwic2VhcmNoTmFtZSI6Iis0ODIyMzQ1Njc4OSIsInNvcnRGaWVsZCI6Iis0ODIyMzQ1Njc4OSIsInBob25lTnVtYmVycyI6W3siaWQiOiIzMzU1IiwicGhvbmVOdW1iZXIiOiIrNDgyMjM0NTY3ODkiLCJwaG9uZVR5cGUiOiJXT1JLIn1dLCJub3RlcyI6IvCfkqHwn5qoIiwic3RhcnJlZCI6ZmFsc2UsImRpc3BsYXlOYW1lMyI6Iis0ODIyMzQ1Njc4OSJ9LHsiY29udGFjdElkIjoiNDMyIiwiZW50aXR5VHlwZSI6ImNvbnRhY3RzIiwic2VhcmNoTmFtZSI6IlBsdXMgKGxhc3QgbmFtZSB3aXRoIHBsdXMpICsiLCJzb3J0RmllbGQiOiIrUGx1cyAobGFzdCBuYW1lIHdpdGggcGx1cykiLCJmaXJzdE5hbWUiOiJQbHVzIChsYXN0IG5hbWUgd2l0aCBwbHVzKSIsImxhc3ROYW1lIjoiKyIsInBob25lTnVtYmVycyI6W3siaWQiOiIzMDM0IiwicGhvbmVOdW1iZXIiOiIrNDkxMjMxNTY3ODkiLCJwaG9uZVR5cGUiOiJNT0JJTEUifV0sInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTIiOiJQbHVzIChsYXN0IG5hbWUgd2l0aCBwbHVzKSIsImRpc3BsYXlOYW1lMyI6IisifSx7ImNvbnRhY3RJZCI6IjQzOCIsImVudGl0eVR5cGUiOiJjb250YWN0cyIsInNlYXJjaE5hbWUiOiIlJSUlIChvbmx5IG1pZGRsZSBuYW1lKSIsInNvcnRGaWVsZCI6IiUlJSUgKG9ubHkgbWlkZGxlIG5hbWUpIiwibWlkZGxlTmFtZSI6IiUlJSUgKG9ubHkgbWlkZGxlIG5hbWUpIiwic3RhcnJlZCI6ZmFsc2UsImRpc3BsYXlOYW1lMyI6IiUlJSUgKG9ubHkgbWlkZGxlIG5hbWUpIn0seyJjb250YWN0SWQiOiI0NDQiLCJlbnRpdHlUeXBlIjoiY29udGFjdHMiLCJzZWFyY2hOYW1lIjoiKzQ4MzQ1Njc4OTAyIiwic29ydEZpZWxkIjoiKzQ4MzQ1Njc4OTAyIiwicGhvbmVOdW1iZXJzIjpbeyJpZCI6IjMxMTgiLCJwaG9uZU51bWJlciI6Iis0ODM0NTY3ODkwMiIsInBob25lVHlwZSI6Ik1PQklMRSJ9LHsiaWQiOiIzMTE5IiwicGhvbmVOdW1iZXIiOiIrNDg0NDU2Nzg5MDMiLCJwaG9uZVR5cGUiOiJIT01FIn0seyJpZCI6IjMxMjAiLCJwaG9uZU51bWJlciI6Iis0ODU1NTY3ODkwNCIsInBob25lVHlwZSI6IldPUksifV0sInN0YXJyZWQiOmZhbHNlLCJkaXNwbGF5TmFtZTMiOiIrNDgzNDU2Nzg5MDIifSx7ImNvbnRhY3RJZCI6IjQ3MiIsImVudGl0eVR5cGUiOiJjb250YWN0cyIsInNlYXJjaE5hbWUiOiJodHRwczovL3dlYnNpdGVvbmx5LmNvbSIsInNvcnRGaWVsZCI6Imh0dHBzOi8vd2Vic2l0ZW9ubHkuY29tIiwid2Vic2l0ZSI6Imh0dHBzOi8vd2Vic2l0ZW9ubHkuY29tIiwic3RhcnJlZCI6ZmFsc2UsImRpc3BsYXlOYW1lMyI6Imh0dHBzOi8vd2Vic2l0ZW9ubHkuY29tIn0seyJjb250YWN0SWQiOiI0NzMiLCJlbnRpdHlUeXBlIjoiY29udGFjdHMiLCJzZWFyY2hOYW1lIjoiVGhpcyBpcyBhIHRlc3Qgbm90ZS4gKG9ubHkgbm90ZXMpIiwic29ydEZpZWxkIjoiVGhpcyBpcyBhIHRlc3Qgbm90ZS4gKG9ubHkgbm90ZXMpIiwibm90ZXMiOiJUaGlzIGlzIGEgdGVzdCBub3RlLiAob25seSBub3RlcykiLCJzdGFycmVkIjpmYWxzZSwiZGlzcGxheU5hbWUzIjoiVGhpcyBpcyBhIHRlc3Qgbm90ZS4gKG9ubHkgbm90ZXMpIn1dfQ==",
        },
        match: {
          expected: {
            transferId: 48647,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30001,
          chunkNumber: 1,
          data: "eyJkYXRhIjpbeyJlbnRpdHlUeXBlIjoiYXVkaW9GaWxlcyIsImlkIjoiNDU3IiwiZmlsZVBhdGgiOiIvc3RvcmFnZS9lbXVsYXRlZC8wL011c2ljL011ZGl0YUNlbnRlci90ZXN0Lm1wMyIsImZpbGVOYW1lIjoidGVzdC5tcDMiLCJleHRlbnNpb24iOiJtcDMiLCJmaWxlU2l6ZSI6MTA0ODU3NjAwMCwiZmlsZVR5cGUiOiJBVURJTyIsIm1pbWVUeXBlIjoiYXVkaW8vbXBlZyIsImlzSW50ZXJuYWwiOnRydWV9XX0===",
        },
        match: {
          expected: {
            transferId: 30001,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30002,
          chunkNumber: 1,
          data: "eyJkYXRhIjpbeyJpZCI6IjM1NyIsImZpbGVQYXRoIjoiL3N0b3JhZ2UvZW11bGF0ZWQvMC9EQ0lNL011ZGl0YUNlbnRlci9pbWFnZS5wbmciLCJmaWxlTmFtZSI6ImltYWdlLnBuZyIsImV4dGVuc2lvbiI6InBuZyIsImZpbGVTaXplIjoxMDg1NzYwMDAsImZpbGVUeXBlIjoiSU1BR0UiLCJtaW1lVHlwZSI6ImltYWdlL3BuZyIsImlzSW50ZXJuYWwiOnRydWUsImVudGl0eVR5cGUiOiJpbWFnZUZpbGVzIn1dfQ==",
        },
        match: {
          expected: {
            transferId: 30002,
            chunkNumber: 1,
          },
        },
      },

      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30003,
          chunkNumber: 1,
          data: "eyJkYXRhIjpbeyJpZCI6IjY1NyIsImZpbGVQYXRoIjoiL3N0b3JhZ2UvOUVCRC1FOEM1L0Vib29rcy9NdWRpdGFDZW50ZXIvZWJvb2sucGRmIiwiZmlsZU5hbWUiOiJlYm9vay5wZGYiLCJleHRlbnNpb24iOiJwZGYiLCJmaWxlU2l6ZSI6NzA4NTc2MDAwLCJmaWxlVHlwZSI6IkVCT09LIiwibWltZVR5cGUiOiJhcHBsaWNhdGlvbi9wZGYiLCJpc0ludGVybmFsIjp0cnVlLCJlbnRpdHlUeXBlIjoiZWJvb2tGaWxlcyJ9XX0===",
        },
        match: {
          expected: {
            transferId: 30003,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 30004,
          chunkNumber: 1,
          data: "eyJkYXRhIjpbeyJpZCI6IjY1NyIsImZpbGVQYXRoIjoiL3N0b3JhZ2UvOUVCRC1FOEM1L0FwcGxpY2F0aW9ucy9NdWRpdGFDZW50ZXIvYXBwLmFwayIsImZpbGVOYW1lIjoiYXBwLmFwayIsImV4dGVuc2lvbiI6ImFwayIsImZpbGVTaXplIjoxNzA4NTc2MDAwLCJmaWxlVHlwZSI6IkFQUExJQ0FUSU9OIiwibWltZVR5cGUiOiJhcHBsaWNhdGlvbi92bmQuYW5kcm9pZC5wYWNrYWdlLWFyY2hpdmUiLCJpc0ludGVybmFsIjp0cnVlLCJlbnRpdHlUeXBlIjoiYXBwbGljYXRpb25GaWxlcyJ9XX0=",
        },
        match: {
          expected: {
            transferId: 30004,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1743672201446,
          chunkNumber: 1,
          data: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
        },
        match: {
          expected: {
            transferId: 1743672201446,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1743672201351,
          chunkNumber: 1,
          data: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
        },
        match: {
          expected: {
            transferId: 1743672201351,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744018209710,
          chunkNumber: 1,
          data: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
        },
        match: {
          expected: {
            transferId: 1744018209710,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744018209329,
          chunkNumber: 1,
          data: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
        },
        match: {
          expected: {
            transferId: 1744018209329,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744026253669,
          chunkNumber: 1,
          data: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
        },
        match: {
          expected: {
            transferId: 1744026253669,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744026253594,
          chunkNumber: 1,
          data: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
        },
        match: {
          expected: {
            transferId: 1744026253594,
            chunkNumber: 1,
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1744026253664,
          chunkNumber: 1,
          data: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
        },
        match: {
          expected: {
            transferId: 1744026253664,
            chunkNumber: 1,
          },
        },
      },
    ],
  },
  PRE_BACKUP: {
    POST: [
      {
        status: ResponseStatus.Accepted,
        body: { backupId: 12345, progress: 0 },
        match: {
          expected: {
            backupId: 12345,
            features: [
              "CONTACT_LIST",
              "CALL_LOG",
              "MESSAGES",
              "NOTES",
              "CALENDAR_EVENTS",
              "OS_VERSION_AND_SETTINGS",
              "APP_SETTINGS",
            ],
          },
        },
      },
    ],
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          backupId: 12345,
          features: {
            CONTACT_LIST: "path/to/backup/CONTACT_LIST",
            CALL_LOG: "path/to/backup/CALL_LOG",
            MESSAGES: "path/to/backup/MESSAGES",
            NOTES: "path/to/backup/NOTES",
            CALENDAR_EVENTS: "path/to/backup/CALENDAR_EVENTS",
            OS_VERSION_AND_SETTINGS: "path/to/backup/OS_VERSION_AND_SETTINGS",
            APP_SETTINGS: "path/to/backup/APP_SETTINGS",
          },
          progress: 100,
        },
        match: {
          expected: {
            backupId: 12345,
          },
        },
      },
    ],
  },
}
