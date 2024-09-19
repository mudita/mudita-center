/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { useParams } from "react-router"
import { GenericThemeProvider } from "generic-view/theme"
import RecursiveLayout from "./recursive-layout"
import GenericModals from "./generic-modals"
import { useDevConsole } from "./use-dev-console"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useDispatch, useSelector } from "react-redux"
import { selectActiveApiDeviceId, setGenericConfig } from "generic-view/store"
import { View } from "generic-view/utils"

export const GenericView: FunctionComponent = () => {
  useDevConsole()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)
  const { viewKey, subviewKey } = useParams<{
    viewKey: string
    subviewKey?: string
  }>()
  const currentViewKey = subviewKey || viewKey

  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let newConfig: View = {}
  if (currentViewKey === "contacts") {
    newConfig = {
      main: {
        // @ts-ignore
        screenTitle: "Contacts",
        component: "block-plain",
        layout: {
          gridLayout: {
            rows: ["auto", "1fr"],
            columns: ["1fr"],
          },
        },
        childrenKeys: ["importContactsButton", "contactsLoader"],
      },
      contactsLoader: {
        component: "entities-loader",
        config: {
          entitiesTypes: ["contacts"],
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
        childrenKeys: ["columnCheckbox", "columnName", "columnOptional"],
      },
      columnCheckbox: {
        component: "table.cell",
        config: {
          width: 40,
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
      columnName: {
        component: "table.cell",
        config: {
          width: 300,
        },
        childrenKeys: ["contactJoinedNames"],
      },
      contactJoinedNames: {
        component: "block-plain",
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
      columnOptional: {
        component: "form.conditionalRenderer",
        config: {
          formFieldName: "activeContactId",
          renderIfFalse: true,
        },
        childrenKeys: ["columnCompany"],
      },
      columnCompany: {
        component: "table.cell",
        config: {
          width: 200,
        },
        childrenKeys: ["contactCompany"],
      },
      contactCompany: {
        component: "text-plain",
        dataProvider: {
          source: "entities-field",
          entitiesType: "contacts",
          fields: {
            "data.text": "company",
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
  }

  useEffect(() => {
    if (newConfig) {
      dispatch(
        setGenericConfig({
          feature: "contacts",
          deviceId: activeDeviceId!,
          // @ts-ignore
          config: newConfig,
        })
      )
    }
  }, [activeDeviceId, dispatch, newConfig])

  return (
    <GenericThemeProvider>
      <RecursiveLayout viewKey={currentViewKey} componentKey={"main"} />
      <GenericModals viewKey={currentViewKey} />
    </GenericThemeProvider>
  )
}

export default GenericView
