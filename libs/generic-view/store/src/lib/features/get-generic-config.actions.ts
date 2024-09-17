/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { View } from "generic-view/utils"
import { getFeatureConfigRequest } from "device/feature"
import { transformGenericComponents } from "./transform-generic-components"
import { mergeWith } from "lodash"

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
    const response = await getFeatureConfigRequest(deviceId, feature)

    if (response.ok) {
      let data = response.data
      // TODO: Remove after implementing the real feature configuration on the device
      if (feature === "contacts") {
        const newConfig = {
          main: {
            screenTitle: "Contacts",
            component: "block-plain",
            layout: {
              flexLayout: {
                direction: "column",
                justifyContent: "stretch",
                alignItems: "stretch",
              },
            },
            childrenKeys: ["importContactsButton", "contactsLoader"],
          },
          contactsLoader: {
            component: "entities-loader",
            config: {
              entitiesTypes: ["contacts"],
            },
            layout: {
              flexLayout: {
                direction: "column",
              },
            },
            childrenKeys: ["contactsForm"],
          },
          contactsForm: {
            component: "form",
            config: {
              formOptions: {
                defaultValues: {
                  activeContactId: undefined,
                  selectedContacts: [],
                  totalContacts: 0,
                },
              },
            },
            childrenKeys: ["contactsFormWrapper"],
          },
          contactsFormWrapper: {
            component: "block-box",
            layout: {
              flexLayout: {
                direction: "row",
              },
            },
            childrenKeys: ["contactsListTable", "detailsWrapper"],
          },
          contactsListTable: {
            component: "table",
            dataProvider: {
              source: "entities-array",
              entitiesType: "contacts",
              sort: {
                firstName: {
                  priority: 2,
                  direction: "asc",
                },
                lastName: {
                  priority: 1,
                  direction: "asc",
                  orderingPatterns: ["/^\\p{L}/miu", "/^\\d/m", "/^\\#/m"],
                },
              },
              filters: {
                firstName: ["/.+/"],
              },
            },
            config: {
              formOptions: {
                activeIdFieldName: "activeContactId",
                selectedIdsFieldName: "selectedContacts",
                totalItemsFieldName: "totalContacts",
              },
            },
            childrenKeys: ["columnCheckbox", "columnOptional"],
          },
          columnCheckbox: {
            component: "table.cell",
            config: {
              width: "1rem",
            },
            childrenKeys: ["contactCheckbox"],
          },
          contactCheckbox: {
            component: "form.checkboxInput",
            config: {
              name: "selectedContacts",
            },
            dataProvider: {
              source: "entities-field",
              entitiesType: "contacts",
              fields: {
                "config.value": "contactId",
              },
            },
          },
          columnOptional: {
            component: "form.conditionalRenderer",
            config: {
              formFieldName: "activeContactId",
              renderIfFalse: true,
            },
            childrenKeys: ["columnName"],
          },
          columnName: {
            component: "table.cell",
            config: {
              width: "100%",
            },
            layout: {
              flexLayout: {
                direction: "row",
                columnGap: "0.5rem",
              },
            },
            childrenKeys: ["contactFirstName", "contactLastName"],
          },
          contactFirstName: {
            component: "block-plain",
            layout: {
              flexLayout: {
                direction: "row",
                columnGap: "0.5rem",
              },
            },
            childrenKeys: ["contactFirstNamePrefix", "contactFirstNameValue"],
          },
          contactFirstNamePrefix: {
            component: "text-plain",
            dataProvider: {
              source: "entities-field",
              entitiesType: "contacts",
              fields: {
                "data.text": "namePrefix",
              },
            },
          },
          contactFirstNameValue: {
            component: "text-plain",
            dataProvider: {
              source: "entities-field",
              entitiesType: "contacts",
              fields: {
                "data.text": "firstName",
              },
            },
          },
          contactLastName: {
            component: "text-plain",
            dataProvider: {
              source: "entities-field",
              entitiesType: "contacts",
              fields: {
                "data.text": "lastName",
              },
            },
          },
          detailsWrapper: {
            component: "form.conditionalRenderer",
            config: {
              formFieldName: "activeContactId",
            },
            childrenKeys: ["details"],
          },
          details: {
            component: "block-box",
            config: {
              title: "Contact",
              subtitle: "details",
            },
            dataProvider: {
              source: "form-fields",
              fields: {
                dataItemId: "activeContactId",
              },
            },
            childrenKeys: ["contactDetails", "disableButton"],
          },
          contactDetails: {
            component: "block-plain",
            childrenKeys: ["contactDetailsEmail", "contactDetailsName"],
          },
          contactDetailsEmail: {
            component: "text-plain",
            dataProvider: {
              source: "entities-field",
              entitiesType: "contacts",
              fields: {
                "data.text": "email",
              },
            },
          },
          contactDetailsName: {
            component: "text-plain",
            dataProvider: {
              source: "entities-field",
              entitiesType: "contacts",
              fields: {
                "data.text": "firstName",
              },
            },
          },
          disableButton: {
            component: "button-primary",
            config: {
              text: "Hide details",
              action: {
                type: "form-set-field",
                key: "activeContactId",
                value: undefined,
              },
            },
          },
        }

        data = mergeWith(data, newConfig, (obj, src) => {
          if (Array.isArray(obj)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return src
          }
          return undefined
        })
      }
      const fullView = transformGenericComponents(data)

      return { deviceId, feature, view: fullView }
    }

    return rejectWithValue(undefined)
  }
)
