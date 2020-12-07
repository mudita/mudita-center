import store from "Renderer/store"
import * as electron from "electron"
import { MenuItemConstructorOptions } from "electron"

const isDevModeEnabled = () => store.getState().devMode.devModeEnabled

export class ContextMenu {
  contextMenu = new electron.remote.Menu()
  menuItems: Record<string, MenuItemConstructorOptions[]> = {}
  options: MenuItemConstructorOptions[] = []

  constructor() {
    window.addEventListener("contextmenu", () => this.showMenu(), false)
  }

  private rebuildMenu() {
    this.contextMenu = new electron.remote.Menu()

    this.contextMenu.append(
      new electron.remote.MenuItem({
        label: `${isDevModeEnabled() ? "Disable" : "Enable"} developer mode`,
        click: () => {
          store.dispatch.devMode.toggle()
        },
      })
    )

    if (isDevModeEnabled()) {
      const mainLabels = Object.keys(this.menuItems)

      if (mainLabels.length > 0) {
        this.contextMenu.append(
          new electron.remote.MenuItem({ type: "separator" })
        )

        for (const label of mainLabels) {
          const items = this.menuItems[label]
          this.contextMenu.append(
            new electron.remote.MenuItem({ label, submenu: items })
          )
        }
      }
    }

    this.contextMenu.append(new electron.remote.MenuItem({ type: "separator" }))

    this.contextMenu.append(
      new electron.remote.MenuItem({
        label: "Toggle Developer Tools",
        role: "toggleDevTools",
      })
    )
  }

  private showMenu() {
    this.rebuildMenu()
    this.contextMenu.popup()
  }

  public registerItem(mainLabel: string, options: MenuItemConstructorOptions) {
    if (this.menuItems.hasOwnProperty(mainLabel)) {
      if (
        this.menuItems[mainLabel].some((item) => item.label === options.label)
      ) {
        console.error(
          `You are trying to add another option under "${mainLabel}" context menu with the same label: "${options.label}".`
        )
        return
      }

      this.menuItems[mainLabel].push(options)
    } else {
      this.menuItems[mainLabel] = [options]
    }
  }

  public registerItems(mainLabel: string, items: MenuItemConstructorOptions[]) {
    items.forEach((item) => this.registerItem(mainLabel, item))
  }
}

const contextMenu = new ContextMenu()

export default contextMenu
