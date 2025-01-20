/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiResponse } from "Core/device/types/mudita-os"
import { MatchConfig } from "Libs/e2e-mock/server/src"
import { APIEndpointType, APIMethodsType } from "device/models"
import {
  entitiesConfiguration,
  entitiesConfigurationAudioFiles,
} from "./entities-configuration-responses"
import {
  featureConfigurationContacts,
  featureConfigurationFileManager,
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
          features: ["mc-overview", "contacts", "fileManager"],
          entityTypes: ["contacts", "audioFiles"],
          productId: "2006",
          vendorId: "0e8d",
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
              feature: "contacts",
              displayName: "Contacts",
              icon: "contacts-book",
            },
            {
              feature: "fileManager",
              displayName: "Manage Files",
              icon: "file-manager",
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
            feature: "contacts",
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
        body: featureConfigurationFileManager,
        match: {
          expected: {
            feature: "fileManager",
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
            battery: { icon: "battery-charging-5", text: "100%", subText: "" },
            update: { text: "ANDROID 12", version: "0.3.0" },
            status: { badgeText: "Offline+" },
            "airplane-mode": { icon: "airplane-mode", text: "Airplane mode" },
          },
        },
        match: { expected: { feature: "mc-overview", lang: "en-US" } },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          storageInformation: [
            {
              path: "/storage/emulated/0/",
              totalSpaceBytes: 32000000000,
              usedSpaceBytes: 9576652800,
              totalSpaceString: "32 GB",
              usedSpaceString: "9.6 GB",
              categoriesSpaceInformation: {
                imageFiles: {
                  storageCategory: "imageFiles",
                  spaceUsedBytes: 90085267,
                  spaceUsedString: "90.1 MB",
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
                otherFiles: {
                  storageCategory: "otherFiles",
                  spaceUsedBytes: 8437991533,
                  spaceUsedString: "8.4 GB",
                },
              },
            },
          ],
        },
        match: { expected: { feature: "fileManager", lang: "en-US" } },
      },
    ],
  },
  ENTITIES_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: entitiesConfiguration,
        match: { expected: { entityType: "contacts" } },
      },
      {
        status: ResponseStatus.Ok,
        body: entitiesConfigurationAudioFiles,
        match: { expected: { entityType: "audioFiles" } },
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
    ],
  },
  ENTITIES_DATA: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          filePath: "../contact_entities.json",
          progress: 100,
        },
        match: {
          expected: {
            entityType: "contacts",
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
            entityType: "audioFiles",
            responseType: "file",
          },
        },
      },
    ],
    DELETE: [
      {
        status: ResponseStatus.Ok,
      }
    ]
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
          transferId: 1734669809788,
          chunkSize: 214,
          fileSize: 214,
          crc32: "217b0c15",
        },
        match: {
          expected: {
            filePath: "../audioFiles_entities.json",
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
            chunkNumber: 1
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 1734669809788,
          chunkNumber: 1,
          data: "eyJkYXRhIjpbeyJlbnRpdHlUeXBlIjoiYXVkaW9GaWxlcyIsImlkIjoiNDU3IiwiZmlsZVBhdGgiOiIvc3RvcmFnZS9lbXVsYXRlZC8wL3Rlc3QubXAzIiwiZmlsZU5hbWUiOiJ0ZXN0Lm1wMyIsImV4dGVuc2lvbiI6Im1wMyIsImZpbGVTaXplIjoxMDQ4NTc2MDAwLCJmaWxlVHlwZSI6IkFVRElPIiwibWltZVR5cGUiOiJhdWRpby9tcGVnIiwiaXNJbnRlcm5hbCI6dHJ1ZX1dfQ==",
        },
        match: {
          expected: {
            transferId: 1734669809788,
            chunkNumber: 1
          },
        },
      },
    ],
  },
}
