import { MenuItemConstructorOptions } from "electron"

export interface MenuItem extends MenuItemConstructorOptions {
  devModeOnly?: boolean
}
