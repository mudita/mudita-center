import * as electron from "electron"
import { MenuItem } from "App/context-menu/context-menu.types"
import { AppHotkeys } from "App/hotkeys/hotkeys.types"

interface DevModeProps {
  isEnabled: () => boolean
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
  private contextMenu = new electron.remote.Menu()
  private customMenu: Record<string, MenuItem[]> = {}

  constructor(devMode?: DevModeProps) {
    this.isDevModeEnabled = devMode?.isEnabled
    this.devModeToggler = devMode?.toggler
  }

  private addSeparator() {
    this.contextMenu.append(new electron.remote.MenuItem({ type: "separator" }))
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
          new electron.remote.MenuItem({
            label: mainMenuLabel,
            submenu: visibleMenuItems.map(
              ({ devModeOnly, labelCreator, ...options }) => ({
                label: labelCreator ? labelCreator() : options.label,
                ...options,
              }),
            ),
          }),
        )
      }
    }
  }

  private rebuildMenu() {
    this.contextMenu = new electron.remote.Menu()

    if (this.isDevModeEnabled && this.devModeToggler) {
      this.contextMenu.append(
        new electron.remote.MenuItem({
          label: `${
            this.isDevModeEnabled() ? "Disable" : "Enable"
          } developer mode`,
          click: this.devModeToggler,
          accelerator: AppHotkeys.DevMode,
        }),
      )
    }

    this.mapCustomItems()

    this.addSeparator()

    this.contextMenu.append(
      new electron.remote.MenuItem({
        label: "Toggle Developer Tools",
        role: "toggleDevTools",
      }),
    )
  }

  private showMenu() {
    this.rebuildMenu()
    this.contextMenu.popup()
  }

  public init() {
    window.addEventListener("contextmenu", () => this.showMenu(), false)
  }

  public registerItem(mainLabel: string, menuItem: MenuItem) {
    const newItem: MenuItem = {
      devModeOnly: true,
      ...menuItem,
    }

    if (this.customMenu.hasOwnProperty(mainLabel)) {
      const menuItems = this.customMenu[mainLabel]

      if (menuItems.some((item) => item.label === newItem.label)) {
        console.warn(
          `Duplicate found during registering custom context menu items. "${mainLabel}" > "${newItem.label}" already exists.`,
        )
      }

      menuItems.push(newItem)
    } else {
      this.customMenu[mainLabel] = [newItem]
    }
  }

  public registerItems(mainLabel: string, menuItems: MenuItem[]) {
    menuItems.forEach((item) => this.registerItem(mainLabel, item))
  }
}

export default ContextMenu
