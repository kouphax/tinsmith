#### CustomElements
- Fixed #78 ([commit](https://github.com/Polymer/CustomElements/commit/40223bf))
- Add newValue to attributeChangedCallback; fixes #77 ([commit](https://github.com/Polymer/CustomElements/commit/8aaf3bc))

#### HTMLImports

#### MutationObservers

#### NodeBind

#### PointerEvents
- Merge pull request #109 from azakus/preventdefault ([commit](https://github.com/Polymer/PointerEvents/commit/ae7dd29))
- Prevent accidentally overriding preventDefault with undefined ([commit](https://github.com/Polymer/PointerEvents/commit/c5de81d))
- Remove erroneous Touch.preventDefault call ([commit](https://github.com/Polymer/PointerEvents/commit/876fa42))
- Tunnel source event preventDefault to PointerEvents ([commit](https://github.com/Polymer/PointerEvents/commit/2deb730))
- Merge pull request #107 from azakus/master ([commit](https://github.com/Polymer/PointerEvents/commit/55ba839))
- Re-enable touch efp optimization for simple case ([commit](https://github.com/Polymer/PointerEvents/commit/3fa843d))
- Merge pull request #106 from scottgonzalez/old-ie-support ([commit](https://github.com/Polymer/PointerEvents/commit/8efd3a8))
- Added support for external hooks for event binding and dispatching. ([commit](https://github.com/Polymer/PointerEvents/commit/adfbfd5))
- Update everything that can't be polyfilled in old IE. ([commit](https://github.com/Polymer/PointerEvents/commit/e5bb088))
- Allow for use in old IE by providing a non-getter API for size of pointermap ([commit](https://github.com/Polymer/PointerEvents/commit/c1d7830))

#### PointerGestures
- Add the element under the pointer to track events as relatedTarget ([commit](https://github.com/Polymer/PointerGestures/commit/5374726))

#### ShadowDOM
- MutationObserver: Fix issues related to shadow dom ([commit](https://github.com/Polymer/ShadowDOM/commit/6a99ee0))
- Merge pull request #300 from arv/clone-node-with-shadow-root ([commit](https://github.com/Polymer/ShadowDOM/commit/f59012f))
- Implement MutationObserver from scratch ([commit](https://github.com/Polymer/ShadowDOM/commit/56e3d82))
- Merge pull request #298 from arv/fix-canvas-2d-context ([commit](https://github.com/Polymer/ShadowDOM/commit/4b62222))
- Don't use native cloneNode ([commit](https://github.com/Polymer/ShadowDOM/commit/88c78c8))
- Merge pull request #299 from arv/fix-audio-test ([commit](https://github.com/Polymer/ShadowDOM/commit/45c3ae4))
- Fix tests for HTMLAudioElement ([commit](https://github.com/Polymer/ShadowDOM/commit/cbfd333))
- Fix issue with missing instance properties on canvas context classes ([commit](https://github.com/Polymer/ShadowDOM/commit/3dd1711))
- Merge branch 'explicit-global' of git://github.com/timoxley/ShadowDOM into timoxley-explicit-global ([commit](https://github.com/Polymer/ShadowDOM/commit/2120081))
- Merge pull request #285 from arv/audio-and-option ([commit](https://github.com/Polymer/ShadowDOM/commit/31c0d96))
- Merge pull request #289 from arv/shadow-root-host-property ([commit](https://github.com/Polymer/ShadowDOM/commit/238f6b6))
- Merge pull request #291 from arv/ie-document-fragment-work-arounds ([commit](https://github.com/Polymer/ShadowDOM/commit/e1c7290))
- Merge pull request #292 from sigmundch/patch-1 ([commit](https://github.com/Polymer/ShadowDOM/commit/67666a6))
- Preserve 'extends' when the ShadowDOM polyfill patches document.register ([commit](https://github.com/Polymer/ShadowDOM/commit/71cccbf))
- Wrap originalRemoveChild to capture unexpected exceptions ([commit](https://github.com/Polymer/ShadowDOM/commit/7991c56))
- Gather nodes before removing them in collectNodes ([commit](https://github.com/Polymer/ShadowDOM/commit/50c9555))
- If parentNode is not correct check for child in childNodes ([commit](https://github.com/Polymer/ShadowDOM/commit/f6e5d43))
- Add the host property to the ShadowRoot interface ([commit](https://github.com/Polymer/ShadowDOM/commit/4a2f593))
- Merge pull request #288 from Polymer/fix-hasEval ([commit](https://github.com/Polymer/ShadowDOM/commit/589410b))
- must set `hasEval` to false if the Function() constructor test throws ([commit](https://github.com/Polymer/ShadowDOM/commit/15868fb))
- Merge pull request #284 from arv/webgl-fix ([commit](https://github.com/Polymer/ShadowDOM/commit/862dba0))
- Add Audio and Option constructors ([commit](https://github.com/Polymer/ShadowDOM/commit/c5f88c7))
- Fix issue with canvas parameters ([commit](https://github.com/Polymer/ShadowDOM/commit/80b8152))
- Explicitly read/write ShadowDOMPolyfill on window ([commit](https://github.com/Polymer/ShadowDOM/commit/8624ed2))

#### TemplateBinding
- Merge pull request #148 from jmesserly/fix_extra_arg ([commit](https://github.com/Polymer/TemplateBinding/commit/999b234))
- remote unused argument from deepCloneIgnoreTemplateContent ([commit](https://github.com/Polymer/TemplateBinding/commit/0174137))
- Enter a description of the change. discard optimization to use cloneNode deep in some cases ([commit](https://github.com/Polymer/TemplateBinding/commit/ab62e41))
- remove |name| param from prepareBinding fn ([commit](https://github.com/Polymer/TemplateBinding/commit/8028ba8))

#### WeakMap

#### labs
- book search app ([commit](https://github.com/Polymer/labs/commit/9a74d80))
- Merge branch 'master' of https://github.com/Polymer/labs ([commit](https://github.com/Polymer/labs/commit/ff46d39))
- shuttle: update to use Platform.flags ([commit](https://github.com/Polymer/labs/commit/89e82ff))
- Vulcanize has moved to https://github.com/Polymer/vulcanize ([commit](https://github.com/Polymer/labs/commit/ae53cda))
- misc ([commit](https://github.com/Polymer/labs/commit/d391ba4))
- contacts-v2: polyfill @host -> :host ([commit](https://github.com/Polymer/labs/commit/7fd6a92))
- polymer-sectioned-list: just needs <shadow></shadow> ([commit](https://github.com/Polymer/labs/commit/0cda4d6))
- more tests ([commit](https://github.com/Polymer/labs/commit/b5fc31e))
- slight optimization of viewport adjustment ([commit](https://github.com/Polymer/labs/commit/75cd97e))
- re-org tests ([commit](https://github.com/Polymer/labs/commit/63f811b))
- more list examples. ([commit](https://github.com/Polymer/labs/commit/5211441))
- add sheets to element definition ([commit](https://github.com/Polymer/labs/commit/fe432b5))
- more list tests ([commit](https://github.com/Polymer/labs/commit/a4f916f))
- slight re-org of files ([commit](https://github.com/Polymer/labs/commit/0e47486))
- contacts-v2: use polymer-sectioned-list ([commit](https://github.com/Polymer/labs/commit/7935970))
- polymer-sectioned-list: list with sticky headers ([commit](https://github.com/Polymer/labs/commit/313425d))
- contacts-v2: reorganize ([commit](https://github.com/Polymer/labs/commit/f367388))
- contacts-v2: use light icons in contact details ([commit](https://github.com/Polymer/labs/commit/57127ed))
- contacts-v2: fix exception in contact list ([commit](https://github.com/Polymer/labs/commit/0f13d77))
- list element tests ([commit](https://github.com/Polymer/labs/commit/18a592d))
- function binding. ([commit](https://github.com/Polymer/labs/commit/67c8add))
- super-scroll example ([commit](https://github.com/Polymer/labs/commit/760f0b6))
- contacts-v2: write a 'hat' rule ([commit](https://github.com/Polymer/labs/commit/7eb4b0c))
- contacts-v2: fix animation ([commit](https://github.com/Polymer/labs/commit/f607840))
- contacts-v2: disable user select ([commit](https://github.com/Polymer/labs/commit/fb31206))
- contacts-v2: ink animation in desktop mode ([commit](https://github.com/Polymer/labs/commit/51663b6))
- wip ([commit](https://github.com/Polymer/labs/commit/3193e19))
- contacts-v2: polyfill fix ([commit](https://github.com/Polymer/labs/commit/24e6848))
- adjust viewport height when page count changes. ([commit](https://github.com/Polymer/labs/commit/033b205))
- more list work ([commit](https://github.com/Polymer/labs/commit/9457735))
- contacts-v2: style error overlay ([commit](https://github.com/Polymer/labs/commit/dd511bb))
- cat and hat experiments ([commit](https://github.com/Polymer/labs/commit/e23e55b))
- contacts-v2: various small styling fixes ([commit](https://github.com/Polymer/labs/commit/ebb724b))
- contacts-v2: refactoring, responsive create screen ([commit](https://github.com/Polymer/labs/commit/b6e2b05))
- contacts-v2: layout refactoring ([commit](https://github.com/Polymer/labs/commit/f633695))
- contacts-v2: don't need to reset polymer-list ([commit](https://github.com/Polymer/labs/commit/f42f83e))
- contacts-v2: contact photo styling ([commit](https://github.com/Polymer/labs/commit/2973b38))
- contacts-v2: some responsive styling ([commit](https://github.com/Polymer/labs/commit/05f8bf7))
- contacts-v2: different "save" button ([commit](https://github.com/Polymer/labs/commit/aa6116c))
- contacts-v2: various style adjustments ([commit](https://github.com/Polymer/labs/commit/1ddef25))
- contacts-v2: complete the delete animation ([commit](https://github.com/Polymer/labs/commit/d0b00b5))
- contacts-v2: move the add button to the bottom ([commit](https://github.com/Polymer/labs/commit/8972f18))
- contacts-v2: use tokenList filter ([commit](https://github.com/Polymer/labs/commit/a3fc3e0))
- contacts-v2: use data binding for event handlers ([commit](https://github.com/Polymer/labs/commit/1401e28))
- experiments ([commit](https://github.com/Polymer/labs/commit/01a9fc0))
- imports testing ([commit](https://github.com/Polymer/labs/commit/b9ec6d4))
- more list work ([commit](https://github.com/Polymer/labs/commit/548b308))
- shuttle: use resolvePath for favorite icon ([commit](https://github.com/Polymer/labs/commit/e14f937))
- Use resolvePath to give google maps path to grey marker ([commit](https://github.com/Polymer/labs/commit/9f06314))
- shuttle: change to use tokenList filter ([commit](https://github.com/Polymer/labs/commit/4456dc9))
- shuttle: update launch icons ([commit](https://github.com/Polymer/labs/commit/ae4e455))
- scrollToRow ([commit](https://github.com/Polymer/labs/commit/7535ba0))
- horizontal list example ([commit](https://github.com/Polymer/labs/commit/06b40a3))
- publish horizontal ([commit](https://github.com/Polymer/labs/commit/994fe9d))
- list refinements ([commit](https://github.com/Polymer/labs/commit/23708de))
- contact-v2: contact list to detail transition ([commit](https://github.com/Polymer/labs/commit/6ae428e))
- contacts-v2: fix tapping on contact ([commit](https://github.com/Polymer/labs/commit/f5b9d5d))
- contacts-v2: small fix to sticky headers ([commit](https://github.com/Polymer/labs/commit/b703229))
- optimize fixedHeight ([commit](https://github.com/Polymer/labs/commit/9f1792f))
- contacts-v2: sticky headers return ([commit](https://github.com/Polymer/labs/commit/722631b))
- polymer-virtual-list: fire scroll event ([commit](https://github.com/Polymer/labs/commit/cc5edde))
- shuttle: update icons ([commit](https://github.com/Polymer/labs/commit/6f47c4b))

#### more-elements
- Bowager-style discovery experiment ([commit](https://github.com/Polymer/more-elements/commit/472b1ba))
- google-map-directions: fix typo in metadata ([commit](https://github.com/Polymer/more-elements/commit/386ed18))

#### observe-js
- dont need to quite property name ([commit](https://github.com/Polymer/observe-js/commit/2313af6))
- Use vars for record type names ([commit](https://github.com/Polymer/observe-js/commit/0c4b503))
- Add support for new Object.observe change record names ([commit](https://github.com/Polymer/observe-js/commit/b68156e))
- Set started to true in start() ([commit](https://github.com/Polymer/observe-js/commit/fb356da))

#### platform
- Remove use of banner, actually use the generated license ([commit](https://github.com/Polymer/platform/commit/35bd2b4))
- make test work in karma. ([commit](https://github.com/Polymer/platform/commit/180113b))
- Merge pull request #42 from morethanreal/watch-polyfill-shadowroot ([commit](https://github.com/Polymer/platform/commit/df45324))
- watch shadowroot in shadow dom polyfill ([commit](https://github.com/Polymer/platform/commit/2bb9c56))
- handle multiple selectors with ^ and ^^. ([commit](https://github.com/Polymer/platform/commit/bcaddbf))
- add Polymer thunk so we can load polymer via (async) import ([commit](https://github.com/Polymer/platform/commit/a74b81f))
- ws ([commit](https://github.com/Polymer/platform/commit/6969b51))
- Fixes #335 ([commit](https://github.com/Polymer/platform/commit/dad8803))
-  - fixes host styles for type extension elements. ([commit](https://github.com/Polymer/platform/commit/157fca1))

#### polymer
- bump for release ([commit](https://github.com/Polymer/polymer/commit/7b13860))
- make callbacks test work with SD polyfill. ([commit](https://github.com/Polymer/polymer/commit/f09a46e))
- ensure window.Polymer is an object. This allows proper manipulation of it via extend. ([commit](https://github.com/Polymer/polymer/commit/10ee1a6))
- avoid < shadow > adjustments if running under ShadowDOM polyfill. ([commit](https://github.com/Polymer/polymer/commit/8243d57))
- automatically convert <shadow></shadow> to <shadow><content></content></shadow> See spec bug for discussion: https://www.w3.org/Bugs/Public/show_bug.cgi?id=22460 ([commit](https://github.com/Polymer/polymer/commit/f8d3ebb))
- avoid serialization of function valued properties. ([commit](https://github.com/Polymer/polymer/commit/6428abe))
- Add grunt task to test the minified build ([commit](https://github.com/Polymer/polymer/commit/113dff3))
- instance/events: remove 'name' param from prepareBinding callback ([commit](https://github.com/Polymer/polymer/commit/04e133a))
- replace entered|leftDocumentCallback support: addresses https://github.com/Polymer/platform/issues/41. ([commit](https://github.com/Polymer/polymer/commit/78f61f2))

#### polymer-elements
- polymer-selector: add selectedIndex ([commit](https://github.com/Polymer/polymer-elements/commit/1e7d62d))
- polymer-overlay: add .animating class when transitioning ([commit](https://github.com/Polymer/polymer-elements/commit/0962d6c))
- polymer-overlay: make sure child transitions are applied ([commit](https://github.com/Polymer/polymer-elements/commit/8eb398e))
- polymer-animation: fix return ([commit](https://github.com/Polymer/polymer-elements/commit/340cfa6))
- polymer-google-jsapi: use parent instead of top since we want to invoke the method in the parent of the iframe ([commit](https://github.com/Polymer/polymer-elements/commit/ab06333))
- Bowager-style discovery experiment ([commit](https://github.com/Polymer/polymer-elements/commit/e40a53d))
- polymer-overlay: fix target cleanup ([commit](https://github.com/Polymer/polymer-elements/commit/8968b19))
- polymer-media-query: allow compound media queries ([commit](https://github.com/Polymer/polymer-elements/commit/ded4981))
- polymer-animation: forgot to bind() ([commit](https://github.com/Polymer/polymer-elements/commit/4e2c272))
- polymer-animation: remove unused ([commit](https://github.com/Polymer/polymer-elements/commit/2a74212))
- polymer-animation: can have multiple targets ([commit](https://github.com/Polymer/polymer-elements/commit/5d8c687))
- polymer-overlay: only override transition target if null ([commit](https://github.com/Polymer/polymer-elements/commit/8a28c28))

#### polymer-expressions
- Merge pull request #7 from jellevandenhooff/patch-1 ([commit](https://github.com/Polymer/polymer-expressions/commit/b2f3581))
- remove |name| param from prepareBinding fn ([commit](https://github.com/Polymer/polymer-expressions/commit/c62e1ae))
- remove console.log ([commit](https://github.com/Polymer/polymer-expressions/commit/b204b9a))
- basic tests ([commit](https://github.com/Polymer/polymer-expressions/commit/90eb627))
- Update esprima.js ([commit](https://github.com/Polymer/polymer-expressions/commit/093297c))
- Allow filters in 'in' and 'as'-expressions. ([commit](https://github.com/Polymer/polymer-expressions/commit/054025c))

#### polymer-ui-elements
- polymer-ui-overlay: don't style <content>, fix backdrop when transitioning ([commit](https://github.com/Polymer/polymer-ui-elements/commit/e831ea6))
- polymer-ui-icon: support 4 value syntax returns from getComputedStyle backgroundPosition ([commit](https://github.com/Polymer/polymer-ui-elements/commit/48194a7))
- evolve discover.html ([commit](https://github.com/Polymer/polymer-ui-elements/commit/a5c90fd))
- rename Bowager-style discovery experiment ([commit](https://github.com/Polymer/polymer-ui-elements/commit/a1600d4))
- Bowager-style discovery experiment ([commit](https://github.com/Polymer/polymer-ui-elements/commit/d468461))
- polymer-ui-card: adjust width in metadata ([commit](https://github.com/Polymer/polymer-ui-elements/commit/045f07b))
- Merge branch 'master' of github.com:Polymer/polymer-ui-elements ([commit](https://github.com/Polymer/polymer-ui-elements/commit/117d5bc))
- polymer-ui-field: update metadata to add input so inspector can show placeholder and value properties ([commit](https://github.com/Polymer/polymer-ui-elements/commit/c29baa5))
- polymer-ui-menu-button: fix positioning ([commit](https://github.com/Polymer/polymer-ui-elements/commit/86596d3))
- polymer-ui-icon: set background-size to make 2x image works ([commit](https://github.com/Polymer/polymer-ui-elements/commit/6dac5f3))

#### projects
- pica: add metadata ([commit](https://github.com/Polymer/projects/commit/935a54d))
- pica: update feed-viewer workbench file to set topics on the html markup ([commit](https://github.com/Polymer/projects/commit/3228bb6))
- pica: make pi-gfeeds uses polymer-google-jsapi to load jsapi script ([commit](https://github.com/Polymer/projects/commit/90c9b5e))
- pica: initialize empty array for topics ([commit](https://github.com/Polymer/projects/commit/5e2b9b0))

#### todomvc

#### toolkit-ui

#### tools
- use buildbot test runner, for less verbosity ([commit](https://github.com/Polymer/tools/commit/1424533))

