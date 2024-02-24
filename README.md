# KaiOs application template
## `KAI` object
Contained in `/kaiOsFramework/KAI.js` file. It contains all what is necessary to build a KaiOs application as a state machine :
- the user's HTML will be written in the `index.html` file in the `div` whose `id` is `app`.
- the user's javascript will be written in the `app.js` file.

The states of the state machine can be defined using the method `KAI.addState(stateName,stateObject);`. The `stateName` is a string defining the state and a `state` object containing the properties :
- `softKeys` : object describing the value of the 3 softkeys for that state for each supported languages.
- `display` : object describing the htlm selectors to display for that state (boolean `true`) or to hide (boolean `false`).
- `afterStateChange`: function that will be executed after state change to that state.
- `events` : object describing for each event the function to execute if that event is received in that state. current supported events are :
  - `keyup.ArrowLeft`,
  - `keyup.ArrowRight`,
  - `keyup.ArrowUp`,
  - `keyup.ArrowDown`,
  - `keyup.SoftLeft`,
  - `keyup.Enter`,
  - `keyup.SoftRight`,
  - `keyup.Backspace`,
  - `keyup.Default` : any other key on keybord : letter, symbol, number...


To change the state to a specific change, simply call `KAI.newState(stateName);`. This will automatically :
- set te state to the new value,
- display the right softkeys for that new state,
- hide/show the right HTML parts,
- run the right callback,
- be ready to act for the right events only.

## `KAI_choiceList` object
contained in `/kaiOsFramework/KAI_choiceList.js` file). This object is used to build KaiOs choice list to choose an item using the up or bottom arrow key.

## `KAI.spinner` object
The `KAI.spinner` object has 2 methods :
- `KAI.spinner.on(text)` : overlays the application with a rotating spinner optionnaly an explanation text if `text` is provided. It is used to indicate a waiting state to the user. The `text` parameter may contain HTML.
- `KAI.spinner.off()` : remove the spinner overlay.

Nb : the spinner do not change the state of the application, the keyboard or other events are thus active as in the current state. If you want to disable the keyboard or other events, you need to do go to a specific state you have to define.

TBD :
- change the overlay size depending on the application layout options : portrait/landscape, header/or not, softkeys or not...
- make spinner hidden on startup without user code.
