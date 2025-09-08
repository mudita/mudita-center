/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McContactsDuplicatesView } from "generic-view/models"

export const generateMcContactsDuplicatesView: ComponentGenerator<
  McContactsDuplicatesView
> = (key, config) => {
  return {
    [key]: {
      component: "block-plain",
      config: {
        backgroundColor: "white",
      },
      layout: {
        width: "100%",
        height: "100%",
        gridLayout: {
          rows: ["auto", "1fr"],
          columns: ["1fr"],
        },
      },
      childrenKeys: ["emptyListWrapper"],
    },
    emptyListWrapper: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType: "contacts",
        fields: [
          {
            modifier: "length",
            providerField: "totalDuplicates",
            componentField: "data.render",
            condition: "eq",
            value: 0,
          },
        ],
      },
      childrenKeys: ["fullScreenWrapper"],
    },
    fullScreenWrapper: {
      component: "block-plain",
      childrenKeys: [
        "emptyStateIcon",
        "emptyStateText",
        "importContactsButton",
      ],
      layout: {
        flexLayout: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "24px",
        },
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 2,
        },
      },
    },
    emptyStateIcon: {
      component: "modal.titleIcon",
      config: {
        type: IconType.ContactsBook,
      },
    },
    emptyStateText: {
      component: "block-plain",
      childrenKeys: ["emptyStateTitle", "emptyStateDetailText"],
      layout: {
        flexLayout: {
          direction: "column",
          alignItems: "center",
          rowGap: "8px",
        },
      },
    },
    emptyStateTitle: {
      component: "typography.h3",
      config: {
        text: "We couldn't find any duplicates",
      },
    },
    emptyStateDetailText: {
      component: "typography.p1",
      config: {
        text: "If we detect any new duplicates, we'll list them here.",
      },
    },
  }
}
