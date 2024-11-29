/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentPropsByName } from "generic-view/utils"

interface FileListConfig {
  id: string
  name: string
  entitiesType: string
}

const generateFileList = ({
  id,
  name,
  entitiesType,
}: FileListConfig): {
  [key: string]: ComponentPropsByName
} => {
  return {
    [`${id}fileListContainer`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "form-fields",
        formKey: "fileManagerForm",
        fields: [
          {
            providerField: "activeFileCategoryId",
            componentField: "data.render",
            condition: "eq",
            value: id,
          },
        ],
      },
      childrenKeys: [`${id}fileListForm`],
    },
    [`${id}fileListForm`]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            selectedItems: [],
          },
        },
      },
      childrenKeys: [`${id}fileList`],
    },
    [`${id}fileList`]: {
      component: "block-plain",
      config: {
        borderLeft: "1px solid #d2d6db",
      },
      layout: {
        width: "656px",
        gridLayout: {
          rows: ["auto", "1fr"],
          columns: [],
        },
      },
      childrenKeys: [`${id}fileListPanel`, `${id}fileListContent`],
    },
    [`${id}fileListPanel`]: {
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
        `${id}fileListPanelHeaderWrapper`,
        `${id}fileListEmptyStateAddFileButtonWrapper`,
      ],
    },
    [`${id}fileListPanelHeaderWrapper`]: {
      component: "h3-component",
      childrenKeys: [`${id}fileListPanelHeader`],
    },
    [`${id}fileListPanelHeader`]: {
      component: "format-message",
      config: {
        messageTemplate: `${name} {totalEntities, plural, =0 {} other { (#)}}`,
      },
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
        fields: [
          {
            providerField: "totalEntities",
            componentField: "data.fields.totalEntities",
          },
        ],
      },
    },
    [`${id}fileListEmptyStateAddFileButtonWrapper`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
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
      childrenKeys: [`${id}fileListEmptyStateAddFileButton`],
    },
    [`${id}fileListContent`]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: [],
          columns: [],
        },
      },
      childrenKeys: [
        `${id}fileListEmptyStateWrapper`,
        `${id}fileListEmptyTableWrapper`,
      ],
    },
    [`${id}fileListEmptyStateWrapper`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
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
      childrenKeys: [`${id}fileListEmptyState`],
    },
    [`${id}fileListEmptyState`]: {
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
        `${id}fileListEmptyStateHeader`,
        `${id}fileListEmptyStateDescription`,
        `${id}fileListEmptyStateAddFileButton`,
      ],
    },
    [`${id}fileListEmptyStateHeader`]: {
      component: "h4-component",
      layout: {
        margin: "0 0 8px 0",
      },
      config: {
        text: "We couldn't find any files",
      },
    },
    [`${id}fileListEmptyStateDescription`]: {
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
    [`${id}fileListEmptyStateAddFileButton`]: {
      component: "button-primary",
      layout: {
        width: "156px",
      },
      config: {
        text: "Add file",
        actions: [],
      },
    },
    [`${id}fileListEmptyTableWrapper`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
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
      childrenKeys: [`${id}fileListEmptyTable`],
    },
    [`${id}fileListEmptyTable`]: {
      component: "table",
      config: {
        formOptions: {
          selectedIdsFieldName: "selectedItems",
        },
      },
      dataProvider: {
        entitiesType,
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
      },
      childrenKeys: [
        `${id}headerCellCheckbox`,
        `${id}headerCellName`,
        `${id}headerCellType`,
        `${id}headerCellSize`,
        `${id}columnCheckbox`,
        `${id}columnName`,
        `${id}columnType`,
        `${id}columnSize`,
      ],
    },
    [`${id}headerCellCheckbox`]: {
      component: "table.headerCell",
      config: {
        width: "74",
      },
      layout: {
        padding: "14px 0 12px 32px",
      },
    },
    [`${id}headerCellName`]: {
      component: "table.headerCell",
      config: {
        width: "394px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${id}headerCellNameText`],
    },
    [`${id}headerCellNameText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Name",
      },
    },
    [`${id}headerCellType`]: {
      component: "table.headerCell",
      config: {
        width: "94px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${id}headerCellTypeText`],
    },
    [`${id}headerCellTypeText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Type",
      },
    },
    [`${id}headerCellSize`]: {
      component: "table.headerCell",
      config: {
        width: "88px",
      },
      layout: {
        padding: "14px 0 12px 0",
      },
      childrenKeys: [`${id}headerCellSizeText`],
    },
    [`${id}headerCellSizeText`]: {
      component: "p5-component",
      config: {
        textTransform: "uppercase",
        text: "Size",
      },
    },
    [`${id}columnCheckbox`]: {
      component: "table.cell",
      config: {
        width: "74",
      },
      layout: {
        padding: "0 0 0 32px",
      },
      childrenKeys: [`${id}columnCheckboxTooltip`],
    },
    [`${id}columnCheckboxTooltip`]: {
      component: "tooltip",
      config: {
        offset: {
          x: 15,
          y: 15,
        },
        placement: "bottom-right",
      },
      childrenKeys: [
        `${id}contactCheckboxTooltipAnchor`,
        `${id}contactCheckboxTooltipContent`,
      ],
    },
    [`${id}contactCheckboxTooltipAnchor`]: {
      component: "tooltip.anchor",
      childrenKeys: [`${id}contactCheckbox`],
    },
    [`${id}contactCheckboxTooltipContent`]: {
      component: "tooltip.content",
      childrenKeys: [`${id}contactCheckboxTooltipContentTextWrapper`],
    },
    [`${id}contactCheckboxTooltipContentTextWrapper`]: {
      component: "p5-component",
      config: {
        color: "grey1",
      },
      childrenKeys: [`${id}contactCheckboxTooltipContentText`],
    },
    [`${id}contactCheckboxTooltipContentText`]: {
      component: "format-message",
      config: {
        messageTemplate: "Select",
      },
    },
    [`${id}contactCheckbox`]: {
      component: "form.checkboxInput",
      config: {
        name: "selectedItems",
        size: "small",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType,
        fields: [
          {
            providerField: "id",
            componentField: "config.value",
          },
        ],
      },
    },
    [`${id}columnName`]: {
      component: "table.cell",
      config: {
        width: "394px",
      },
      childrenKeys: [`${id}columnNameText`],
    },
    [`${id}columnNameText`]: {
      component: "p1-component",
      config: {
        color: "black",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType,
        fields: [
          {
            providerField: "fileName",
            componentField: "config.text",
          },
        ],
      },
    },
    [`${id}columnType`]: {
      component: "table.cell",
      config: {
        width: "94px",
      },
      childrenKeys: [`${id}columnTypeText`],
    },
    [`${id}columnTypeText`]: {
      component: "p3-component",
      config: {
        color: "black",
        textTransform: "uppercase",
      },
      dataProvider: {
        source: "entities-field",
        entitiesType,
        fields: [
          {
            providerField: "extension",
            componentField: "config.text",
          },
        ],
      },
    },
    [`${id}columnSize`]: {
      component: "table.cell",
      config: {
        width: "88px",
      },
      childrenKeys: [`${id}columnSizeText`],
    },
    [`${id}columnSizeText`]: {
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
        entitiesType,
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

export const generateFileListWrapper = ({
  configs,
}: {
  configs: FileListConfig[]
}): {
  [key: string]: ComponentPropsByName
} => {
  const initialListConfig: { [key: string]: ComponentPropsByName } = {
    fileListWrapper: {
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

  return configs.reduce((previousValue, config) => {
    const categoryItemKey = `${config.id}fileListContainer`
    previousValue["fileListWrapper"]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileList(config),
    }
    return previousValue
  }, initialListConfig)
}
