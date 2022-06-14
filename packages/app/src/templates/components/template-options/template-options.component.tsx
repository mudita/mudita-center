/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { Actions } from "App/__deprecated__/renderer/components/core/table/table.component"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconButtonWithSecondaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { ElementWithTooltipPlace } from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { TemplateOptionsProps } from "App/templates/components/template-options/template-options.interface"
import { TemplateOptionsTestIds } from "App/templates/components/template-options/template-options-test-ids.enum"

const messages = defineMessages({
  dropdownTogglerTooltipDescription: {
    id: "component.dropdownTogglerTooltipDescription",
  },
})

export const TemplateOptions: FunctionComponent<TemplateOptionsProps> =
  React.memo(({ templateId, onDelete, onUpdate }) => {
    const handleDelete = () => {
      onDelete([templateId])
    }

    const handleUpdate = () => {
      onUpdate(templateId)
    }

    return (
      <Actions>
        <Dropdown
          data-testid={TemplateOptionsTestIds.OptionsDropDown}
          toggler={
            <IconButtonWithSecondaryTooltip
              iconType={IconType.More}
              description={messages.dropdownTogglerTooltipDescription}
              // FIXME: The position based on offset is a sticky. However, this is a quick workaround
              //  for buggy overridePosition lib feature
              place={ElementWithTooltipPlace.Bottom}
              offset={{ left: 15, bottom: 5 }}
            />
          }
        >
          <ButtonComponent
            labelMessage={{
              id: "module.templates.editButton",
            }}
            Icon={IconType.Edit}
            onClick={handleUpdate}
            displayStyle={DisplayStyle.Dropdown}
            data-testid={TemplateOptionsTestIds.EditButton}
          />
          <ButtonComponent
            labelMessage={{
              id: "module.templates.deleteButton",
            }}
            Icon={IconType.Delete}
            onClick={handleDelete}
            displayStyle={DisplayStyle.Dropdown}
            data-testid={TemplateOptionsTestIds.DeleteButton}
          />
        </Dropdown>
      </Actions>
    )
  })
