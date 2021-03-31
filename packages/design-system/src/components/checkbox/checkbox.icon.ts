import { Icons } from "Components/icon/icon.type"
import { IconType } from "Components/icon/icon.enum"
import CheckboxCheckedIcon from "Components/checkbox/img/checkbox-checked.svg"
import CheckboxDropdownIcon from "Components/checkbox/img/checkbox-dropdown.svg"
import CheckboxIndeterminateIcon from "Components/checkbox/img/checkbox-indeterminate.svg"

export const checkboxIcons: Icons = {
  [IconType.CheckboxChecked]: CheckboxCheckedIcon,
  [IconType.CheckboxDropdown]: CheckboxDropdownIcon,
  [IconType.CheckboxIndeterminate]: CheckboxIndeterminateIcon,
}
