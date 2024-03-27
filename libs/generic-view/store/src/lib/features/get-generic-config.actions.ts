/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { View } from "generic-view/utils"

export const getGenericConfig = createAsyncThunk<
  {
    view: View
    feature: string
    deviceId: DeviceId
  },
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetGenericConfig,
  async ({ deviceId, feature }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1))

    return {
      deviceId,
      feature,
      view: {
        main: {
          screenTitle: "asd",
          component: "block-plain",
          childrenKeys: ["full-screen-wrapper"],
          layout: {
            flexLayout: {
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          },
        },
        "full-screen-wrapper": {
          component: "block-plain",
          childrenKeys: ["title", "detail-text", "import-button"],
          layout: {
            flexLayout: {
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
              rowGap: "8px",
              columnGap: "8px",
            },
          },
        },
        title: {
          component: "h3-component",
          config: {
            text: "Import your contacts",
          },
        },
        "detail-text": {
          component: "p1-component",
          config: {
            text: "Import all your contacts from a single source.",
          },
        },
        "import-button": {
          component: "button-primary",
          config: {
            text: "import contacts",
            action: {
              type: "open-modal",
              modalKey: "import-contacts-modal",
              domain: "import-contacts",
            },
          },
          layout: {
            margin: "16px",
          },
        },
        "import-contacts-modal": {
          component: "modal",
          config: {
            variant: "small",
          },
          childrenKeys: ["import-contacts-modal-content"],
        },
        "import-contacts-modal-content": {
          component: "import-contacts",
          config: {
            features: [],
            modalKey: "import-contacts-modal",
          },
        },
      },
    }

    // const response = await getOverviewConfigRequest(deviceId)
    // if (response.ok) {
    //   return {
    //     view: generateMcOverviewLayout(response.data),
    //     deviceId,
    //   }
    // }
    // return rejectWithValue(response.error)
  }
)
