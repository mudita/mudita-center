/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType, Subview } from "generic-view/utils"
import { generateDeleteFiles } from "./delete-files"
import { McFileManagerConfig } from "generic-view/models"

const generateFileList: ComponentGenerator<
  McFileManagerConfig["categories"][number] & {
    id: string
    storagePath: string
  }
> = (
  key,
  { id, label, directoryPath, storagePath, entityType, supportedFileTypes }
) => {
  return {
    [`fileListContainer${key}${id}`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "form-fields",
        formKey: `storageForm${key}`,
        fields: [
          {
            providerField: "activeCategory",
            componentField: "data.render",
            condition: "eq",
            value: directoryPath,
          },
        ],
      },
      childrenKeys: [`fileListForm${key}${id}`],
    },
    [`fileListForm${key}${id}`]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            selectedItems: [],
            allItems: [],
          },
        },
      },
      childrenKeys: [`fileList${key}${id}`],
    },
    [`fileList${key}${id}`]: {
      component: "block-plain",
      config: {
        borderLeft: "1px solid #d2d6db",
      },
      layout: {
        width: "656px",
        gridLayout: {
          rows: [],
          columns: [],
        },
      },
      childrenKeys: [`fileListContent${key}${id}`],
    },
    [`fileListContent${key}${id}`]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: ["auto", "1fr"],
          columns: [],
        },
      },
      childrenKeys: [
        `fileListEmptyStateWrapper${key}${id}`,
        `fileListEmptyTableWrapper${key}${id}`,
      ],
    },
    [`fileListEmptyStateWrapper${key}${id}`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType: entityType,
        fields: [
          {
            modifier: "length",
            providerField: "totalEntities",
            componentField: "data.render",
            condition: "eq",
            value: 0,
          },
        ],
      },
      childrenKeys: [
        `fileListPanel${key}${id}`,
        `fileListEmptyState${key}${id}`,
      ],
    },
    [`fileListEmptyTableWrapper${key}${id}`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType: entityType,
        fields: [
          {
            modifier: "length",
            providerField: "totalEntities",
            componentField: "data.render",
            condition: "gt",
            value: 0,
          },
        ],
      },
      childrenKeys: [
        `fileListPanelManager${key}${id}`,
        `fileListEmptyTable${key}${id}`,
      ],
    },

    [`fileListPanelManager${key}${id}`]: {
      component: "block-plain",
      childrenKeys: [
        `fileListPanelDefaultMode${key}${id}`,
        `fileListPanelSelectMode${key}${id}`,
      ],
      layout: {
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 1,
        },
      },
    },
    [`fileListPanelDefaultMode${key}${id}`]: {
      component: "conditional-renderer",
      childrenKeys: [`fileListPanel${key}${id}`],
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.render",
            modifier: "length",
            condition: "eq",
            value: 0,
          },
        ],
      },
    },
    [`fileListPanel${key}${id}`]: {
      component: "block-plain",
      layout: {
        margin: "28px 32px",
        height: "40px",
        gridLayout: {
          rows: [],
          columns: ["auto", "auto"],
          alignItems: "center",
          justifyContent: "space-between",
        },
      },
      childrenKeys: [
        `fileListPanelHeaderWrapper${key}${id}`,
        `fileListEmptyStateAddFileButtonWrapper${key}${id}`,
      ],
    },
    [`fileListPanelHeaderWrapper${key}${id}`]: {
      component: "h3-component",
      childrenKeys: [`fileListPanelHeader${key}${id}`],
    },
    [`fileListPanelHeader${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate: `${label} {totalEntities, plural, =0 {} other { (#)}}`,
      },
      dataProvider: {
        source: "entities-metadata",
        entitiesType: entityType,
        fields: [
          {
            providerField: "totalEntities",
            componentField: "data.fields.totalEntities",
          },
        ],
      },
    },
    [`fileListEmptyStateAddFileButtonWrapper${key}${id}`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType: entityType,
        fields: [
          {
            modifier: "length",
            providerField: "totalEntities",
            componentField: "data.render",
            condition: "gt",
            value: 0,
          },
        ],
      },
      childrenKeys: [`fileListEmptyStateAddFileButton${key}${id}`],
    },
    [`fileListPanelSelectMode${key}${id}`]: {
      component: "conditional-renderer",
      childrenKeys: [`fileListPanelSelector${key}${id}`],
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.render",
            modifier: "length",
            condition: "gt",
            value: 0,
          },
        ],
      },
    },
    [`fileListPanelSelector${key}${id}`]: {
      component: "selection-manager",
      childrenKeys: [
        `selectAllCheckbox${key}${id}`,
        `selectedItemsCounter${key}${id}`,
        `deleteButton${key}${id}`,
      ],
      layout: {
        margin: "28px 32px",
        padding: "8px 24px 8px 12px",
        gridLayout: {
          rows: ["auto"],
          columns: ["auto", "1fr", "auto"],
          alignItems: "center",
          columnGap: "14px",
        },
      },
    },
    [`selectAllCheckbox${key}${id}`]: {
      component: "form.checkboxInput",
      config: {
        name: "selectedItems",
        size: "small",
      },
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "allItems",
            componentField: "config.multipleValues",
          },
        ],
      },
    },
    [`selectedItemsCounter${key}${id}`]: {
      component: "p4-component",
      childrenKeys: [`selectedItemsCounterText${key}${id}`],
    },
    [`selectedItemsCounterText${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "{selectedItems} {selectedItems, plural, one {file} other {files}} selected",
      },
      dataProvider: {
        source: "form-fields",
        fields: [
          {
            providerField: "selectedItems",
            componentField: "data.fields.selectedItems",
            modifier: "length",
          },
        ],
      },
    },
    [`deleteButton${key}${id}`]: {
      component: "button-text",
      config: {
        text: "Delete",
        icon: IconType.Delete,
        actions: [
          {
            type: "open-modal",
            modalKey: `deleteModal${key}${id}`,
            domain: "files-delete",
          },
        ],
        modifiers: ["uppercase"],
      },
    },
    ...generateDeleteFiles(key, {
      id,
      entityType,
    }),
    [`fileListEmptyState${key}${id}`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        padding: "0 0 96px 0",
      },
      childrenKeys: [
        `fileListEmptyStateHeader${key}${id}`,
        `fileListEmptyStateDescription${key}${id}`,
        `fileListEmptyStateAddFileButton${key}${id}`,
      ],
    },
    [`fileListEmptyStateHeader${key}${id}`]: {
      component: "h4-component",
      layout: {
        margin: "0 0 8px 0",
      },
      config: {
        text: "We couldn't find any files",
      },
    },
    [`fileListEmptyStateDescription${key}${id}`]: {
      component: "p3-component",
      layout: {
        margin: "0 auto 24px auto",
        width: "388px",
      },
      config: {
        text: "Add music files from your computer and they’ll transfer\nto your device automatically.",
        textAlign: "center",
      },
    },
    [`fileListEmptyStateAddFileButton${key}${id}`]: {
      component: "button-primary",
      layout: {
        width: "156px",
      },
      config: {
        text: "Add file",
        actions: [
          {
            type: "file-upload",
            storagePath: storagePath + directoryPath,
            fileTypes: supportedFileTypes,
            entitiesType: entityType,
          },
        ],
      },
    },
    [`fileListEmptyTable${key}${id}`]: {
      component: "table",
      config: {
        formOptions: {
          selectedIdsFieldName: "selectedItems",
          allIdsFieldName: "allItems",
        },
      },
      dataProvider: {
        entitiesType: entityType,
        source: "entities-array",
        sort: [
          {
            field: "fileName",
            priority: 1,
            direction: "asc",
            orderingPatterns: ["/^[a-zA-Z0-9]/u", "/^[^a-zA-Z0-9]/u"],
            sensitivity: "base",
          },
        ],
        filters: [
          {
            field: "filePath",
            patterns: [`/^${storagePath}/m`],
          },
        ],
      },
      childrenKeys: [
        `headerCellCheckbox${key}${id}`,
        `headerCellName${key}${id}`,
        `headerCellType${key}${id}`,
        `headerCellSize${key}${id}`,
        `columnCheckbox${key}${id}`,
        `columnName${key}${id}`,
        `columnType${key}${id}`,
        `columnSize${key}${id}`,
      ],
    },
    [`headerCellCheckbox${key}${id}`]: {
      component: "table.headerCell",
      config: {
        width: "74",
      },
      layout: {
        padding: "14px 0 12px 32px",
      },
    },
    [`headerCellName${key}${id}`]: {
      component: "table.headerCell",
      config: {
        width: "394px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`headerCellNameText${key}${id}`],
    },
    [`headerCellNameText${key}${id}`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Name",
      },
    },
    [`headerCellType${key}${id}`]: {
      component: "table.headerCell",
      config: {
        width: "94px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`headerCellTypeText${key}${id}`],
    },
    [`headerCellTypeText${key}${id}`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Type",
      },
    },
    [`headerCellSize${key}${id}`]: {
      component: "table.headerCell",
      config: {
        width: "88px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`headerCellSizeText${key}${id}`],
    },
    [`headerCellSizeText${key}${id}`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Size",
      },
    },
    [`columnCheckbox${key}${id}`]: {
      component: "table.cell",
      config: {
        width: "74",
      },
      layout: {
        padding: "0 0 0 32px",
      },
      childrenKeys: [`columnCheckboxTooltip${key}${id}`],
    },
    [`columnCheckboxTooltip${key}${id}`]: {
      component: "tooltip",
      config: {
        offset: {
          x: 16,
          y: 14,
        },
        placement: "bottom-right",
      },
      childrenKeys: [
        `contactCheckboxTooltipAnchor${key}${id}`,
        `contactCheckboxTooltipContent${key}${id}`,
      ],
    },
    [`contactCheckboxTooltipAnchor${key}${id}`]: {
      component: "tooltip.anchor",
      childrenKeys: [`contactCheckbox${key}${id}`],
    },
    [`contactCheckboxTooltipContent${key}${id}`]: {
      component: "tooltip.content",
      childrenKeys: [`contactCheckboxTooltipContentTextWrapper${key}${id}`],
    },
    [`contactCheckboxTooltipContentTextWrapper${key}${id}`]: {
      component: "p5-component",
      config: {
        color: "grey1",
      },
      childrenKeys: [`contactCheckboxTooltipContentText${key}${id}`],
    },
    [`contactCheckboxTooltipContentText${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate: "Select",
      },
    },
    [`contactCheckbox${key}${id}`]: {
      component: "form.checkboxInput",
      config: {
        name: "selectedItems",
        size: "small",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType: entityType,
        fields: [
          {
            providerField: "id",
            componentField: "config.value",
          },
        ],
      },
    },
    [`columnName${key}${id}`]: {
      component: "table.cell",
      config: {
        width: "394px",
      },
      layout: {
        padding: "0 32px 0 0",
      },
      childrenKeys: [`columnNameText${key}${id}`],
    },
    [`columnNameText${key}${id}`]: {
      component: "p1-component",
      config: {
        color: "black",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType: entityType,
        fields: [
          {
            providerField: "fileName",
            componentField: "config.text",
          },
        ],
      },
    },
    [`columnType${key}${id}`]: {
      component: "table.cell",
      config: {
        width: "94px",
      },
      childrenKeys: [`columnTypeText${key}${id}`],
    },
    [`columnTypeText${key}${id}`]: {
      component: "p3-component",
      config: {
        color: "black",
        textTransform: "uppercase",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType: entityType,
        fields: [
          {
            providerField: "extension",
            componentField: "config.text",
          },
        ],
      },
    },
    [`columnSize${key}${id}`]: {
      component: "table.cell",
      config: {
        width: "88px",
      },
      childrenKeys: [`columnSizeText${key}${id}`],
    },
    [`columnSizeText${key}${id}`]: {
      component: "p3-component",
      config: {
        color: "black",
        textTransform: "format-bytes",
        textTransformOptions: {
          minUnit: "KB",
        },
      },
      dataProvider: {
        source: "entities-field",
        entitiesType: entityType,
        fields: [
          {
            providerField: "fileSize",
            componentField: "config.text",
          },
        ],
      },
    },
  }
}

export const generateFileListWrapperKey = (key: string) => {
  return `fileListWrapper${key}`
}

export const generateFileListWrapper: ComponentGenerator<{
  storage: McFileManagerConfig["storages"][number]
  categories: McFileManagerConfig["categories"]
}> = (key, { storage, categories }): Subview => {
  const initialListConfig: Subview = {
    [generateFileListWrapperKey(key)]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: [],
          columns: [],
        },
      },
      childrenKeys: [],
    },
  }

  return categories.reduce((previousValue, category, index) => {
    const categoryItemKey = `fileListContainer${key}${index}`
    previousValue[
      generateFileListWrapperKey(key) as keyof typeof previousValue
    ]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileList(key, {
        id: index.toString(),
        ...category,
        directoryPath: category.directoryPath,
        storagePath: storage.path,
      }),
    }
    return previousValue
  }, initialListConfig)
}
