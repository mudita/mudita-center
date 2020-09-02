import { storiesOf } from "@storybook/react"
import React from "react"
import ContactModal from "Renderer/components/rest/contact-modal/contact-modal.component"
import { StoryModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import { action } from "@storybook/addon-actions"
import Story from "Renderer/components/storybook/story.component"

const log = `[2020-04-15 13:23:05.385] [info] Checking for update
[2020-04-15 13:23:06.244] [error] Error: HttpError: 404 Not Found
method: GET url: https://github.com/Appnroll/pure-desktop-app/releases.atom
Please double check that your authentication token is correct. Due to security reasons actual status maybe not reported, but 404.
[2020-04-16 18:06:14.581] [info] Checking for update
[2020-04-16 18:06:15.699] [info] Found version 0.1.0 (url: PureDesktopApp-0.1.0-mac.zip, PureDesktopApp-0.1.0.dmg)
[2020-04-16 18:06:21.129] [info] Downloading update from PureDesktopApp-0.1.0-mac.zip, PureDesktopApp-0.1.0.dmg
[2020-04-16 18:06:21.138] [info] Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: H9syH3GumCYEdjV7LWV5TzG/L3qWrTEItvDxkcv+RgdS7Mszbs/kALarrq+vMXW1Jtfjz89BjPJ4ggtuz2aPkg==, expected: 7qs2osrevwR9N+X7i98YGcM/iNpM0KIWd7Q+YHDqk032il1TYKsTJzMm/p99NBTDYa/wACwVbaNP0/oK3Fsr3A==. Directory for cached update will be cleaned
[2020-04-16 18:08:53.762] [info] New version 0.1.0 has been downloaded to /Users/mike/Library/Application Support/Caches/pure-desktop-app-updater/pending/PureDesktopApp-0.1.0-mac.zip
[2020-04-16 18:08:53.806] [info] / requested
[2020-04-16 18:08:53.810] [info] /1587053333765-9664.zip requested
[2020-04-16 18:08:53.811] [info] /1587053333765-9664.zip requested by Squirrel.Mac, pipe /Users/mike/Library/Application Support/Caches/pure-desktop-app-updater/pending/PureDesktopApp-0.1.0-mac.zip
[2020-04-16 18:08:59.174] [info] Proxy server for native Squirrel.Mac is closed (was started to download https://mudita-desktop-app.s3.amazonaws.com/app/PureDesktopApp-0.1.0-mac.zip)
[2020-04-21 15:03:56.209] [info] Checking for update
[2020-04-21 15:03:57.018] [info] Found version 0.1.0 (url: PureDesktopApp-0.1.0-mac.zip, PureDesktopApp-0.1.0.dmg)
`

storiesOf("Components/Rest/Contact Modal", module).add("Default", () => (
  <Story transparentMode>
    <StoryModalWrapper>
      <ContactModal
        onClose={action("Close")}
        onSend={action("Send")}
        log={log}
      />
    </StoryModalWrapper>
  </Story>
))
