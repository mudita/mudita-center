import { storiesOf } from "@storybook/react"
import React from "react"
import ContactModal from "Renderer/components/core/contact-modal/contact-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import { action } from "@storybook/addon-actions"

const log = `[2020-04-15 13:23:05.385] [info] Checking for update
[2020-04-15 13:23:06.244] [error] Error: HttpError: 404 Not Found
"method: GET url: https://github.com/Appnroll/pure-desktop-app/releases.atom\\n\\nPlease double check that your authentication token is correct. Due to security reasons actual status maybe not reported, but 404.\\n"
Headers: {
  "server": "GitHub.com",
  "date": "Wed, 15 Apr 2020 11:23:06 GMT",
  "content-type": "text/plain; charset=utf-8",
  "status": "404 Not Found",
  "vary": "X-PJAX, Accept-Encoding, Accept, X-Requested-With",
  "cache-control": "no-cache",
  "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
  "x-frame-options": "deny",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block",
  "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
  "expect-ct": "max-age=2592000, report-uri=\\"https://api.github.com/_private/browser/errors\\"",
  "content-security-policy": "default-src 'none'; base-uri 'self'; connect-src 'self'; form-action 'self'; img-src 'self' data:; script-src 'self'; style-src 'unsafe-inline'",
  "content-encoding": "gzip",
  "set-cookie": [
    "_gh_sess=QgtndTHTjq58Ab8M57RcKM7peO9RghCNcDC7zbjnPPcyN5ql%2F%2F%2F7e472LTyAz4xo3mua6xf1Kguhx3FzQVp9yc%2FhxOlKY5M0MZLVv%2B15OunBcWo5u3zRtkXXrB%2FOe3ZRUEUDNc2gIXaLQqTXCocO6yn8igXEBmOccZuPdhgRRXCK4xnU0%2BFiYoNWeH%2BM3mR710294X630E8Ya2B2NSrFDGbuFLksSm%2BiygulhX416GQlqg9z5eNItX0eciEJ9IWD%2BzxeybvggG3k0BEEL%2Bplrg%3D%3D--7UOoVakbY%2BKe7ZMi--Co%2BcaWoPvrNBAndxNUroAA%3D%3D; Path=/; HttpOnly; Secure",
    "_octo=GH1.1.790093711.1586949786; Path=/; Domain=github.com; Expires=Thu, 15 Apr 2021 11:23:06 GMT; Secure",
    "logged_in=no; Path=/; Domain=github.com; Expires=Thu, 15 Apr 2021 11:23:06 GMT; HttpOnly; Secure"
  ],
  "content-length": "40",
  "x-github-request-id": "115F:3510:DA81CE:1437196:5E96EE99"
}
    at f (/Applications/Ampps/www/updates/last/mac/PureDesktopApp.app/Contents/Resources/app.asar/dist/main.js:1:48477)
    at o.handleResponse (/Applications/Ampps/www/updates/last/mac/PureDesktopApp.app/Contents/Resources/app.asar/dist/main.js:1:50104)
    at ClientRequest.<anonymous> (/Applications/Ampps/www/updates/last/mac/PureDesktopApp.app/Contents/Resources/app.asar/dist/main.js:1:49573)
    at ClientRequest.emit (events.js:203:13)
    at SimpleURLLoaderWrapper.<anonymous> (electron/js2c/browser_init.js:2536:12)
    at SimpleURLLoaderWrapper.emit (events.js:203:13)
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
[2020-05-04 17:03:33.020] [info] Checking for update
[2020-05-04 17:03:33.699] [info] Update for version 0.2.0 is not available (latest version: 0.2.0, downgrade is disallowed).
[2020-05-04 17:07:41.085] [info] Checking for update
[2020-05-04 17:07:41.437] [info] Update for version 0.2.0 is not available (latest version: 0.2.0, downgrade is disallowed).
[2020-05-04 17:07:44.342] [info] Checking for update
[2020-05-04 17:07:44.431] [info] Update for version 0.2.0 is not available (latest version: 0.2.0, downgrade is disallowed).
[2020-05-05 11:36:52.732] [info] Checking for update
[2020-05-05 11:36:53.574] [info] Update for version 0.2.0 is not available (latest version: 0.2.0, downgrade is disallowed).
[2020-05-13 13:00:55.509] [info] Checking for update
[2020-05-13 13:00:56.164] [info] Update for version 0.3.0 is not available (latest version: 0.3.0, downgrade is disallowed).
[2020-05-13 13:07:28.660] [info] Checking for update
[2020-05-13 13:07:29.520] [info] Update for version 0.3.0 is not available (latest version: 0.3.0, downgrade is disallowed).
[2020-05-14 09:23:56.159] [info] Checking for update
[2020-05-14 09:23:56.871] [info] Update for version 0.3.0 is not available (latest version: 0.3.0, downgrade is disallowed).
[2020-05-15 21:19:15.220] [info] Checking for update
[2020-05-15 21:19:15.829] [info] Update for version 0.3.0 is not available (latest version: 0.3.0, downgrade is disallowed).
[2020-05-21 09:29:22.944] [info] Checking for update
[2020-05-21 09:29:23.989] [info] Update for version 0.3.0 is not available (latest version: 0.3.0, downgrade is disallowed).`

storiesOf("Components|Contact Modal", module).add("Basic", () => {
  return (
    <>
      <ModalWrapper>
        <ContactModal
          onClose={action("Close")}
          onSend={action("Send")}
          log={log}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  )
})
