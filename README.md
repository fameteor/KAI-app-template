# KaiOs Framework
## `KaiOsApp` object
Contained in `/kaiOsFramework/KaiOsApp.js` file). It contains all what is necessary to run a KaiOs app as a state machine.

## `KaiOsChoiceList` object
contained in `/kaiOsFramework/KaiOsChoiceList.js` file). This object is used to build KaiOs choice list to choose an item using the up or bottom arrow key.

## KAI_spinner
The `KAI_spinner` object has 2 methods :
- `KAI_spinner.on(text)` : overlays the application with a rotating spinner optionnaly an explanation text in `text` is provided in order to indicate to the user a waiting state. The `text` parameter may contain HTML.
- `KAI_spinner.off()` : remove the spinner overlay.

Nb : the spinner do not change the state of the application, the keyboard or other events are thus active as in the current state. If you want to disable the keyboard or other events, you need to do go to a specific state you have to define.

TBD :
- change the overlay size depending on the application layout options : portrait/landscape, header/or not, softkeys or not...
