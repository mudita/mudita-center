/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType, Subview } from "generic-view/utils"
import { generateDeleteFiles } from "./delete-files"
import { McFileManagerConfig } from "generic-view/models"
import {
  generateFileUploadButton,
  generateFileUploadButtonKey,
} from "./file-upload-button"

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
    [`${key}${id}fileListContainer`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "form-fields",
        formKey: `${key}storageForm`,
        fields: [
          {
            providerField: "activeCategory",
            componentField: "data.render",
            condition: "eq",
            value: directoryPath,
          },
        ],
      },
      childrenKeys: [`${key}${id}fileListForm`],
    },
    [`${key}${id}fileListForm`]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            selectedItems: [],
            allItems: [],
          },
        },
      },
      childrenKeys: [`${key}${id}fileList`],
    },
    [`${key}${id}fileList`]: {
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
      childrenKeys: [`${key}${id}fileListContent`],
    },
    [`${key}${id}fileListContent`]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: ["auto", "1fr"],
          columns: [],
        },
      },
      childrenKeys: [
        `${key}${id}fileListEmptyStateWrapper`,
        `${key}${id}fileListEmptyTableWrapper`,
      ],
    },
    [`${key}${id}fileListEmptyStateWrapper`]: {
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
        `${key}${id}fileListPanel`,
        `${key}${id}fileListEmptyState`,
      ],
    },
    [`${key}${id}fileListEmptyTableWrapper`]: {
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
        `${key}${id}fileListPanelManager`,
        `${key}${id}fileListEmptyTable`,
      ],
    },

    [`${key}${id}fileListPanelManager`]: {
      component: "block-plain",
      childrenKeys: [
        `${key}${id}fileListPanelDefaultMode`,
        `${key}${id}fileListPanelSelectMode`,
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
    [`${key}${id}fileListPanelDefaultMode`]: {
      component: "conditional-renderer",
      childrenKeys: [`${key}${id}fileListPanel`],
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
    [`${key}${id}fileListPanel`]: {
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
        `${key}${id}fileListPanelHeaderWrapper`,
        `${key}${id}fileListEmptyStateAddFileButtonWrapper`,
      ],
    },
    [`${key}${id}fileListPanelHeaderWrapper`]: {
      component: "h3-component",
      childrenKeys: [`${key}${id}fileListPanelHeader`],
    },
    [`${key}${id}fileListPanelHeader`]: {
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
    [`${key}${id}fileListEmptyStateAddFileButtonWrapper`]: {
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
      childrenKeys: [generateFileUploadButtonKey(`${key}${id}`)],
    },
    ...generateFileUploadButton(`${key}${id}`, {
      directoryPath,
      entityType,
      storagePath,
      supportedFileTypes,
    }),
    [`${key}${id}fileListPanelSelectMode`]: {
      component: "conditional-renderer",
      childrenKeys: [`${key}${id}fileListPanelSelector`],
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
    [`${key}${id}fileListPanelSelector`]: {
      component: "selection-manager",
      childrenKeys: [
        `${key}${id}selectAllCheckbox`,
        `${key}${id}selectedItemsCounter`,
        `${key}${id}deleteButton`,
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
    [`${key}${id}selectAllCheckbox`]: {
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
    [`${key}${id}selectedItemsCounter`]: {
      component: "p4-component",
      childrenKeys: [`${key}${id}selectedItemsCounterText`],
    },
    [`${key}${id}selectedItemsCounterText`]: {
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
    [`${key}${id}deleteButton`]: {
      component: "button-text",
      config: {
        text: "Delete",
        icon: IconType.Delete,
        actions: [
          {
            type: "open-modal",
            modalKey: `${key}${id}deleteModal`,
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
    [`${key}${id}fileListEmptyState`]: {
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
        `${key}${id}fileListEmptyStateHeader`,
        `${key}${id}fileListEmptyStateDescription`,
        generateFileUploadButtonKey(`${key}${id}`),
      ],
    },
    [`${key}${id}fileListEmptyStateHeader`]: {
      component: "h4-component",
      layout: {
        margin: "0 0 8px 0",
      },
      config: {
        text: "We couldn't find any files",
      },
    },
    [`${key}${id}fileListEmptyStateDescription`]: {
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
    [`${key}${id}fileListEmptyTable`]: {
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
        `${key}${id}headerCellCheckbox`,
        `${key}${id}headerCellName`,
        `${key}${id}headerCellType`,
        `${key}${id}headerCellSize`,
        `${key}${id}columnCheckbox`,
        `${key}${id}columnName`,
        `${key}${id}columnType`,
        `${key}${id}columnSize`,
      ],
    },
    [`${key}${id}headerCellCheckbox`]: {
      component: "table.headerCell",
      config: {
        width: "74",
      },
      layout: {
        padding: "14px 0 12px 32px",
      },
    },
    [`${key}${id}headerCellName`]: {
      component: "table.headerCell",
      config: {
        width: "394px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${key}${id}headerCellNameText`],
    },
    [`${key}${id}headerCellNameText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Name",
      },
    },
    [`${key}${id}headerCellType`]: {
      component: "table.headerCell",
      config: {
        width: "94px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${key}${id}headerCellTypeText`],
    },
    [`${key}${id}headerCellTypeText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Type",
      },
    },
    [`${key}${id}headerCellSize`]: {
      component: "table.headerCell",
      config: {
        width: "88px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${key}${id}headerCellSizeText`],
    },
    [`${key}${id}headerCellSizeText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Size",
      },
    },
    [`${key}${id}columnCheckbox`]: {
      component: "table.cell",
      config: {
        width: "74",
      },
      layout: {
        padding: "0 0 0 32px",
      },
      childrenKeys: [`${key}${id}columnCheckboxTooltip`],
    },
    [`${key}${id}columnCheckboxTooltip`]: {
      component: "tooltip",
      config: {
        offset: {
          x: 16,
          y: 14,
        },
        placement: "bottom-right",
      },
      childrenKeys: [
        `${key}${id}contactCheckboxTooltipAnchor`,
        `${key}${id}contactCheckboxTooltipContent`,
      ],
    },
    [`${key}${id}contactCheckboxTooltipAnchor`]: {
      component: "tooltip.anchor",
      childrenKeys: [`${key}${id}contactCheckbox`],
    },
    [`${key}${id}contactCheckboxTooltipContent`]: {
      component: "tooltip.content",
      childrenKeys: [`${key}${id}contactCheckboxTooltipContentTextWrapper`],
    },
    [`${key}${id}contactCheckboxTooltipContentTextWrapper`]: {
      component: "p5-component",
      config: {
        color: "grey1",
      },
      childrenKeys: [`${key}${id}contactCheckboxTooltipContentText`],
    },
    [`${key}${id}contactCheckboxTooltipContentText`]: {
      component: "format-message",
      config: {
        messageTemplate: "Select",
      },
    },
    [`${key}${id}contactCheckbox`]: {
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
    [`${key}${id}columnName`]: {
      component: "table.cell",
      config: {
        width: "394px",
      },
      layout: {
        padding: "0 32px 0 0",
      },
      childrenKeys: [`${key}${id}columnNameText`],
    },
    [`${key}${id}columnNameText`]: {
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
    [`${key}${id}columnType`]: {
      component: "table.cell",
      config: {
        width: "94px",
      },
      childrenKeys: [`${key}${id}columnTypeText`],
    },
    [`${key}${id}columnTypeText`]: {
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
    [`${key}${id}columnSize`]: {
      component: "table.cell",
      config: {
        width: "88px",
      },
      childrenKeys: [`${key}${id}columnSizeText`],
    },
    [`${key}${id}columnSizeText`]: {
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
  return `${key}fileListWrapper`
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
    const categoryItemKey = `${key}${index}fileListContainer`
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
