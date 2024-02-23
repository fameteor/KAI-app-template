// ------------------------------------
// KAI Object
// ------------------------------------


let KAI = {
  // ----------------------------------
  lang: 'fr',
  // ----------------------------------
  currentState:'',
  // ----------------------------------
  vars: {},
  // ----------------------------------
  states:{},
  // KaiOs_Spinner --------------------
  "spinner" : {
    "on": function(text) {
      $("#KAI_spinner").show();
      // If some text is provided, we write it in the spinner
      if (text) {
        $("#KAI_spinnerText").html(text);
      }
    },
    "off" : function() {
      $("#KAI_spinner").hide();
    }
  },
  // Method to change state -----------
  newState: function(newState) {
    // If newState exists -------------
    if (this.states.hasOwnProperty(newState)){
      // Change current state ---------
      console.log('"KAI.newState" : current state : "' + this.currentState + '"');
      this.currentState = newState;
      console.log('"KAI.newState" : new state : "' + newState + '"');
      // Display softKeys
      $('#SoftLeft').html(this.states[newState].softKeys
                        && this.states[newState].softKeys[this.lang]
                        && this.states[newState].softKeys[this.lang][0]);
      $('#Center').html(this.states[newState].softKeys
                        && this.states[newState].softKeys[this.lang]
                        && this.states[newState].softKeys[this.lang][1]);
      $('#SoftRight').html(this.states[newState].softKeys
                        && this.states[newState].softKeys[this.lang]
                        && this.states[newState].softKeys[this.lang][2]);
      console.log('"KAI.newState" : softKeys set');
      // Display zones ----------------
      Object.keys(this.states[newState].display).forEach(function(key) {
        if (KAI.states[newState].display[key]) {
          $(key).show();
        }
        else {
          $(key).hide();
        }
      });
      console.log('"KAI.newState" : hide/show zones (display) ok');
      // Run afterStateChange callback
      if (this.states[newState].hasOwnProperty("afterStateChange")) {
        // ------------------------
        // TBD : check if function
        // ------------------------
        this.states[newState].afterStateChange();
        console.log('"KAI.newState" : afterStateChange callback ok');
      }
    }
    else {
      console.log('"KAI.newState" error : "' + newState + '" state do not exists in "KAI.states"');
    }
  },
  // ----------------------------------
  // Method to add a state to configuration
  addState: function(name,stateObject) {
    if (this.hasOwnProperty('states')) {
      this.states[name] = stateObject;
      // We add émulation of softKeys for PC
      // For ArrowLeft emulation on PC
      if (this.states[name].hasOwnProperty('events')) {
        this.states[name].events['keyup.Home'] = this.states[name].events['keyup.SoftLeft'];
        // For ArrowRight emulation on PC
        this.states[name].events['keyup.End'] = this.states[name].events['keyup.SoftRight'];
        console.log('"KAI.addState" : state "' + name + '" added');
      }
      else console.log('"KAI.addState" error : "stateObject" do not have a "events" property.');
    }
    else console.log('"KAI.addState" error : "KAI" do not have a "states" property.');
  }
};

// ------------------------------------
// Keyboard management
// ------------------------------------
const minDeltaBetweenKeys = 200; // In ms
let lastKeyTs = new Date().getTime();
document.addEventListener("keyup", event => {
  const detailedEvent = "keyup." + event.key;
	console.log("\"" + detailedEvent + "\" event received");
	const keyTs = new Date().getTime();
	// Anti bounce filtering
	if ((keyTs - lastKeyTs) > minDeltaBetweenKeys) {
    lastKeyTs = keyTs;
    // We look for the function for that key in the current status
    console.log("- current state : " + KAI.currentState);
    if (KAI.states.hasOwnProperty(KAI.currentState)) {

      if (KAI.states[KAI.currentState].hasOwnProperty("events")) {
        if (KAI.states[KAI.currentState].events[detailedEvent]) {
          // We run the function for that event
          KAI.states[KAI.currentState].events[detailedEvent](event);
          console.log("\"" + detailedEvent + "\" event treated");
        }
        else {
          // We run the "Default" key
          KAI.states[KAI.currentState].events["keyup.Default"](event);
          console.log('"' + detailedEvent + '" event treated (as "keyup.Default")');
        }
      }
    }
    else console.log("there is no KAI.states for current state");
  }
  else {
    console.log("Anti-bounce : invalid key");
  }
});


// -----------------------------------------------------------------
// Toastr
// -----------------------------------------------------------------
const toastr = {
	info : function (text) {
		$("#toastrMsg").html('<center><i class="fas fa-info-circle"></i><br/>' + text + '</center>');
		$("#toastr").attr("class","visible");
		setTimeout(function(){ $("#toastr").attr("class","hidden"); }, 2000);
	},
	warning : function (text) {
		$("#toastrMsg").html('<center><i class="fas fa-exclamation-circle"></i><br/>' + text + '</center>');
		$("#toastr").attr("class","visible");
		setTimeout(function(){ $("#toastr").attr("class","hidden"); }, 2000);
	},
	question : function(text) {
		state.push("QUESTION");
		$("#toastr").attr("class","visible");
		$("#toastrMsg").html('<center><i class="fas fa-question-circle"></i><br/>' + text + '</center>');
	},
	hide: function() {
		$("#toastr").attr("class","hidden");
		state.pop();
	}
}


console.log("kai.js loaded");
