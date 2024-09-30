/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiResponse } from "Core/device/types/mudita-os"
import { MatchConfig } from "Libs/e2e-mock/server/src"
import { APIEndpointType, APIMethodsType } from "device/models"

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

export const DEFAULT_RESPONSES: MockResponsesMap = {
  API_CONFIGURATION: {
    GET: {
      status: ResponseStatus.Ok,
      body: {
        apiVersion: "1.0.0",
        lang: "en-US",
        variant: "black",
        features: ["mc-overview"],
        productId: "2006",
        vendorId: "0e8d",
        serialNumber: "0123456789ABCDEF",
      },
    },
  },
  MENU_CONFIGURATION: {
    GET: {
      status: ResponseStatus.Ok,
      body: {
        title: "Kompakt",
        menuItems: [
          {
            feature: "mc-overview",
            displayName: "Overview",
            icon: "overview",
          },
        ],
      },
    },
  },
  OUTBOX: {
    GET: {
      status: ResponseStatus.Ok,
      body: { features: [], data: [] },
    },
  },
  FEATURE_DATA: {
    GET: {
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
    },
  },
  FEATURE_CONFIGURATION: {
    GET: {
      status: ResponseStatus.Ok,
      body: {
        title: "Overview",
        summary: {
          show: true,
          showImg: true,
          imgVariant: "black",
          showSerialNumber: true,
          serialNumberLabel: "Serial number",
          showAbout: true,
          aboutTitle: "About your device",
          aboutIcon: "device",
          aboutSubtitle: "Device details",
          aboutFields: [
            {
              dataKey: "serialNumber",
              type: "detail-list-text",
              title: "Serial number",
            },
            {
              dataKey: "imei1",
              type: "detail-list-text",
              title: "IMEI (sim slot 1)",
            },
            {
              dataKey: "imei2",
              type: "detail-list-text",
              title: "IMEI (sim slot 2)",
            },
            {
              dataKey: "sar",
              type: "detail-list-modal",
              title: "SAR",
              buttonText: "Check SAR information",
            },
          ],
        },
        sections: [
          {
            title: "Status",
            type: "tile-list",
            dataKey: "status",
            fields: [
              { dataKey: "battery", type: "icon-text" },
              { dataKey: "airplane-mode", type: "icon-text" },
            ],
          },
          {
            dataKey: "update",
            type: "mc-overview-update",
            title: "Android OS",
            currentVersionKey: "version",
            showBadge: false,
            versionLabel: "Current version:",
          },
          {
            dataKey: "backup",
            type: "mc-overview-backup",
            title: "Backup",
            backupFeatures: [
              { label: "Contact list", key: "CONTACT_LIST" },
              { label: "Call log", key: "CALL_LOG" },
              { label: "Messages", key: "MESSAGES" },
              { label: "Notes", key: "NOTES" },
              { label: "Calendar events", key: "CALENDAR_EVENTS" },
              {
                label: "OS version & OS settings",
                key: "OS_VERSION_AND_SETTINGS",
              },
              { label: "App settings: Phone, Messages", key: "APP_SETTINGS" },
            ],
            restoreFeatures: [
              {
                label: "Contact list",
                feature: "CONTACT_LIST",
                keys: ["CONTACT_LIST"],
              },
              { label: "Call log", feature: "CALL_LOG", keys: ["CALL_LOG"] },
              { label: "Messages", feature: "MESSAGES", keys: ["MESSAGES"] },
              { label: "Notes", feature: "NOTES", keys: ["NOTES"] },
              {
                label: "Calendar events",
                feature: "CALENDAR_EVENTS",
                keys: ["CALENDAR_EVENTS"],
              },
              {
                label: "OS version & OS settings",
                feature: "OS_VERSION_AND_SETTINGS",
                keys: ["OS_VERSION_AND_SETTINGS"],
              },
              {
                label: "App settings: Phone, Messages",
                feature: "APP_SETTINGS",
                keys: ["APP_SETTINGS"],
              },
            ],
          },
        ],
      },
    },
  },
}
