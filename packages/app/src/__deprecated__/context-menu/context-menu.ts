/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getCurrentWindow, Menu, MenuItem } from "@electron/remote"
import { ContextMenuItem } from "App/__deprecated__/context-menu/context-menu.interface"
import { AppHotkeys } from "App/__deprecated__/hotkeys/hotkeys.types"

interface DevModeProps {
  isEnabled?: () => boolean
  toggler: () => void
}

/**
 * Creates a new ContextMenu that allows to extend app's context menu
 * @class
 *
 * It has two basic options always available:
 * - Toggle developer mode (Command/Control + D)
 * - Toggle Developer Tools
 *
 * It can be extended by custom menu items. Each main menu item has its own
 * label with sub-items attached so the final structure will be as following:
 *    - Main menu 1
 *        - Sub-item 1
 *        - Sub-item 2
 *    - Main menu 2
 *        - Sub-item 1
 *        - Sub-item 2
 *        - Sub-item 3
 *
 * Main menu item is visible only if at least one sub-item is also visible.
 *
 * Each sub-item is visible only in developer mode by default, but it can be changed
 * by adding an additional property when registering items for given main menu:
 *    contextMenu.registerItems("Main menu 1", [
 *      {
 *        label: Sub-item 1",
 *        click: () => {},
 *        devModeOnly: false,
 *      },
 *    ])
 *
 * This ensures that main menu items and their sub-menus will only be visible
 * when needed.
 *
 * Sub-item's label is a static string by default but there's an additional prop
 * that allows to pass a function that can create a dynamic label:
 *    contextMenu.registerItems("Main menu 2", [
 *      {
 *        labelCreator: () => isSomethingTrue() ? "Sub-item true" : "Sub-item false",
 *        click: () => {},
 *      },
 *    ])
 */
class ContextMenu {
  private readonly isDevModeEnabled?: () => boolean
  private readonly devModeToggler?: () => void
  private contextMenu = new Menu()
  private customMenu: Record<string, ContextMenuItem[]> = {}

  constructor(devMode?: DevModeProps) {
    this.isDevModeEnabled = devMode?.isEnabled
    this.devModeToggler = devMode?.toggler
  }

  private addSeparator() {
    this.contextMenu.append(new MenuItem({ type: "separator" }))
  }

  private mapCustomItems() {
    const customMenuItems = Object.entries(this.customMenu)
    let firstItemAdded = false

    for (const [mainMenuLabel, menuItems] of customMenuItems) {
      const visibleMenuItems = menuItems
        .filter(({ visible }) => visible ?? true)
        .filter(({ devModeOnly }) => {
          if (this.isDevModeEnabled) {
            return (devModeOnly && this.isDevModeEnabled()) || !devModeOnly
          } else {
            return true
          }
        })

      if (visibleMenuItems.length > 0) {
        if (!firstItemAdded) {
          this.addSeparator()
          firstItemAdded = true
        }

        this.contextMenu.append(
          new MenuItem({
            label: mainMenuLabel,
            submenu: visibleMenuItems.map(
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ({ devModeOnly, labelCreator, ...options }) => ({
                label: labelCreator ? labelCreator() : options.label,
                ...options,
              })
            ),
          })
        )
      }
    }
  }

  private rebuildMenu({ clientX, clientY }: MouseEvent) {
    this.contextMenu = new Menu()

    if (this.isDevModeEnabled && this.devModeToggler) {
      this.contextMenu.append(
        new MenuItem({
          label: `${
            this.isDevModeEnabled() ? "Disable" : "Enable"
          } developer mode`,
          click: this.devModeToggler,
          accelerator: AppHotkeys.DevMode,
        })
      )
    }

    this.mapCustomItems()

    this.addSeparator()

    this.contextMenu.append(
      new MenuItem({
        label: "Inspect element",
        click: () => {
          getCurrentWindow().webContents.inspectElement(clientX, clientY)
        },
      })
    )

    this.contextMenu.append(
      new MenuItem({
        label: "Toggle Developer Tools",
        role: "toggleDevTools",
      })
    )
  }

  private showMenu(event: MouseEvent) {
    this.rebuildMenu(event)
    this.contextMenu.popup()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public init() {
    window.addEventListener(
      "contextmenu",
      (event) => this.showMenu(event),
      false
    )
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/ban-types
  public registerItem(mainLabel: string, menuItem: ContextMenuItem): Function {
    const newItem: ContextMenuItem = {
      devModeOnly: true,
      ...menuItem,
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line no-prototype-builtins
    if (this.customMenu.hasOwnProperty(mainLabel)) {
      const menuItems = this.customMenu[mainLabel]

      const label =
        newItem.label || (newItem.labelCreator && newItem.labelCreator())

      if (!menuItems.some((item) => item.label === label)) {
        menuItems.push(newItem)
      }
    } else {
      this.customMenu[mainLabel] = [newItem]
    }

    return () => {
      const menu = this.customMenu[mainLabel]
      delete menu[menu.indexOf(newItem)]
    }
  }

  public registerItems(
    mainLabel: string,
    menuItems: ContextMenuItem[]
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Function {
    const unregisterItemsFunctions = menuItems.map((item) =>
      this.registerItem(mainLabel, item)
    )
    return () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      unregisterItemsFunctions.forEach((unregister) => unregister())
    }
  }
}

export default ContextMenu
