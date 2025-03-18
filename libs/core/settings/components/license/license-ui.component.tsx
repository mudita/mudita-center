/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { LicenseComponentTestIds } from "./license-ui.enum"
import {
  WindowContainer,
  WindowHeader,
  WindowTitle,
  LightText,
  LightTextNested,
  NoteText,
} from "Core/settings/components/about/shared"

export const LicenseUI: FunctionComponent = () => (
  <WindowContainer data-testid={LicenseComponentTestIds.Wrapper}>
    <WindowHeader
      displayStyle={TextDisplayStyle.Headline2}
      data-testid={LicenseComponentTestIds.Title}
    >
      Notice for Mudita Center
    </WindowHeader>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Please note that we provide an open source software notice with this app.
      You can access this notice via app menu. The grant of license to open
      source software is separate from grant of license by Mudita governed by
      the Terms of Service.
    </LightText>
    <NoteText displayStyle={TextDisplayStyle.Paragraph4}>
      WARRANTY DISCLAIMER
    </NoteText>
    <NoteText displayStyle={TextDisplayStyle.Paragraph4}>
      THE OPEN SOURCE SOFTWARE IN THIS APP IS DISTRIBUTED IN THE HOPE THAT IT
      WILL BE USEFUL, WITHOUT ANY WARRANTY OR IMPLIED WARRANTY, MERCHANTABILITY
      OR FITNESS FOR ANY PARTICULAR PURPOSE. SEE THE LICENSE TEXTS BELOW FOR
      DETAILS.
    </NoteText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@contentful/rich-text-react-renderer&quot;: &quot;^15.22.7&quot;
      <br />
      &quot;@contentful/rich-text-types&quot;: &quot;^16.8.1&quot;
      <br />
      Copyright (c) 2018 Contentful
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@electron/notarize&quot;: &quot;^2.3.2&quot;
      <br />
      Copyright 2018 Samuel Attard and contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@electron/remote&quot;: &quot;^2.0.11&quot;
      <br />
      Copyright (c) 2019-2022 Electron contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@faker-js/faker&quot;: &quot;^7.5.0&quot;
      <br />
      Faker - Copyright (c) 2022
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This software consists of voluntary contributions made by many
      individuals. For exact contribution history, see the revision history
      available at https://github.com/faker-js/faker
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      From:
      https://github.com/faker-js/faker/commit/a9f98046c7d5eeaabe12fc587024c06d683800b8
      <br />
      To:
      https://github.com/faker-js/faker/commit/29234378807c4141588861f69421bf20b5ac635e
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Based on faker.js, copyright Marak Squires and contributor, what follows
      below is the original license.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      faker.js - Copyright (c) 2020
      <br />
      Marak Squires
      <br />
      http://github.com/marak/faker.js/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      faker.js was inspired by and has used data definitions from:
      <br />
      * https://github.com/stympy/faker/ - Copyright (c) 2007-2010 Benjamin
      Curtis
      <br />* http://search.cpan.org/~jasonk/Data-Faker-0.07/ - Copyright
      2004-2005 by Jason Kohles
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@mudita/stylelint-config&quot;: &quot;^1.0.4&quot;
      <br />
      Copyright (c) Mudita Sp. z o.o.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@pmmmwh/react-refresh-webpack-plugin&quot;: &quot;^0.5.11&quot;
      <br />
      Copyright (c) 2019 Michael Mok
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@reduxjs/toolkit&quot;: &quot;1.9.7&quot;
      <br />
      Copyright (c) 2018 Mark Erikson
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@rematch/core&quot;: &quot;^1.4.0&quot;
      <br />
      &quot;@rematch/select&quot;: &quot;^2.0.5&quot;
      <br />
      Copyright (c) 2017 Rematch
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@seznam/compose-react-refs&quot;: &quot;1.0.4&quot;
      <br />
      Copyright (c) 2019, Seznam.cz, a.s.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted, provided that the above
      copyright notice and this permission notice appear in all copies.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@swc-node/register&quot;: &quot;~1.6.7&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2020-present LongYinan
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@swc/core&quot;: &quot;~1.3.85&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;name&quot;: &quot;@swc/core&quot;,
      <br />
      &quot;version&quot;: &quot;1.3.85&quot;, &quot;description&quot;:
      &quot;Super-fast alternative for babel&quot;,
      <br />
      &quot;homepage&quot;: &quot;https://swc.rs&quot;,
      <br />
      &quot;main&quot;: &quot;./index.js&quot;,
      <br />
      &quot;author&quot;: &quot;강동윤 {"<"}kdy1997.dev@gmail.com{">"}&quot;,
      <br />
      &quot;license&quot;: &quot;Apache-2.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Apache License
      <br />
      Version 2.0, January 2004
      <br />
      http://www.apache.org/licenses/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      1. Definitions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;License&quot; shall mean the terms and conditions for use,
      reproduction, and distribution as defined by Sections 1 through 9 of this
      document.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Licensor&quot; shall mean the copyright owner or entity authorized
      by the copyright owner that is granting the License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Legal Entity&quot; shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      &quot;control&quot; means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or otherwise,
      or (ii) ownership of fifty percent (50%) or more of the outstanding
      shares, or (iii) beneficial ownership of such entity.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal
      Entity exercising permissions granted by this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Source&quot; form shall mean the preferred form for making
      modifications, including but not limited to software source code,
      documentation source, and configuration files.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Object&quot; form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but not limited
      to compiled object code, generated documentation, and conversions to other
      media types.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Work&quot; shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a copyright
      notice that is included in or attached to the work (an example is provided
      in the Appendix below).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Derivative Works&quot; shall mean any work, whether in Source or
      Object form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes of
      this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of, the
      Work and Derivative Works thereof.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contribution&quot; shall mean any work of authorship, including the
      original version of the Work and any modifications or additions to that
      Work or Derivative Works thereof, that is intentionally submitted to
      Licensor for inclusion in the Work by the copyright owner or by an
      individual or Legal Entity authorized to submit on behalf of the copyright
      owner. For the purposes of this definition, &quot;submitted&quot; means
      any form of electronic, verbal, or written communication sent to the
      Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as &quot;Not a
      Contribution.&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contributor&quot; shall mean Licensor and any individual or Legal
      Entity on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      2. Grant of Copyright License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable copyright license to
      reproduce, prepare Derivative Works of, publicly display, publicly
      perform, sublicense, and distribute the Work and such Derivative Works in
      Source or Object form.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      3. Grant of Patent License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable (except as stated in
      this section) patent license to make, have made, use, offer to sell, sell,
      import, and otherwise transfer the Work, where such license applies only
      to those patent claims licensable by such Contributor that are necessarily
      infringed by their Contribution(s) alone or by combination of their
      Contribution(s) with the Work to which such Contribution(s) was submitted.
      If You institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work or a
      Contribution incorporated within the Work constitutes direct or
      contributory patent infringement, then any patent licenses granted to You
      under this License for that Work shall terminate as of the date such
      litigation is filed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      4. Redistribution. You may reproduce and distribute copies of the Work or
      Derivative Works thereof in any medium, with or without modifications, and
      in Source or Object form, provided that You meet the following conditions:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (a) You must give any other recipients of the Work or Derivative Works a
      copy of this License; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (b) You must cause any modified files to carry prominent notices stating
      that You changed the files; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (c) You must retain, in the Source form of any Derivative Works that You
      distribute, all copyright, patent, trademark, and attribution notices from
      the Source form of the Work, excluding those notices that do not pertain
      to any part of the Derivative Works; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
      distribution, then any Derivative Works that You distribute must include a
      readable copy of the attribution notices contained within such NOTICE
      file, excluding those notices that do not pertain to any part of the
      Derivative Works, in at least one of the following places: within a NOTICE
      text file distributed as part of the Derivative Works; within the Source
      form or documentation, if provided along with the Derivative Works; or,
      within a display generated by the Derivative Works, if and wherever such
      third-party notices normally appear. The contents of the NOTICE file are
      for informational purposes only and do not modify the License. You may add
      Your own attribution notices within Derivative Works that You distribute,
      alongside or as an addendum to the NOTICE text from the Work, provided
      that such additional attribution notices cannot be construed as modifying
      the License.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You may add Your own copyright statement to Your modifications and may
      provide additional or different license terms and conditions for use,
      reproduction, or distribution of Your modifications, or for any such
      Derivative Works as a whole, provided Your use, reproduction, and
      distribution of the Work otherwise complies with the conditions stated in
      this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      5. Submission of Contributions. Unless You explicitly state otherwise, any
      Contribution intentionally submitted for inclusion in the Work by You to
      the Licensor shall be under the terms and conditions of this License,
      without any additional terms or conditions. Notwithstanding the above,
      nothing herein shall supersede or modify the terms of any separate license
      agreement you may have executed with Licensor regarding such
      Contributions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor, except
      as required for reasonable and customary use in describing the origin of
      the Work and reproducing the content of the NOTICE file.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      7. Disclaimer of Warranty. Unless required by applicable law or agreed to
      in writing, Licensor provides the Work (and each Contributor provides its
      Contributions) on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR
      CONDITIONS OF ANY KIND, either express or implied, including, without
      limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT,
      MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely
      responsible for determining the appropriateness of using or redistributing
      the Work and assume any risks associated with Your exercise of permissions
      under this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      8. Limitation of Liability. In no event and under no legal theory, whether
      in tort (including negligence), contract, or otherwise, unless required by
      applicable law (such as deliberate and grossly negligent acts) or agreed
      to in writing, shall any Contributor be liable to You for damages,
      including any direct, indirect, special, incidental, or consequential
      damages of any character arising as a result of this License or out of the
      use or inability to use the Work (including but not limited to damages for
      loss of goodwill, work stoppage, computer failure or malfunction, or any
      and all other commercial damages or losses), even if such Contributor has
      been advised of the possibility of such damages.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      9. Accepting Warranty or Additional Liability. While redistributing the
      Work or Derivative Works thereof, You may choose to offer, and charge a
      fee for, acceptance of support, warranty, indemnity, or other liability
      obligations and/or rights consistent with this License. However, in
      accepting such obligations, You may act only on Your own behalf and on
      Your sole responsibility, not on behalf of any other Contributor, and only
      if You agree to indemnify, defend, and hold each Contributor harmless for
      any liability incurred by, or claims asserted against, such Contributor by
      reason of your accepting any such warranty or additional liability.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      END OF TERMS AND CONDITIONS
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      APPENDIX: How to apply the Apache License to your work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To apply the Apache License to your work, attach the following boilerplate
      notice, with the fields enclosed by brackets &quot;[]&quot; replaced with
      your own identifying information. (Don&apos;t include the brackets!) The
      text should be enclosed in the appropriate comment syntax for the file
      format. We also recommend that a file or class name and description of
      purpose be included on the same &quot;printed page&quot; as the copyright
      notice for easier identification within third-party archives.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright [yyyy] [name of copyright owner]
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License. You may
      obtain a copy of the License at
      <br />
      http://www.apache.org/licenses/LICENSE-2.0
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an &quot;AS IS&quot;
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied. See the License for the specific language governing permissions
      and limitations under the License.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@welldone-software/why-did-you-render&quot;: &quot;^8.0.3&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2018-present, Vitali Zaidman {"<"}vzaidman@gmail.com{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;archiver&quot;: &quot;^5.3.1&quot;
      <br />
      Copyright (c) 2012-2014 Chris Talkington, contributors.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;async-mutex&quot;: &quot;^0.4.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2016 Christian Speckner {"<"}cnspeckn@googlemail.com{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;axios&quot;: &quot;^0.27.2&quot;
      <br />
      Copyright (c) 2014-present Matt Zabriskie
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;axios-mock-adapter&quot;: &quot;^1.21.2&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) Colin Timmermans
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;brie&quot;: &quot;^3.0.4&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@swc-node/register&quot;: &quot;~1.6.7&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2020-present LongYinan
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;chromedriver&quot;: &quot;^116.0.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Apache License
      <br />
      Version 2.0, January 2004
      <br />
      http://www.apache.org/licenses/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      1. Definitions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;License&quot; shall mean the terms and conditions for use,
      reproduction, and distribution as defined by Sections 1 through 9 of this
      document.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Licensor&quot; shall mean the copyright owner or entity authorized
      by the copyright owner that is granting the License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Legal Entity&quot; shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      &quot;control&quot; means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or otherwise,
      or (ii) ownership of fifty percent (50%) or more of the outstanding
      shares, or (iii) beneficial ownership of such entity.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal
      Entity exercising permissions granted by this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Source&quot; form shall mean the preferred form for making
      modifications, including but not limited to software source code,
      documentation source, and configuration files.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Object&quot; form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but not limited
      to compiled object code, generated documentation, and conversions to other
      media types.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Work&quot; shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a copyright
      notice that is included in or attached to the work (an example is provided
      in the Appendix below).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Derivative Works&quot; shall mean any work, whether in Source or
      Object form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes of
      this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of, the
      Work and Derivative Works thereof.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contribution&quot; shall mean any work of authorship, including the
      original version of the Work and any modifications or additions to that
      Work or Derivative Works thereof, that is intentionally submitted to
      Licensor for inclusion in the Work by the copyright owner or by an
      individual or Legal Entity authorized to submit on behalf of the copyright
      owner. For the purposes of this definition, &quot;submitted&quot; means
      any form of electronic, verbal, or written communication sent to the
      Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as &quot;Not a
      Contribution.&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contributor&quot; shall mean Licensor and any individual or Legal
      Entity on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      2. Grant of Copyright License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable copyright license to
      reproduce, prepare Derivative Works of, publicly display, publicly
      perform, sublicense, and distribute the Work and such Derivative Works in
      Source or Object form.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      3. Grant of Patent License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable (except as stated in
      this section) patent license to make, have made, use, offer to sell, sell,
      import, and otherwise transfer the Work, where such license applies only
      to those patent claims licensable by such Contributor that are necessarily
      infringed by their Contribution(s) alone or by combination of their
      Contribution(s) with the Work to which such Contribution(s) was submitted.
      If You institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work or a
      Contribution incorporated within the Work constitutes direct or
      contributory patent infringement, then any patent licenses granted to You
      under this License for that Work shall terminate as of the date such
      litigation is filed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      4. Redistribution. You may reproduce and distribute copies of the Work or
      Derivative Works thereof in any medium, with or without modifications, and
      in Source or Object form, provided that You meet the following conditions:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (a) You must give any other recipients of the Work or Derivative Works a
      copy of this License; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (b) You must cause any modified files to carry prominent notices stating
      that You changed the files; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (c) You must retain, in the Source form of any Derivative Works that You
      distribute, all copyright, patent, trademark, and attribution notices from
      the Source form of the Work, excluding those notices that do not pertain
      to any part of the Derivative Works; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
      distribution, then any Derivative Works that You distribute must include a
      readable copy of the attribution notices contained within such NOTICE
      file, excluding those notices that do not pertain to any part of the
      Derivative Works, in at least one of the following places: within a NOTICE
      text file distributed as part of the Derivative Works; within the Source
      form or documentation, if provided along with the Derivative Works; or,
      within a display generated by the Derivative Works, if and wherever such
      third-party notices normally appear. The contents of the NOTICE file are
      for informational purposes only and do not modify the License. You may add
      Your own attribution notices within Derivative Works that You distribute,
      alongside or as an addendum to the NOTICE text from the Work, provided
      that such additional attribution notices cannot be construed as modifying
      the License.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You may add Your own copyright statement to Your modifications and may
      provide additional or different license terms and conditions for use,
      reproduction, or distribution of Your modifications, or for any such
      Derivative Works as a whole, provided Your use, reproduction, and
      distribution of the Work otherwise complies with the conditions stated in
      this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      5. Submission of Contributions. Unless You explicitly state otherwise, any
      Contribution intentionally submitted for inclusion in the Work by You to
      the Licensor shall be under the terms and conditions of this License,
      without any additional terms or conditions. Notwithstanding the above,
      nothing herein shall supersede or modify the terms of any separate license
      agreement you may have executed with Licensor regarding such
      Contributions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor, except
      as required for reasonable and customary use in describing the origin of
      the Work and reproducing the content of the NOTICE file.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      7. Disclaimer of Warranty. Unless required by applicable law or agreed to
      in writing, Licensor provides the Work (and each Contributor provides its
      Contributions) on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR
      CONDITIONS OF ANY KIND, either express or implied, including, without
      limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT,
      MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely
      responsible for determining the appropriateness of using or redistributing
      the Work and assume any risks associated with Your exercise of permissions
      under this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      8. Limitation of Liability. In no event and under no legal theory, whether
      in tort (including negligence), contract, or otherwise, unless required by
      applicable law (such as deliberate and grossly negligent acts) or agreed
      to in writing, shall any Contributor be liable to You for damages,
      including any direct, indirect, special, incidental, or consequential
      damages of any character arising as a result of this License or out of the
      use or inability to use the Work (including but not limited to damages for
      loss of goodwill, work stoppage, computer failure or malfunction, or any
      and all other commercial damages or losses), even if such Contributor has
      been advised of the possibility of such damages.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      9. Accepting Warranty or Additional Liability. While redistributing the
      Work or Derivative Works thereof, You may choose to offer, and charge a
      fee for, acceptance of support, warranty, indemnity, or other liability
      obligations and/or rights consistent with this License. However, in
      accepting such obligations, You may act only on Your own behalf and on
      Your sole responsibility, not on behalf of any other Contributor, and only
      if You agree to indemnify, defend, and hold each Contributor harmless for
      any liability incurred by, or claims asserted against, such Contributor by
      reason of your accepting any such warranty or additional liability.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      END OF TERMS AND CONDITIONS
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      APPENDIX: How to apply the Apache License to your work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To apply the Apache License to your work, attach the following boilerplate
      notice, with the fields enclosed by brackets &quot;[]&quot; replaced with
      your own identifying information. (Don&apos;t include the brackets!) The
      text should be enclosed in the appropriate comment syntax for the file
      format. We also recommend that a file or class name and description of
      purpose be included on the same &quot;printed page&quot; as the copyright
      notice for easier identification within third-party archives.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright 2014 Giovanni Bassi and Elemar Jr.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License. You may
      obtain a copy of the License at
      <br />
      http://www.apache.org/licenses/LICENSE-2.0
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an &quot;AS IS&quot;
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied. See the License for the specific language governing permissions
      and limitations under the License.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;circular-dependency-plugin&quot;: &quot;^5.2.2&quot;
      <br />
      Copyright (c) 2016, Aaron Ackerman {"<"}theron17@gmail.com{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted, provided that the above
      copyright notice and this permission notice appear in all copies.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;contentful&quot;: &quot;^9.2.4&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2016 Contentful
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;copy-webpack-plugin&quot;: &quot;^11.0.0&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;cross-env&quot;: &quot;^7.0.3&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2017 Kent C. Dodds
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;css-loader&quot;: &quot;^6.7.1&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;dotenv&quot;: &quot;^16.0.2&quot;
      <br />
      Copyright (c) 2015, Scott Motte
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      All rights reserved.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are
      met:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
      &quot;AS IS&quot; AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
      NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
      A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
      HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
      SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
      TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
      PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
      LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
      SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;elasticlunr&quot;: &quot;^0.9.5&quot;
      <br />
      Copyright (C) 2013 by Oliver Nightingale
      <br />
      Copyright (C) 2015 by Wei Song
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;electron&quot;: &quot;^26.0.0&quot;
      <br />
      Copyright (c) Electron contributors
      <br />
      Copyright (c) 2013-2020 GitHub Inc.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;electron-better-ipc&quot;: &quot;^2.0.1&quot;
      <br />
      MIT License
      <br />
      Copyright (c) Sindre Sorhus {"<"}sindresorhus@gmail.com{">"}{" "}
      (https://sindresorhus.com)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;electron-builder&quot;: &quot;^24.12.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Loopline Systems
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;electron-devtools-installer&quot;: &quot;^3.2.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2016 Samuel Attard
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;electron-localshortcut&quot;: &quot;^3.2.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2017 Andrea Parodi
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;electron-store&quot;: &quot;^8.0.1&quot;
      <br />
      MIT License
      <br />
      Copyright (c) Sindre Sorhus {"<"}sindresorhus@gmail.com{">"}{" "}
      (https://sindresorhus.com)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;electron-updater&quot;: &quot;6.2.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Loopline Systems
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;file-loader&quot;: &quot;^6.2.0&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;fork-ts-checker-webpack-plugin&quot;: &quot;^7.2.13&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2020 TypeStrong
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;fs-extra&quot;: &quot;^10.1.0&quot;
      <br />
      (The MIT License)
      <br />
      Copyright (c) 2011-2017 JP Richardson
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;getmac&quot;: &quot;^5.21.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      <b>License</b>
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless stated otherwise all works are:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      - Copyright, 2013 <a href="http://bevry.me">Bevry Pty Ltd</a>
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      and licensed under:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      -{" "}
      <a href="http://spdx.org/licenses/Artistic-2.0.html">
        Artistic License 2.0
      </a>
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      <b>The Artistic License 2.0</b>
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) 2000-2006, The Perl Foundation.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Everyone is permitted to copy and distribute verbatim copies of this
      license document, but changing it is not allowed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>Preamble</LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This license establishes the terms under which a given free software
      Package may be copied, modified, distributed, and/or redistributed. The
      intent is that the Copyright Holder maintains some artistic control over
      the development of that Package while still keeping the Package available
      as open source and free software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You are always permitted to make arrangements wholly outside of this
      license directly with the Copyright Holder of a given Package. If the
      terms of this license do not permit the full use that you propose to make
      of the Package, you should contact the Copyright Holder and seek a
      different licensing arrangement.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Definitions
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Copyright Holder&quot; means the individual(s) or organization(s)
      named in the copyright notice for the entire Package.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contributor&quot; means any party that has contributed code or other
      material to the Package, in accordance with the Copyright Holder&apos;s
      procedures.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;You&quot; and &quot;your&quot; means any person who would like to
      copy, distribute, or modify the Package.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Package&quot; means the collection of files distributed by the
      Copyright Holder, and derivatives of that collection and/or of those
      files. A given Package may consist of either the Standard Version, or a
      Modified Version.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Distribute&quot; means providing a copy of the Package or making it
      accessible to anyone else, or in the case of a company or organization, to
      others outside of your company or organization.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Distributor Fee&quot; means any fee that you charge for Distributing
      this Package or providing support for this Package to another party. It
      does not mean licensing fees.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Standard Version&quot; refers to the Package if it has not been
      modified, or has been modified only in ways explicitly requested by the
      Copyright Holder.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Modified Version&quot; means the Package, if it has been changed,
      and such changes were not explicitly requested by the Copyright Holder.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Original License&quot; means this Artistic License as Distributed
      with the Standard Version of the Package, in its current version or as it
      may be modified by The Perl Foundation in the future.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Source&quot; form means the source code, documentation source, and
      configuration files for the Package.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Compiled&quot; form means the compiled bytecode, object code,
      binary, or any other form resulting from mechanical transformation or
      translation of the Source form.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission for Use and Modification Without Distribution
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (1) You are permitted to use the Standard Version and create and use
      Modified Versions for any purpose without restriction, provided that you
      do not Distribute the Modified Version.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permissions for Redistribution of the Standard Version
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (2) You may Distribute verbatim copies of the Source form of the Standard
      Version of this Package in any medium without restriction, either gratis
      or for a Distributor Fee, provided that you duplicate all of the original
      copyright notices and associated disclaimers. At your discretion, such
      verbatim copies may or may not include a Compiled form of the Package.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (3) You may apply any bug fixes, portability changes, and other
      modifications made available from the Copyright Holder. The resulting
      Package will still be considered the Standard Version, and as such will be
      subject to the Original License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Distribution of Modified Versions of the Package as Source
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (4) You may Distribute your Modified Version as Source (either gratis or
      for a Distributor Fee, and with or without a Compiled form of the Modified
      Version) provided that you clearly document how it differs from the
      Standard Version, including, but not limited to, documenting any
      non-standard features, executables, or modules, and provided that you do
      at least ONE of the following:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (a) make the Modified Version available to the Copyright Holder of the
      Standard Version, under the Original License, so that the Copyright Holder
      may include your modifications in the Standard Version.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (b) ensure that installation of your Modified Version does not prevent the
      user installing or running the Standard Version. In addition, the Modified
      Version must bear a name that is different from the name of the Standard
      Version.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (c) allow anyone who receives a copy of the Modified Version to make the
      Source form of the Modified Version available to others under
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (i) the Original License or
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (ii) a license that permits the licensee to freely copy, modify and
      redistribute the Modified Version using the same licensing terms that
      apply to the copy that the licensee received, and requires that the Source
      form of the Modified Version, and of any works derived from it, be made
      freely available in that license fees are prohibited but Distributor Fees
      are allowed.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Distribution of Compiled Forms of the Standard Version or Modified
      Versions without the Source
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (5) You may Distribute Compiled forms of the Standard Version without the
      Source, provided that you include complete instructions on how to get the
      Source of the Standard Version. Such instructions must be valid at the
      time of your distribution. If these instructions, at any time while you
      are carrying out such distribution, become invalid, you must provide new
      instructions on demand or cease further distribution. If you provide valid
      instructions or cease distribution within thirty days after you become
      aware that the instructions are invalid, then you do not forfeit any of
      your rights under this license.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (6) You may Distribute a Modified Version in Compiled form without the
      Source, provided that you comply with Section 4 with respect to the Source
      of the Modified Version.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Aggregating or Linking the Package
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (7) You may aggregate the Package (either the Standard Version or Modified
      Version) with other packages and Distribute the resulting aggregation
      provided that you do not charge a licensing fee for the Package.
      Distributor Fees are permitted, and licensing fees for other components in
      the aggregation are permitted. The terms of this license apply to the use
      and Distribution of the Standard or Modified Versions as included in the
      aggregation.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (8) You are permitted to link Modified and Standard Versions with other
      works, to embed the Package in a larger work of your own, or to build
      stand-alone binary or bytecode versions of applications that include the
      Package, and Distribute the result without restriction, provided the
      result does not expose a direct interface to the Package.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Items That are Not Considered Part of a Modified Version
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (9) Works (including, but not limited to, modules and scripts) that merely
      extend or make use of the Package, do not, by themselves, cause the
      Package to be a Modified Version. In addition, such works are not
      considered parts of the Package itself, and are not subject to the terms
      of this license.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      General Provisions
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (10) Any use, modification, and distribution of the Standard or Modified
      Versions is governed by this Artistic License. By using, modifying or
      distributing the Package, you accept this license. Do not use, modify, or
      distribute the Package, if you do not accept this license.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (11) If your Modified Version has been derived from a Modified Version
      made by someone other than you, you are nevertheless required to ensure
      that your Modified Version complies with the requirements of this license.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (12) This license does not grant you the right to use any trademark,
      service mark, tradename, or logo of the Copyright Holder.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (13) This license includes the non-exclusive, worldwide, free-of-charge
      patent license to make, have made, use, offer to sell, sell, import and
      otherwise transfer the Package with respect to any patent claims
      licensable by the Copyright Holder that are necessarily infringed by the
      Package. If you institute patent litigation (including a cross-claim or
      counterclaim) against any party alleging that the Package constitutes
      direct or contributory patent infringement, then this Artistic License to
      you shall terminate on the date that such litigation is filed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (14) Disclaimer of Warranty:
      <br />
      THE PACKAGE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS &quot;AS
      IS&quot; AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. THE IMPLIED
      WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
      NON-INFRINGEMENT ARE DISCLAIMED TO THE EXTENT PERMITTED BY YOUR LOCAL LAW.
      UNLESS REQUIRED BY LAW, NO COPYRIGHT HOLDER OR CONTRIBUTOR WILL BE LIABLE
      FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING IN
      ANY WAY OUT OF THE USE OF THE PACKAGE, EVEN IF ADVISED OF THE POSSIBILITY
      OF SUCH DAMAGE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;history&quot;: &quot;^4.10.1&quot;
      <br />
      MIT License
      <br />
      Copyright (c) React Training 2016-2018
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;html-webpack-plugin&quot;: &quot;^5.5.0&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;husky&quot;: &quot;^7.0.4&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2021 typicode
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;ical-generator&quot;: &quot;^3.5.1&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2022 Sebastian Pekarek
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;ical-js-parser&quot;: &quot;^0.7.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2021 nibdo
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;identity-obj-proxy&quot;: &quot;^3.0.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Keyan Zhang
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;is-electron-renderer&quot;: &quot;^2.0.1&quot;
      <br />
      License
      <br />
      MIT
      <br />
      Copyright 2015 [JP Richardson](https://github.com/jprichardson)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;lint-staged&quot;: &quot;^13.0.3&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2016 Andrey Okonetchnikov
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;lodash&quot;: &quot;^4.17.21&quot;
      <br />
      Copyright OpenJS Foundation and other contributors {"<"}
      https://openjsf.org/{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Based on Underscore.js, copyright Jeremy Ashkenas, DocumentCloud and
      Investigative Reporters & Editors {"<"}http://underscorejs.org/{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This software consists of voluntary contributions made by many
      individuals. For exact contribution history, see the revision history
      available at https://github.com/lodash/lodash
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The following license applies to all parts of this software except as
      documented below:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright and related rights for sample code are waived via CC0. Sample
      code is defined as all source code displayed within the prose of the
      documentation.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      CC0: http://creativecommons.org/publicdomain/zero/1.0/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Files located in the node_modules and vendor directories are externally
      maintained libraries used by this software which have their own licenses;
      we recommend you read them, as their terms may differ from the terms
      above.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;chromedriver&quot;: &quot;^116.0.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Apache License
      <br />
      Version 2.0, January 2004
      <br />
      http://www.apache.org/licenses/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      1. Definitions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;License&quot; shall mean the terms and conditions for use,
      reproduction, and distribution as defined by Sections 1 through 9 of this
      document.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Licensor&quot; shall mean the copyright owner or entity authorized
      by the copyright owner that is granting the License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Legal Entity&quot; shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      &quot;control&quot; means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or otherwise,
      or (ii) ownership of fifty percent (50%) or more of the outstanding
      shares, or (iii) beneficial ownership of such entity.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal
      Entity exercising permissions granted by this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Source&quot; form shall mean the preferred form for making
      modifications, including but not limited to software source code,
      documentation source, and configuration files.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Object&quot; form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but not limited
      to compiled object code, generated documentation, and conversions to other
      media types.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Work&quot; shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a copyright
      notice that is included in or attached to the work (an example is provided
      in the Appendix below).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Derivative Works&quot; shall mean any work, whether in Source or
      Object form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes of
      this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of, the
      Work and Derivative Works thereof.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contribution&quot; shall mean any work of authorship, including the
      original version of the Work and any modifications or additions to that
      Work or Derivative Works thereof, that is intentionally submitted to
      Licensor for inclusion in the Work by the copyright owner or by an
      individual or Legal Entity authorized to submit on behalf of the copyright
      owner. For the purposes of this definition, &quot;submitted&quot; means
      any form of electronic, verbal, or written communication sent to the
      Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as &quot;Not a
      Contribution.&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contributor&quot; shall mean Licensor and any individual or Legal
      Entity on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      2. Grant of Copyright License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable copyright license to
      reproduce, prepare Derivative Works of, publicly display, publicly
      perform, sublicense, and distribute the Work and such Derivative Works in
      Source or Object form.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      3. Grant of Patent License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable (except as stated in
      this section) patent license to make, have made, use, offer to sell, sell,
      import, and otherwise transfer the Work, where such license applies only
      to those patent claims licensable by such Contributor that are necessarily
      infringed by their Contribution(s) alone or by combination of their
      Contribution(s) with the Work to which such Contribution(s) was submitted.
      If You institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work or a
      Contribution incorporated within the Work constitutes direct or
      contributory patent infringement, then any patent licenses granted to You
      under this License for that Work shall terminate as of the date such
      litigation is filed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      4. Redistribution. You may reproduce and distribute copies of the Work or
      Derivative Works thereof in any medium, with or without modifications, and
      in Source or Object form, provided that You meet the following conditions:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (a) You must give any other recipients of the Work or Derivative Works a
      copy of this License; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (b) You must cause any modified files to carry prominent notices stating
      that You changed the files; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (c) You must retain, in the Source form of any Derivative Works that You
      distribute, all copyright, patent, trademark, and attribution notices from
      the Source form of the Work, excluding those notices that do not pertain
      to any part of the Derivative Works; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
      distribution, then any Derivative Works that You distribute must include a
      readable copy of the attribution notices contained within such NOTICE
      file, excluding those notices that do not pertain to any part of the
      Derivative Works, in at least one of the following places: within a NOTICE
      text file distributed as part of the Derivative Works; within the Source
      form or documentation, if provided along with the Derivative Works; or,
      within a display generated by the Derivative Works, if and wherever such
      third-party notices normally appear. The contents of the NOTICE file are
      for informational purposes only and do not modify the License. You may add
      Your own attribution notices within Derivative Works that You distribute,
      alongside or as an addendum to the NOTICE text from the Work, provided
      that such additional attribution notices cannot be construed as modifying
      the License.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You may add Your own copyright statement to Your modifications and may
      provide additional or different license terms and conditions for use,
      reproduction, or distribution of Your modifications, or for any such
      Derivative Works as a whole, provided Your use, reproduction, and
      distribution of the Work otherwise complies with the conditions stated in
      this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      5. Submission of Contributions. Unless You explicitly state otherwise, any
      Contribution intentionally submitted for inclusion in the Work by You to
      the Licensor shall be under the terms and conditions of this License,
      without any additional terms or conditions. Notwithstanding the above,
      nothing herein shall supersede or modify the terms of any separate license
      agreement you may have executed with Licensor regarding such
      Contributions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor, except
      as required for reasonable and customary use in describing the origin of
      the Work and reproducing the content of the NOTICE file.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      7. Disclaimer of Warranty. Unless required by applicable law or agreed to
      in writing, Licensor provides the Work (and each Contributor provides its
      Contributions) on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR
      CONDITIONS OF ANY KIND, either express or implied, including, without
      limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT,
      MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely
      responsible for determining the appropriateness of using or redistributing
      the Work and assume any risks associated with Your exercise of permissions
      under this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      8. Limitation of Liability. In no event and under no legal theory, whether
      in tort (including negligence), contract, or otherwise, unless required by
      applicable law (such as deliberate and grossly negligent acts) or agreed
      to in writing, shall any Contributor be liable to You for damages,
      including any direct, indirect, special, incidental, or consequential
      damages of any character arising as a result of this License or out of the
      use or inability to use the Work (including but not limited to damages for
      loss of goodwill, work stoppage, computer failure or malfunction, or any
      and all other commercial damages or losses), even if such Contributor has
      been advised of the possibility of such damages.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      9. Accepting Warranty or Additional Liability. While redistributing the
      Work or Derivative Works thereof, You may choose to offer, and charge a
      fee for, acceptance of support, warranty, indemnity, or other liability
      obligations and/or rights consistent with this License. However, in
      accepting such obligations, You may act only on Your own behalf and on
      Your sole responsibility, not on behalf of any other Contributor, and only
      if You agree to indemnify, defend, and hold each Contributor harmless for
      any liability incurred by, or claims asserted against, such Contributor by
      reason of your accepting any such warranty or additional liability.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      END OF TERMS AND CONDITIONS
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      APPENDIX: How to apply the Apache License to your work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To apply the Apache License to your work, attach the following boilerplate
      notice, with the fields enclosed by brackets &quot;[]&quot; replaced with
      your own identifying information. (Don&apos;t include the brackets!) The
      text should be enclosed in the appropriate comment syntax for the file
      format. We also recommend that a file or class name and description of
      purpose be included on the same &quot;printed page&quot; as the copyright
      notice for easier identification within third-party archives.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright 2023 Vadim @streamich Dalecky {"<"}vadimsdaleckis@gmail.com{">"}{" "}
      and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License. You may
      obtain a copy of the License at
      <br />
      http://www.apache.org/licenses/LICENSE-2.0
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an &quot;AS IS&quot;
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied. See the License for the specific language governing permissions
      and limitations under the License.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;mini-css-extract-plugin&quot;: &quot;^2.6.1&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;mock-fs&quot;: &quot;^5.2.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      # License for mock-fs
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The mock-fs module is distributed under the MIT license. Find the full
      source here: http://tschaub.mit-license.org/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright Tim Schaub.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      # Node&apos;s license
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This module includes parts of the Node library itself (specifically, the
      fs module is included from several different versions of Node). Find
      Node&apos;s license below:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;mockdate&quot;: &quot;^3.0.5&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2014 Bob Lauer
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;moment&quot;: &quot;^2.29.4&quot;
      <br />
      Copyright (c) JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;node-gyp&quot;: &quot;^10.0.1&quot;
      <br />
      (The MIT License)
      <br />
      Copyright (c) 2012 Nathan Rajlich {"<"}nathan@tootallnate.net{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;node-polyfill-webpack-plugin&quot;: &quot;^2.0.1&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2020 - 2022 Richie Bendall
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;nodemon&quot;: &quot;^2.0.19&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2010 - present, Remy Sharp, https://remysharp.com {"<"}
      remy@remysharp.com{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;p-queue&quot;: &quot;^7.3.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) Sindre Sorhus {"<"}sindresorhus@gmail.com{">"}{" "}
      (https://sindresorhus.com)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react&quot;: &quot;^18.2.0&quot;
      <br />
      &quot;react-dom&quot;: &quot;^18.2.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) Facebook, Inc. and its affiliates.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-beautiful-dnd&quot;: &quot;^13.1.1&quot;
      <br />
      Copyright 2019 Atlassian Pty Ltd
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License. You may
      obtain a copy of the License at
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      http://www.apache.org/licenses/LICENSE-2.0
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an &quot;AS IS&quot;
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied. See the License for the specific language governing permissions
      and limitations under the License.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-google-button&quot;: &quot;^0.7.2&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2018-present Prescott Prue
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-hook-form&quot;: &quot;~7.53.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2019-present Beier(Bill) Luo
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-intersection-observer&quot;: &quot;^9.4.0”
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2022 React Intersection Observer authors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-intl&quot;: &quot;6.4.7&quot;
      <br />
      Copyright 2019 Oath Inc.
      <br />
      All rights reserved.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are
      met:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      * Neither the name of the Oath Inc. nor the names of its contributors may
      be used to endorse or promote products derived from this software without
      specific prior written permission.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
      &quot;AS IS&quot; AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
      NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
      A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Oath INC. BE LIABLE
      FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
      DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
      SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
      CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
      LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
      OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
      SUCH DAMAGE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-modal&quot;: &quot;^3.15.1&quot;
      <br />
      Copyright (c) 2017 Ryan Florence
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-modern-drawer&quot;: &quot;^1.2.2&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>## License</LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      MIT © [Farzin-Firoozi](https://github.com/Farzin-Firoozi)
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-redux&quot;: &quot;8.1.3&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015-present Dan Abramov
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-refresh&quot;: &quot;^0.14.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) Facebook, Inc. and its affiliates.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-router&quot;: &quot;^5.2.0&quot;
      <br />
      &quot;react-router-dom&quot;: &quot;^5.2.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) React Training 2016-2018
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-syntax-highlighter&quot;: &quot;^15.5.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2019 Conor Hastings
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-tooltip&quot;: &quot;^4.2.21&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Wang Zixiao
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-viewport-list&quot;: &quot;^6.0.1&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2019 Oleg Grishechkin
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-virtualized&quot;: &quot;^9.22.3&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Brian Vaughn
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-virtuoso&quot;: &quot;^4.6.2&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2020 Petyo Ivanov
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;redux&quot;: &quot;4.2.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015-present Dan Abramov
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;redux-logger&quot;: &quot;^3.0.6&quot;
      <br />
      Copyright (c) 2016 Eugene Rodionov
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;redux-mock-store&quot;: &quot;^1.5.4&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2017 Arnaud Benard
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;redux-thunk&quot;: &quot;2.4.2&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015-present Dan Abramov
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;reflect-metadata&quot;: &quot;^0.1.13&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) Microsoft Corporation. All rights reserved.
      <br />
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License. You may
      obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR
      CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT
      LIMITATION ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A
      PARTICULAR PURPOSE, MERCHANTABLITY OR NON-INFRINGEMENT.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      See the Apache Version 2.0 License for specific language governing
      permissions and limitations under the License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Apache License
      <br />
      Version 2.0, January 2004
      <br />
      http://www.apache.org/licenses/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      1. Definitions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;License&quot; shall mean the terms and conditions for use,
      reproduction, and distribution as defined by Sections 1 through 9 of this
      document.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Licensor&quot; shall mean the copyright owner or entity authorized
      by the copyright owner that is granting the License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Legal Entity&quot; shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      &quot;control&quot; means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or otherwise,
      or (ii) ownership of fifty percent (50%) or more of the outstanding
      shares, or (iii) beneficial ownership of such entity.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal
      Entity exercising permissions granted by this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Source&quot; form shall mean the preferred form for making
      modifications, including but not limited to software source code,
      documentation source, and configuration files.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Object&quot; form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but not limited
      to compiled object code, generated documentation, and conversions to other
      media types.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Work&quot; shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a copyright
      notice that is included in or attached to the work (an example is provided
      in the Appendix below).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Derivative Works&quot; shall mean any work, whether in Source or
      Object form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes of
      this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of, the
      Work and Derivative Works thereof.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contribution&quot; shall mean any work of authorship, including the
      original version of the Work and any modifications or additions to that
      Work or Derivative Works thereof, that is intentionally submitted to
      Licensor for inclusion in the Work by the copyright owner or by an
      individual or Legal Entity authorized to submit on behalf of the copyright
      owner. For the purposes of this definition, &quot;submitted&quot; means
      any form of electronic, verbal, or written communication sent to the
      Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as &quot;Not a
      Contribution.&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contributor&quot; shall mean Licensor and any individual or Legal
      Entity on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      2. Grant of Copyright License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable copyright license to
      reproduce, prepare Derivative Works of, publicly display, publicly
      perform, sublicense, and distribute the Work and such Derivative Works in
      Source or Object form.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      3. Grant of Patent License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable (except as stated in
      this section) patent license to make, have made, use, offer to sell, sell,
      import, and otherwise transfer the Work, where such license applies only
      to those patent claims licensable by such Contributor that are necessarily
      infringed by their Contribution(s) alone or by combination of their
      Contribution(s) with the Work to which such Contribution(s) was submitted.
      If You institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work or a
      Contribution incorporated within the Work constitutes direct or
      contributory patent infringement, then any patent licenses granted to You
      under this License for that Work shall terminate as of the date such
      litigation is filed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      4. Redistribution. You may reproduce and distribute copies of the Work or
      Derivative Works thereof in any medium, with or without modifications, and
      in Source or Object form, provided that You meet the following conditions:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (a) You must give any other recipients of the Work or Derivative Works a
      copy of this License; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (b) You must cause any modified files to carry prominent notices stating
      that You changed the files; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (c) You must retain, in the Source form of any Derivative Works that You
      distribute, all copyright, patent, trademark, and attribution notices from
      the Source form of the Work, excluding those notices that do not pertain
      to any part of the Derivative Works; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
      distribution, then any Derivative Works that You distribute must include a
      readable copy of the attribution notices contained within such NOTICE
      file, excluding those notices that do not pertain to any part of the
      Derivative Works, in at least one of the following places: within a NOTICE
      text file distributed as part of the Derivative Works; within the Source
      form or documentation, if provided along with the Derivative Works; or,
      within a display generated by the Derivative Works, if and wherever such
      third-party notices normally appear. The contents of the NOTICE file are
      for informational purposes only and do not modify the License. You may add
      Your own attribution notices within Derivative Works that You distribute,
      alongside or as an addendum to the NOTICE text from the Work, provided
      that such additional attribution notices cannot be construed as modifying
      the License.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You may add Your own copyright statement to Your modifications and may
      provide additional or different license terms and conditions for use,
      reproduction, or distribution of Your modifications, or for any such
      Derivative Works as a whole, provided Your use, reproduction, and
      distribution of the Work otherwise complies with the conditions stated in
      this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      5. Submission of Contributions. Unless You explicitly state otherwise, any
      Contribution intentionally submitted for inclusion in the Work by You to
      the Licensor shall be under the terms and conditions of this License,
      without any additional terms or conditions. Notwithstanding the above,
      nothing herein shall supersede or modify the terms of any separate license
      agreement you may have executed with Licensor regarding such
      Contributions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor, except
      as required for reasonable and customary use in describing the origin of
      the Work and reproducing the content of the NOTICE file.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      7. Disclaimer of Warranty. Unless required by applicable law or agreed to
      in writing, Licensor provides the Work (and each Contributor provides its
      Contributions) on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR
      CONDITIONS OF ANY KIND, either express or implied, including, without
      limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT,
      MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely
      responsible for determining the appropriateness of using or redistributing
      the Work and assume any risks associated with Your exercise of permissions
      under this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      8. Limitation of Liability. In no event and under no legal theory, whether
      in tort (including negligence), contract, or otherwise, unless required by
      applicable law (such as deliberate and grossly negligent acts) or agreed
      to in writing, shall any Contributor be liable to You for damages,
      including any direct, indirect, special, incidental, or consequential
      damages of any character arising as a result of this License or out of the
      use or inability to use the Work (including but not limited to damages for
      loss of goodwill, work stoppage, computer failure or malfunction, or any
      and all other commercial damages or losses), even if such Contributor has
      been advised of the possibility of such damages.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      9. Accepting Warranty or Additional Liability. While redistributing the
      Work or Derivative Works thereof, You may choose to offer, and charge a
      fee for, acceptance of support, warranty, indemnity, or other liability
      obligations and/or rights consistent with this License. However, in
      accepting such obligations, You may act only on Your own behalf and on
      Your sole responsibility, not on behalf of any other Contributor, and only
      if You agree to indemnify, defend, and hold each Contributor harmless for
      any liability incurred by, or claims asserted against, such Contributor by
      reason of your accepting any such warranty or additional liability.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      END OF TERMS AND CONDITIONS
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;reselect&quot;: &quot;4.0.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015-2018 Reselect Contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;rrule&quot;: &quot;^2.7.1&quot;
      <br />
      rrule.js: Library for working with recurrence rules for calendar dates.
      <br />
      Copyright 2010, Jakub Roztocil {"<"}jakub@roztocil.name{">"} and Lars
      Schöning
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are
      met:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      1. Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      2. Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      3. Neither the name of The author nor the names of its contributors may be
      used to endorse or promote products derived from this software without
      specific prior written permission.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS &quot;AS IS&quot;
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
      ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR AND CONTRIBUTORS BE LIABLE
      FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
      DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
      SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
      CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
      LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
      OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
      SUCH DAMAGE.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      ./rrule.js and ./test/tests.js is based on python-dateutil. LICENCE:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      python-dateutil - Extensions to the standard Python datetime module.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) 2003-2011 - Gustavo Niemeyer {"<"}gustavo@niemeyer.net{">"}
      <br />
      Copyright (c) 2012 - Tomi Pieviläinen {"<"}tomi.pievilainen@iki.fi{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      All rights reserved.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are
      met:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      1. Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      2. Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      3. Neither the name of The author nor the names of its contributors may be
      used to endorse or promote products derived from this software without
      specific prior written permission.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
      &quot;AS IS&quot; AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
      NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
      A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER
      OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
      EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
      PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
      PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
      LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
      SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;sanitize-filename&quot;: &quot;^1.6.3&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This project is licensed under the [WTFPL][] and [ISC][] licenses.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      [WTFPL]: https://en.wikipedia.org/wiki/WTFPL
      <br />
      [ISC]: https://opensource.org/licenses/ISC
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>## WTFPL</LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
      <br />
      Version 2, December 2004
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (C) 2004 Sam Hocevar \{"<"}sam@hocevar.net{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Everyone is permitted to copy and distribute verbatim or modified copies
      of this license document, and changing it is allowed as long as the name
      is changed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR
      COPYING, DISTRIBUTION AND MODIFICATION
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      0. You just DO WHAT THE FUCK YOU WANT TO.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>## ISC</LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted, provided that the above
      copyright notice and this permission notice appear in all copies.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot; AND THE AUTHOR DISCLAIMS ALL
      WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
      OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
      ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
      WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
      ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
      IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;sass-loader&quot;: &quot;^13.0.2&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;semver&quot;: &quot;^7.3.7&quot;
      <br />
      The ISC License
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted, provided that the above
      copyright notice and this permission notice appear in all copies.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot; AND THE AUTHOR DISCLAIMS ALL
      WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
      OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
      ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
      WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
      ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
      IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;source-map-loader&quot;: &quot;^3.0.1&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;sql.js&quot;: &quot;^1.7.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Ophir LOJKINE {"<"}pere.jobs@gmail.com{">"} (https://github.com/lovasoa)
      <br />
      @kripken
      <br />
      @hankinsoft
      <br />
      @firien
      <br />
      @dinedal
      <br />
      @taytay
      <br />
      @kaizhu256
      <br />
      @brodybits
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      MIT license
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) 2017 sql.js authors (see AUTHORS)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      # Some portions of the Makefile taken from:
      <br />
      Copyright 2017 Ryusei Yamaguchi
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;stylelint-config-styled-components&quot;: &quot;^0.1.1&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      ## License
      <br />
      [MIT](http://ismay.mit-license.org/)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      [version-url]:
      https://www.npmjs.com/package/stylelint-config-styled-components
      <br />
      [build-badge]:
      https://travis-ci.org/styled-components/stylelint-config-styled-components.svg?branch=master
      <br />
      [build-url]:
      https://travis-ci.org/styled-components/stylelint-config-styled-components
      <br />
      [greenkeeper-badge]:
      https://badges.greenkeeper.io/styled-components/stylelint-config-styled-components.svg
      <br />
      [greenkeeper-url]: https://greenkeeper.io/
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;stylelint-processor-styled-components&quot;: &quot;^1.10.0&quot;{" "}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>## License</LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the MIT License, Copyright © 2017 Maximilian Stoiber. See
      [LICENSE.md](./LICENSE.md) for more information!
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Based on Mapbox&apos; excellent
      [`stylelint-processor-markdown`](https://github.com/mapbox/stylelint-processor-markdown),
      thanks to @davidtheclark!{" "}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      MIT License
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) 2016 Maximilian Stoiber
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;svg-react-loader&quot;: &quot;^0.4.6&quot;
      <br />
      Copyright (c) 2016 Jerry Hamlet {"<"}jerry@hamletink.com{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;tar-stream&quot;: &quot;^2.2.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2014 Mathias Buus
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;tcp-port-used&quot;: &quot;^1.0.2&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2013 jut-io
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;terser-webpack-plugin&quot;: &quot;^5.3.6&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;ts-jest&quot;: &quot;^29.1.1&quot;
      <br />
      MIT License
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;ts-node&quot;: &quot;^10.9.1&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}># License</LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      ts-node is licensed under the MIT license.
      [MIT](https://github.com/TypeStrong/ts-node/blob/main/LICENSE)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      ts-node includes source code from Node.js which is licensed under the MIT
      license. [Node.js license
      information](https://raw.githubusercontent.com/nodejs/node/master/LICENSE)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      ts-node includes source code from the TypeScript compiler which is
      licensed under the Apache License 2.0. [TypeScript license
      information](https://github.com/microsoft/TypeScript/blob/master/LICENSE.txt)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The MIT License (MIT)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;url-loader&quot;: &quot;4.1.1&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;usb&quot;: &quot;^1.9.2&quot;
      <br />
      Copyright (c) 2012 Nonolith Labs, LLC
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;usehooks-ts&quot;: &quot;^2.6.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2020 Julien CARON
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;utf8&quot;: &quot;^3.0.0&quot;
      <br />
      Copyright Mathias Bynens {"<"}https://mathiasbynens.be/{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;util&quot;: &quot;^0.12.4&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;uuid&quot;: &quot;^9.0.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2010-2020 Robert Kieffer and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;vcf&quot;: &quot;^2.1.2&quot;
      <br />
      # The MIT License (MIT)
      <br />
      Copyright (c) 2015 Jonas Hermsmeier
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;webpack&quot;: &quot;^5.74.0&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;webpack-cli&quot;: &quot;^4.10.0&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;webpack-dev-server&quot;: &quot;^4.15.1&quot;
      <br />
      Copyright JS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;winston&quot;: &quot;^3.8.2&quot;
      <br />
      Copyright (c) 2010 Charlie Robbins
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;winston-daily-rotate-file&quot;: &quot;^4.7.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 winstonjs
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;winston-transport-rollbar-3&quot;: &quot;^3.2.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2013 Ideame
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@contentful/rich-text-plain-text-renderer&quot;: &quot;^16.2.6&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2018 Contentful
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@orama/orama&quot;: &quot;^2.0.22&quot;
      <br />
      Copyright 2023 OramaSearch Inc
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License. You may
      obtain a copy of the License at
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      http://www.apache.org/licenses/LICENSE-2.0
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an &quot;AS IS&quot;
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied. See the License for the specific language governing permissions
      and limitations under the License.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;@vscode/sudo-prompt&quot;: &quot;^9.3.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Joran Dirk Greef
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) OpenJS Foundation and other contributors
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;crypto-js&quot;: &quot;^4.2.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      # License
      <br />
      [The MIT License (MIT)](http://opensource.org/licenses/MIT)
      <br />
      Copyright (c) 2009-2013 Jeff Mott
      <br />
      Copyright (c) 2013-2016 Evan Vosberg
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;js-crc&quot;: &quot;^0.2.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright 2015-2017 Chen, Yi-Cyuan
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;jschardet&quot;: &quot;^3.1.2&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright 2015-2017 Chen, Yi-Cyuan
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      {"/*"} <br />
      * The Original Code is Mozilla Universal charset detector code.
      <br />
      *<br />
      * The Initial Developer of the Original Code is
      <br />
      * Netscape Communications Corporation.
      <br />
      * Portions created by the Initial Developer are Copyright (C) 2001
      <br />
      * the Initial Developer. All Rights Reserved.
      <br />
      *<br />
      * Contributor(s):
      <br />
      * António Afonso (antonio.afonso gmail.com) - port to JavaScript
      <br />
      * Mark Pilgrim - port to Python
      <br />
      * Shy Shalom - original C code
      <br />
      *<br />
      * This library is free software; you can redistribute it and/or
      <br />
      * modify it under the terms of the GNU Lesser General Public
      <br />
      * License as published by the Free Software Foundation; either
      <br />
      * version 2.1 of the License, or (at your option) any later version.
      <br />
      *<br />
      * This library is distributed in the hope that it will be useful,
      <br />
      * but WITHOUT ANY WARRANTY; without even the implied warranty of
      <br />
      * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
      <br />
      * Lesser General Public License for more details.
      <br />
      *<br />
      * You should have received a copy of the GNU Lesser General Public
      <br />
      * License along with this library; if not, write to the Free Software
      <br />
      * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
      <br />
      * 02110-1301 USA
      <br />
      {"*/"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      GNU LESSER GENERAL PUBLIC LICENSE
      <br />
      Version 2.1, February 1999
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (C) 1991, 1999 Free Software Foundation, Inc. 51 Franklin
      Street, Fifth Floor, Boston, MA 02110-1301 USA Everyone is permitted to
      copy and distribute verbatim copies of this license document, but changing
      it is not allowed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      (This is the first released version of the Lesser GPL. It also counts as
      the successor of the GNU Library Public License, version 2, hence the
      version number 2.1.)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>Preamble</LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The licenses for most software are designed to take away your freedom to
      share and change it. By contrast, the GNU General Public Licenses are
      intended to guarantee your freedom to share and change free software--to
      make sure the software is free for all its users.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This license, the Lesser General Public License, applies to some specially
      designated software packages--typically libraries--of the Free Software
      Foundation and other authors who decide to use it. You can use it too, but
      we suggest you first think carefully about whether this license or the
      ordinary General Public License is the better strategy to use in any
      particular case, based on the explanations below.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      When we speak of free software, we are referring to freedom of use, not
      price. Our General Public Licenses are designed to make sure that you have
      the freedom to distribute copies of free software (and charge for this
      service if you wish); that you receive source code or can get it if you
      want it; that you can change the software and use pieces of it in new free
      programs; and that you are informed that you can do these things.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To protect your rights, we need to make restrictions that forbid
      distributors to deny you these rights or to ask you to surrender these
      rights. These restrictions translate to certain responsibilities for you
      if you distribute copies of the library or if you modify it.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      For example, if you distribute copies of the library, whether gratis or
      for a fee, you must give the recipients all the rights that we gave you.
      You must make sure that they, too, receive or can get the source code. If
      you link other code with the library, you must provide complete object
      files to the recipients, so that they can relink them with the library
      after making changes to the library and recompiling it. And you must show
      them these terms so they know their rights.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      We protect your rights with a two-step method: (1) we copyright the
      library, and (2) we offer you this license, which gives you legal
      permission to copy, distribute and/or modify the library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To protect each distributor, we want to make it very clear that there is
      no warranty for the free library. Also, if the library is modified by
      someone else and passed on, the recipients should know that what they have
      is not the original version, so that the original author&apos;s reputation
      will not be affected by problems that might be introduced by others.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Finally, software patents pose a constant threat to the existence of any
      free program. We wish to make sure that a company cannot effectively
      restrict the users of a free program by obtaining a restrictive license
      from a patent holder. Therefore, we insist that any patent license
      obtained for a version of the library must be consistent with the full
      freedom of use specified in this license.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Most GNU software, including some libraries, is covered by the ordinary
      GNU General Public License. This license, the GNU Lesser General Public
      License, applies to certain designated libraries, and is quite different
      from the ordinary General Public License. We use this license for certain
      libraries in order to permit linking those libraries into non-free
      programs.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      When a program is linked with a library, whether statically or using a
      shared library, the combination of the two is legally speaking a combined
      work, a derivative of the original library. The ordinary General Public
      License therefore permits such linking only if the entire combination fits
      its criteria of freedom. The Lesser General Public License permits more
      lax criteria for linking other code with the library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      We call this license the &quot;Lesser&quot; General Public License because
      it does Less to protect the user&apos;s freedom than the ordinary General
      Public License. It also provides other free software developers Less of an
      advantage over competing non-free programs. These disadvantages are the
      reason we use the ordinary General Public License for many libraries.
      However, the Lesser license provides advantages in certain special
      circumstances.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      For example, on rare occasions, there may be a special need to encourage
      the widest possible use of a certain library, so that it becomes a
      de-facto standard. To achieve this, non-free programs must be allowed to
      use the library. A more frequent case is that a free library does the same
      job as widely used non-free libraries. In this case, there is little to
      gain by limiting the free library to free software only, so we use the
      Lesser General Public License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      In other cases, permission to use a particular library in non-free
      programs enables a greater number of people to use a large body of free
      software. For example, permission to use the GNU C Library in non-free
      programs enables many more people to use the whole GNU operating system,
      as well as its variant, the GNU/Linux operating system.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Although the Lesser General Public License is Less protective of the
      users&apos; freedom, it does ensure that the user of a program that is
      linked with the Library has the freedom and the wherewithal to run that
      program using a modified version of the Library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The precise terms and conditions for copying, distribution and
      modification follow. Pay close attention to the difference between a
      &quot;work based on the library&quot; and a &quot;work that uses the
      library&quot;. The former contains code derived from the library, whereas
      the latter must be combined with the library in order to run.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      GNU LESSER GENERAL PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING,
      DISTRIBUTION AND MODIFICATION
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      0. This License Agreement applies to any software library or other program
      which contains a notice placed by the copyright holder or other authorized
      party saying it may be distributed under the terms of this Lesser General
      Public License (also called &quot;this License&quot;). Each licensee is
      addressed as &quot;you&quot;.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      A &quot;library&quot; means a collection of software functions and/or data
      prepared so as to be conveniently linked with application programs (which
      use some of those functions and data) to form executables.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The &quot;Library&quot;, below, refers to any such software library or
      work which has been distributed under these terms. A &quot;work based on
      the Library&quot; means either the Library or any derivative work under
      copyright law: that is to say, a work containing the Library or a portion
      of it, either verbatim or with modifications and/or translated
      straightforwardly into another language. (Hereinafter, translation is
      included without limitation in the term &quot;modification&quot;.)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Source code&quot; for a work means the preferred form of the work
      for making modifications to it. For a library, complete source code means
      all the source code for all modules it contains, plus any associated
      interface definition files, plus the scripts used to control compilation
      and installation of the library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Activities other than copying, distribution and modification are not
      covered by this License; they are outside its scope. The act of running a
      program using the Library is not restricted, and output from such a
      program is covered only if its contents constitute a work based on the
      Library (independent of the use of the Library in a tool for writing it).
      Whether that is true depends on what the Library does and what the program
      that uses the Library does.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      1. You may copy and distribute verbatim copies of the Library&apos;s
      complete source code as you receive it, in any medium, provided that you
      conspicuously and appropriately publish on each copy an appropriate
      copyright notice and disclaimer of warranty; keep intact all the notices
      that refer to this License and to the absence of any warranty; and
      distribute a copy of this License along with the Library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You may charge a fee for the physical act of transferring a copy, and you
      may at your option offer warranty protection in exchange for a fee.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      2. You may modify your copy or copies of the Library or any portion of it,
      thus forming a work based on the Library, and copy and distribute such
      modifications or work under the terms of Section 1 above, provided that
      you also meet all of these conditions:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      a) The modified work must itself be a software library.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      b) You must cause the files modified to carry prominent notices stating
      that you changed the files and the date of any change.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      c) You must cause the whole of the work to be licensed at no charge to all
      third parties under the terms of this License.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      d) If a facility in the modified Library refers to a function or a table
      of data to be supplied by an application program that uses the facility,
      other than as an argument passed when the facility is invoked, then you
      must make a good faith effort to ensure that, in the event an application
      does not supply such function or table, the facility still operates, and
      performs whatever part of its purpose remains meaningful.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (For example, a function in a library to compute square roots has a
      purpose that is entirely well-defined independent of the application.
      Therefore, Subsection 2d requires that any application-supplied function
      or table used by this function must be optional: if the application does
      not supply it, the square root function must still compute square roots.)
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      These requirements apply to the modified work as a whole. If identifiable
      sections of that work are not derived from the Library, and can be
      reasonably considered independent and separate works in themselves, then
      this License, and its terms, do not apply to those sections when you
      distribute them as separate works. But when you distribute the same
      sections as part of a whole which is a work based on the Library, the
      distribution of the whole must be on the terms of this License, whose
      permissions for other licensees extend to the entire whole, and thus to
      each and every part regardless of who wrote it.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Thus, it is not the intent of this section to claim rights or contest your
      rights to work written entirely by you; rather, the intent is to exercise
      the right to control the distribution of derivative or collective works
      based on the Library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      In addition, mere aggregation of another work not based on the Library
      with the Library (or with a work based on the Library) on a volume of a
      storage or distribution medium does not bring the other work under the
      scope of this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      3. You may opt to apply the terms of the ordinary GNU General Public
      License instead of this License to a given copy of the Library. To do
      this, you must alter all the notices that refer to this License, so that
      they refer to the ordinary GNU General Public License, version 2, instead
      of to this License. (If a newer version than version 2 of the ordinary GNU
      General Public License has appeared, then you can specify that version
      instead if you wish.) Do not make any other change in these notices.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Once this change is made in a given copy, it is irreversible for that
      copy, so the ordinary GNU General Public License applies to all subsequent
      copies and derivative works made from that copy.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This option is useful when you wish to copy part of the code of the
      Library into a program that is not a library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      4. You may copy and distribute the Library (or a portion or derivative of
      it, under Section 2) in object code or executable form under the terms of
      Sections 1 and 2 above provided that you accompany it with the complete
      corresponding machine-readable source code, which must be distributed
      under the terms of Sections 1 and 2 above on a medium customarily used for
      software interchange.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      If distribution of object code is made by offering access to copy from a
      designated place, then offering equivalent access to copy the source code
      from the same place satisfies the requirement to distribute the source
      code, even though third parties are not compelled to copy the source along
      with the object code.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      5. A program that contains no derivative of any portion of the Library,
      but is designed to work with the Library by being compiled or linked with
      it, is called a &quot;work that uses the Library&quot;. Such a work, in
      isolation, is not a derivative work of the Library, and therefore falls
      outside the scope of this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      However, linking a &quot;work that uses the Library&quot; with the Library
      creates an executable that is a derivative of the Library (because it
      contains portions of the Library), rather than a &quot;work that uses the
      library&quot;. The executable is therefore covered by this License.
      Section 6 states terms for distribution of such executables.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      When a &quot;work that uses the Library&quot; uses material from a header
      file that is part of the Library, the object code for the work may be a
      derivative work of the Library even though the source code is not. Whether
      this is true is especially significant if the work can be linked without
      the Library, or if the work is itself a library. The threshold for this to
      be true is not precisely defined by law.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      If such an object file uses only numerical parameters, data structure
      layouts and accessors, and small macros and small inline functions (ten
      lines or less in length), then the use of the object file is unrestricted,
      regardless of whether it is legally a derivative work. (Executables
      containing this object code plus portions of the Library will still fall
      under Section 6.)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Otherwise, if the work is a derivative of the Library, you may distribute
      the object code for the work under the terms of Section 6. Any executables
      containing that work also fall under Section 6, whether or not they are
      linked directly with the Library itself.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      6. As an exception to the Sections above, you may also combine or link a
      &quot;work that uses the Library&quot; with the Library to produce a work
      containing portions of the Library, and distribute that work under terms
      of your choice, provided that the terms permit modification of the work
      for the customer&apos;s own use and reverse engineering for debugging such
      modifications.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You must give prominent notice with each copy of the work that the Library
      is used in it and that the Library and its use are covered by this
      License. You must supply a copy of this License. If the work during
      execution displays copyright notices, you must include the copyright
      notice for the Library among them, as well as a reference directing the
      user to the copy of this License. Also, you must do one of these things:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      a) Accompany the work with the complete corresponding machine-readable
      source code for the Library including whatever changes were used in the
      work (which must be distributed under Sections 1 and 2 above); and, if the
      work is an executable linked with the Library, with the complete
      machine-readable &quot;work that uses the Library&quot;, as object code
      and/or source code, so that the user can modify the Library and then
      relink to produce a modified executable containing the modified Library.
      (It is understood that the user who changes the contents of definitions
      files in the Library will not necessarily be able to recompile the
      application to use the modified definitions.)
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      b) Use a suitable shared library mechanism for linking with the Library. A
      suitable mechanism is one that (1) uses at run time a copy of the library
      already present on the user&apos;s computer system, rather than copying
      library functions into the executable, and (2) will operate properly with
      a modified version of the library, if the user installs one, as long as
      the modified version is interface-compatible with the version that the
      work was made with.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      c) Accompany the work with a written offer, valid for at least three
      years, to give the same user the materials specified in Subsection 6a,
      above, for a charge no more than the cost of performing this distribution.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      d) If distribution of the work is made by offering access to copy from a
      designated place, offer equivalent access to copy the above specified
      materials from the same place.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      e) Verify that the user has already received a copy of these materials or
      that you have already sent this user a copy.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      For an executable, the required form of the &quot;work that uses the
      Library&quot; must include any data and utility programs needed for
      reproducing the executable from it. However, as a special exception, the
      materials to be distributed need not include anything that is normally
      distributed (in either source or binary form) with the major components
      (compiler, kernel, and so on) of the operating system on which the
      executable runs, unless that component itself accompanies the executable.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      It may happen that this requirement contradicts the license restrictions
      of other proprietary libraries that do not normally accompany the
      operating system. Such a contradiction means you cannot use both them and
      the Library together in an executable that you distribute.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      7. You may place library facilities that are a work based on the Library
      side-by-side in a single library together with other library facilities
      not covered by this License, and distribute such a combined library,
      provided that the separate distribution of the work based on the Library
      and of the other library facilities is otherwise permitted, and provided
      that you do these two things:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      a) Accompany the combined library with a copy of the same work based on
      the Library, uncombined with any other library facilities. This must be
      distributed under the terms of the Sections above.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      b) Give prominent notice with the combined library of the fact that part
      of it is a work based on the Library, and explaining where to find the
      accompanying uncombined form of the same work.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      8. You may not copy, modify, sublicense, link with, or distribute the
      Library except as expressly provided under this License. Any attempt
      otherwise to copy, modify, sublicense, link with, or distribute the
      Library is void, and will automatically terminate your rights under this
      License. However, parties who have received copies, or rights, from you
      under this License will not have their licenses terminated so long as such
      parties remain in full compliance.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      9. You are not required to accept this License, since you have not signed
      it. However, nothing else grants you permission to modify or distribute
      the Library or its derivative works. These actions are prohibited by law
      if you do not accept this License. Therefore, by modifying or distributing
      the Library (or any work based on the Library), you indicate your
      acceptance of this License to do so, and all its terms and conditions for
      copying, distributing or modifying the Library or works based on it.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      10. Each time you redistribute the Library (or any work based on the
      Library), the recipient automatically receives a license from the original
      licensor to copy, distribute, link with or modify the Library subject to
      these terms and conditions. You may not impose any further restrictions on
      the recipients&apos; exercise of the rights granted herein. You are not
      responsible for enforcing compliance by third parties with this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      11. If, as a consequence of a court judgment or allegation of patent
      infringement or for any other reason (not limited to patent issues),
      conditions are imposed on you (whether by court order, agreement or
      otherwise) that contradict the conditions of this License, they do not
      excuse you from the conditions of this License. If you cannot distribute
      so as to satisfy simultaneously your obligations under this License and
      any other pertinent obligations, then as a consequence you may not
      distribute the Library at all. For example, if a patent license would not
      permit royalty-free redistribution of the Library by all those who receive
      copies directly or indirectly through you, then the only way you could
      satisfy both it and this License would be to refrain entirely from
      distribution of the Library.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      If any portion of this section is held invalid or unenforceable under any
      particular circumstance, the balance of the section is intended to apply,
      and the section as a whole is intended to apply in other circumstances.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      It is not the purpose of this section to induce you to infringe any
      patents or other property right claims or to contest validity of any such
      claims; this section has the sole purpose of protecting the integrity of
      the free software distribution system which is implemented by public
      license practices. Many people have made generous contributions to the
      wide range of software distributed through that system in reliance on
      consistent application of that system; it is up to the author/donor to
      decide if he or she is willing to distribute software through any other
      system and a licensee cannot impose that choice.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      This section is intended to make thoroughly clear what is believed to be a
      consequence of the rest of this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      12. If the distribution and/or use of the Library is restricted in certain
      countries either by patents or by copyrighted interfaces, the original
      copyright holder who places the Library under this License may add an
      explicit geographical distribution limitation excluding those countries,
      so that distribution is permitted only in or among countries not thus
      excluded. In such case, this License incorporates the limitation as if
      written in the body of this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      13. The Free Software Foundation may publish revised and/or new versions
      of the Lesser General Public License from time to time. Such new versions
      will be similar in spirit to the present version, but may differ in detail
      to address new problems or concerns.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Each version is given a distinguishing version number. If the Library
      specifies a version number of this License which applies to it and
      &quot;any later version&quot;, you have the option of following the terms
      and conditions either of that version or of any later version published by
      the Free Software Foundation. If the Library does not specify a license
      version number, you may choose any version ever published by the Free
      Software Foundation.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      14. If you wish to incorporate parts of the Library into other free
      programs whose distribution conditions are incompatible with these, write
      to the author to ask for permission. For software which is copyrighted by
      the Free Software Foundation, write to the Free Software Foundation; we
      sometimes make exceptions for this. Our decision will be guided by the two
      goals of preserving the free status of all derivatives of our free
      software and of promoting the sharing and reuse of software generally.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      NO WARRANTY
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      15. BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY
      FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN
      OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES
      PROVIDE THE LIBRARY &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EITHER
      EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
      WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE
      ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
      SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY
      SERVICING, REPAIR OR CORRECTION.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      16. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
      WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR
      REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES,
      INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES
      ARISING OUT OF THE USE OR INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT
      LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES
      SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE
      WITH ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN
      ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      END OF TERMS AND CONDITIONS
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      How to Apply These Terms to Your New Libraries
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      If you develop a new library, and you want it to be of the greatest
      possible use to the public, we recommend making it free software that
      everyone can redistribute and change. You can do so by permitting
      redistribution under these terms (or, alternatively, under the terms of
      the ordinary General Public License).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To apply these terms, attach the following notices to the library. It is
      safest to attach them to the start of each source file to most effectively
      convey the exclusion of warranty; and each file should have at least the
      &quot;copyright&quot; line and a pointer to where the full notice is
      found.
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      {"{"}description{"}"}
      <br />
      Copyright (C) {"{"}year{"}"} {"{"}fullname{"}"}
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      This library is free software; you can redistribute it and/or modify it
      under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation; either version 2.1 of the License, or (at
      your option) any later version.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      This library is distributed in the hope that it will be useful, but
      WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
      or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public
      License for more details.
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      You should have received a copy of the GNU Lesser General Public License
      along with this library; if not, write to the Free Software Foundation,
      Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Also add information on how to contact you by electronic and paper mail.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You should also get your employer (if you work as a programmer) or your
      school, if any, to sign a &quot;copyright disclaimer&quot; for the
      library, if necessary. Here is a sample; alter the names:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Yoyodyne, Inc., hereby disclaims all copyright interest in the library
      `Frob&apos; (a library for tweaking knobs) written by James Random Hacker.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      {"{"}signature of Ty Coon{"}"}, 1 April 1990 Ty Coon, President of Vice
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      That&apos;s all there is to it!
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;node-ipc&quot;: &quot;10.1.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2020 Brandon Nozaki Miller
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;papaparse&quot;: &quot;^5.4.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Matthew Holt
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-is&quot;: &quot;18.2.0&quot;
      <br />
      MIT License
      <br />
      Copyright (c) Facebook, Inc. and its affiliates.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;react-markdown&quot;: &quot;^9.0.1&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright (c) 2015 Espen Hovlandsdal
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;serialport&quot;: &quot;10.1.0&quot;
      <br />
      The MIT License (MIT)
      <br />
      Copyright 2010 Christopher Williams. All rights reserved.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;sharp&quot;: &quot;^0.32.5&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      ## Licensing
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright 2013 Lovell Fuller and others.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License.
      <br />
      You may obtain a copy of the License at
      [https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an &quot;AS IS&quot;
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied. See the License for the specific language governing permissions
      and limitations under the License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Apache License
      <br />
      Version 2.0, January 2004
      <br />
      http://www.apache.org/licenses/
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      1. Definitions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;License&quot; shall mean the terms and conditions for use,
      reproduction, and distribution as defined by Sections 1 through 9 of this
      document.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Licensor&quot; shall mean the copyright owner or entity authorized
      by the copyright owner that is granting the License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Legal Entity&quot; shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      &quot;control&quot; means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or otherwise,
      or (ii) ownership of fifty percent (50%) or more of the outstanding
      shares, or (iii) beneficial ownership of such entity.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal
      Entity exercising permissions granted by this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Source&quot; form shall mean the preferred form for making
      modifications, including but not limited to software source code,
      documentation source, and configuration files.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Object&quot; form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but not limited
      to compiled object code, generated documentation, and conversions to other
      media types.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Work&quot; shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a copyright
      notice that is included in or attached to the work (an example is provided
      in the Appendix below).
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Derivative Works&quot; shall mean any work, whether in Source or
      Object form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes of
      this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of, the
      Work and Derivative Works thereof.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contribution&quot; shall mean any work of authorship, including the
      original version of the Work and any modifications or additions to that
      Work or Derivative Works thereof, that is intentionally submitted to
      Licensor for inclusion in the Work by the copyright owner or by an
      individual or Legal Entity authorized to submit on behalf of the copyright
      owner. For the purposes of this definition, &quot;submitted&quot; means
      any form of electronic, verbal, or written communication sent to the
      Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as &quot;Not a
      Contribution.&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;Contributor&quot; shall mean Licensor and any individual or Legal
      Entity on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      2. Grant of Copyright License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable copyright license to
      reproduce, prepare Derivative Works of, publicly display, publicly
      perform, sublicense, and distribute the Work and such Derivative Works in
      Source or Object form.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      3. Grant of Patent License. Subject to the terms and conditions of this
      License, each Contributor hereby grants to You a perpetual, worldwide,
      non-exclusive, no-charge, royalty-free, irrevocable (except as stated in
      this section) patent license to make, have made, use, offer to sell, sell,
      import, and otherwise transfer the Work, where such license applies only
      to those patent claims licensable by such Contributor that are necessarily
      infringed by their Contribution(s) alone or by combination of their
      Contribution(s) with the Work to which such Contribution(s) was submitted.
      If You institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work or a
      Contribution incorporated within the Work constitutes direct or
      contributory patent infringement, then any patent licenses granted to You
      under this License for that Work shall terminate as of the date such
      litigation is filed.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      4. Redistribution. You may reproduce and distribute copies of the Work or
      Derivative Works thereof in any medium, with or without modifications, and
      in Source or Object form, provided that You meet the following conditions:
    </LightText>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (a) You must give any other recipients of the Work or Derivative Works a
      copy of this License; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (b) You must cause any modified files to carry prominent notices stating
      that You changed the files; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (c) You must retain, in the Source form of any Derivative Works that You
      distribute, all copyright, patent, trademark, and attribution notices from
      the Source form of the Work, excluding those notices that do not pertain
      to any part of the Derivative Works; and
    </LightTextNested>
    <LightTextNested displayStyle={TextDisplayStyle.Paragraph4}>
      (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
      distribution, then any Derivative Works that You distribute must include a
      readable copy of the attribution notices contained within such NOTICE
      file, excluding those notices that do not pertain to any part of the
      Derivative Works, in at least one of the following places: within a NOTICE
      text file distributed as part of the Derivative Works; within the Source
      form or documentation, if provided along with the Derivative Works; or,
      within a display generated by the Derivative Works, if and wherever such
      third-party notices normally appear. The contents of the NOTICE file are
      for informational purposes only and do not modify the License. You may add
      Your own attribution notices within Derivative Works that You distribute,
      alongside or as an addendum to the NOTICE text from the Work, provided
      that such additional attribution notices cannot be construed as modifying
      the License.
    </LightTextNested>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      You may add Your own copyright statement to Your modifications and may
      provide additional or different license terms and conditions for use,
      reproduction, or distribution of Your modifications, or for any such
      Derivative Works as a whole, provided Your use, reproduction, and
      distribution of the Work otherwise complies with the conditions stated in
      this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      5. Submission of Contributions. Unless You explicitly state otherwise, any
      Contribution intentionally submitted for inclusion in the Work by You to
      the Licensor shall be under the terms and conditions of this License,
      without any additional terms or conditions. Notwithstanding the above,
      nothing herein shall supersede or modify the terms of any separate license
      agreement you may have executed with Licensor regarding such
      Contributions.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor, except
      as required for reasonable and customary use in describing the origin of
      the Work and reproducing the content of the NOTICE file.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      7. Disclaimer of Warranty. Unless required by applicable law or agreed to
      in writing, Licensor provides the Work (and each Contributor provides its
      Contributions) on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR
      CONDITIONS OF ANY KIND, either express or implied, including, without
      limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT,
      MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely
      responsible for determining the appropriateness of using or redistributing
      the Work and assume any risks associated with Your exercise of permissions
      under this License.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      8. Limitation of Liability. In no event and under no legal theory, whether
      in tort (including negligence), contract, or otherwise, unless required by
      applicable law (such as deliberate and grossly negligent acts) or agreed
      to in writing, shall any Contributor be liable to You for damages,
      including any direct, indirect, special, incidental, or consequential
      damages of any character arising as a result of this License or out of the
      use or inability to use the Work (including but not limited to damages for
      loss of goodwill, work stoppage, computer failure or malfunction, or any
      and all other commercial damages or losses), even if such Contributor has
      been advised of the possibility of such damages.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      9. Accepting Warranty or Additional Liability. While redistributing the
      Work or Derivative Works thereof, You may choose to offer, and charge a
      fee for, acceptance of support, warranty, indemnity, or other liability
      obligations and/or rights consistent with this License. However, in
      accepting such obligations, You may act only on Your own behalf and on
      Your sole responsibility, not on behalf of any other Contributor, and only
      if You agree to indemnify, defend, and hold each Contributor harmless for
      any liability incurred by, or claims asserted against, such Contributor by
      reason of your accepting any such warranty or additional liability.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      END OF TERMS AND CONDITIONS
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      APPENDIX: How to apply the Apache License to your work.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      To apply the Apache License to your work, attach the following boilerplate
      notice, with the fields enclosed by brackets &quot;[]&quot; replaced with
      your own identifying information. (Don&apos;t include the brackets!) The
      text should be enclosed in the appropriate comment syntax for the file
      format. We also recommend that a file or class name and description of
      purpose be included on the same &quot;printed page&quot; as the copyright
      notice for easier identification within third-party archives.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright [yyyy] [name of copyright owner]
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
      you may not use this file except in compliance with the License. You may
      obtain a copy of the License at
      <br />
      http://www.apache.org/licenses/LICENSE-2.0
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an &quot;AS IS&quot;
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied. See the License for the specific language governing permissions
      and limitations under the License.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;tar&quot;: &quot;^7.4.3&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The ISC License
      <br />
      Copyright (c) 2016, Aaron Ackerman {"<"}theron17@gmail.com{">"}
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted, provided that the above
      copyright notice and this permission notice appear in all copies.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot; AND THE AUTHOR DISCLAIMS ALL
      WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
      OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
      ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
      WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
      ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
      IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;tslib&quot;: &quot;^2.3.0&quot;
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Copyright (c) Microsoft Corporation.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot; AND THE AUTHOR DISCLAIMS ALL
      WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
      OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
      ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
      WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
      ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
      IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    </LightText>
    <WindowTitle displayStyle={TextDisplayStyle.Paragraph3}>
      Notice for file(s):
    </WindowTitle>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      &quot;zod&quot;: &quot;^3.22.4&quot;
      <br />
      MIT License
      <br />
      Copyright (c) 2020 Colin McDonnell
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the
      &quot;Software&quot;), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to
      the following conditions:
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </LightText>
    <LightText displayStyle={TextDisplayStyle.Paragraph4}>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </LightText>
  </WindowContainer>
)
