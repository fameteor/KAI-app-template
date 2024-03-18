# KAIos template changelog

## V1.0.3

### New functionnalities
- `KAI.toastr` : methods `info` and `warning` changed to accept multiple toastr messages at the same time.
- `setAppTitle` renamed to `renderAppTitle` cannot set the title anymore, but render the `appTitle`, `appTitleBackgroundColor` and `appTitleColor` defined in the global options or in the state options.
- `setAppTitle` can be a function or a String

### Bugs corrected
- `KAI.choiceList.verticalScrollToActiveElement``corrected : no error even if choice list not displayed, works now ok.
- softkeys label not erased by empty label corrected.

### Files modified
- `KAI.js`
- `KAI.css`

## V1.0.2

### New functionnalities
- CSS changed for toaster color and softkey text position
- application title color and background-color can be set as options
- `KAI.SD` : methods changed.

### Bugs corrected

### Files modified
- `KAI.js`
- `KAI.css`

## V1.0.1

### New functionnalities

### Bugs corrected
- `KAI.spinner` is now `off` when `KAI.init()` without loading `config` from SDcard.

### Files modified
- `KAI.js` only
