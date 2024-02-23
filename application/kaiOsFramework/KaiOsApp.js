// ------------------------------------
// App Object
// ------------------------------------


let App = {
  // ----------------------------------
  lang: 'fr',
  // ----------------------------------
  currentState:'',
  // ----------------------------------
  vars: {},
  // ----------------------------------
  states:{},
  // ----------------------------------
  // Method to change state
  newState: function(newState) {
    // If newState exists -------------
    if (this.states.hasOwnProperty(newState)){
      // Change current state ---------
      console.log('"App.newState" : current state : "' + this.currentState + '"');
      this.currentState = newState;
      console.log('"App.newState" : new state : "' + newState + '"');
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
      console.log('"App.newState" : softKeys setted');
      // Display zones ----------------
      Object.keys(this.states[newState].display).forEach(function(key) {
        if (App.states[newState].display[key]) {
          $(key).show();
        }
        else {
          $(key).hide();
        }
      });
      console.log('"App.newState" : hide/show zones (display) ok');
      // Run afterStateChange callback
      if (this.states[newState].hasOwnProperty("afterStateChange")) {
        // ------------------------
        // TBD : check if function
        // ------------------------
        this.states[newState].afterStateChange();
        console.log('"App.newState" : afterStateChange callback ok');
      }
    }
    else {
      console.log('"App.newState" error : "' + newState + '" state do not exists in "App.states"');
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
        console.log('"App.addState" : state "' + name + '" added');
      }
      else console.log('"App.addState" error : "stateObject" do not have a "events" property.');
    }
    else console.log('"App.addState" error : "App" do not have a "states" property.');
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
    console.log("- current state : " + App.currentState);
    if (App.states.hasOwnProperty(App.currentState)) {

      if (App.states[App.currentState].hasOwnProperty("events")) {
        if (App.states[App.currentState].events[detailedEvent]) {
          // We run the function for that event
          App.states[App.currentState].events[detailedEvent](event);
          console.log("\"" + detailedEvent + "\" event treated");
        }
        else {
          // We run the "Default" key
          App.states[App.currentState].events["keyup.Default"](event);
          console.log('"' + detailedEvent + '" event treated (as "keyup.Default")');
        }
      }
    }
    else console.log("there is no App.states for current state");
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

// -----------------------------------------------------------------
// KaiOs_Spinner
// -----------------------------------------------------------------

const KAI_spinner = {
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
}



console.log("kaiOsApp.js loaded");
