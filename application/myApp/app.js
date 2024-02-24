// Variables initialisation --------------------------
KAI.vars.scroll = 0;

// States definition ---------------------------------
KAI.addState("init", {
  softKeys : {fr : ['tt select.','chercher','']},
  display : {
    'div#input' : true,
    'div#translations': false,
    'div#choose_dictionnary': false,
  },
  afterStateChange : function() {
    // After 200 ms we select the searchWord input field
    setTimeout(() => {
      document.getElementById("searchWord").select();
    }, 200);
  },
	events : {
		'keyup.ArrowLeft': function(event) {
		},
		'keyup.ArrowRight': function(event) {
		},
		'keyup.ArrowUp': function(event) {
      dictionnaries.previous();
		},
		'keyup.ArrowDown': function(event) {
      dictionnaries.next()
		},
		'keyup.SoftLeft': function(event) {
      document.getElementById("searchWord").select();
		},
		'keyup.Enter': function(event) {
      event.preventDefault();
      const searchWord = document.getElementById("searchWord").value.trim();
      console.log("search word : \"" + searchWord + "\" in \"" + dictionnaries.currentItem().value + "\" dictionnary");
      if (searchWord) {
        // We clear the translations screen and display the spinner
    		$('#translations').html("");
        KAI.spinner.on("recherche en cours...");
        // We look in the relevant language PONS dictionnary
        pons_getTranslations(searchWord, dictionnaries.currentItem().value)
          .then(function (ponsResponse) {
            // We stop the spinner
            KAI.spinner.off();
            // We format the response and display it
            $('#translations').html(pons_formatResponse(ponsResponse));
            // We change state to display the translations
          	KAI.newState('translations');
            // ?????????????????????????????????????????????????????????????????????
          	// This is important to be able to exit using backspace key, but why ???
          	document.getElementById("translations").focus();
            // ?????????????????????????????????????????????????????????????????????
          })
          .catch(function (err) {
            // We stop the spinner and display the error
            KAI.spinner.off();
            toastr.warning(err.statusText);
  					console.log(err.statusText);
          });
      }
			else toastr.warning("Saisir un mot avant de chercher");
		},
		'keyup.SoftRight': function(event) {
      // KAI.newState('translations');
		},
		'keyup.Backspace': function(event) {
		},
    'keyup.Default': function(event) {

		}
	}
});

// ------------------------------
KAI.addState("translations", {
  softKeys : {fr : ['saisir','','']},
  display : {
    'div#input' : false,
    'div#translations': true,
    'div#choose_dictionnary': false,
  },
  afterStateChange : function() {
    // And reset the scroll
		KAI.vars.scroll = 0;
		// We apply the scroll
		document.getElementById("translations").scrollTo({
			top:0,
			behavior: 'auto'
		});
  },
	events : {
		'keyup.ArrowLeft': function(event) {
			// event.preventDefault();

			// event.stopPropagation();
		},
		'keyup.ArrowRight': function(event) {
			// event.preventDefault();
			// KAI.myMap.panBy([100,0]);
      //document.getElementById("translations").scrollTo(0, 100);

			// event.stopPropagation();
		},
		'keyup.ArrowUp': function(event) {
      if (KAI.vars.scroll != 0) {
        KAI.vars.scroll -=120;
        if (KAI.vars.scroll < 0 )KAI.vars.scroll = 0;
        document.getElementById("translations").scrollTo({
  		    top:KAI.vars.scroll,
  		    behavior: 'auto'
  	    });
      }
		},
		'keyup.ArrowDown': function(event) {
      const height = document.getElementById("translations").scrollHeight;
      if (KAI.vars.scroll < height - 245) {
        KAI.vars.scroll +=120;
        document.getElementById("translations").scrollTo({
  		    top: KAI.vars.scroll,
  		    behavior: 'auto'
  	    });
      }
		},
		'keyup.SoftLeft': function(event) {
      KAI.newState('init')
		},
		'keyup.Enter': function(event) {
		},
		'keyup.SoftRight': function(event) {
		},
		'keyup.Backspace': function(event) {
		},
    'keyup.Default': function(event) {
		}
	}
});

// Dictionnaries option list creation ----------------
const dictionnariesList = [
	{
		label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> slovène <span class="fi fi-si"></span>',
		value:"frsl",
		rotatorType:"NONE"
		// rotatorIcon:"fas fa-people-arrows"
	},
	{
		label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> allemand <span class="fi fi-de"></span>',
		value:"defr",
		rotatorType:"NONE"
	},
	{
		label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> anglais <span class="fi fi-gb"></span>',
		value:"enfr",
		rotatorType:"NONE"
	},
	{
		label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> italien <span class="fi fi-it"></span>',
		value:"frit",
		rotatorType:"NONE"
	},
	{
		label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> espagnol <span class="fi fi-es"></span>',
		value:"esfr",
		rotatorType:"NONE"
	}
];

let dictionnariesListOptions = {
	"selectedItemIdPrefix" : 		"dictionnariesListOptions",
	"targetDomSelector" : 			"#dictionnariesList"
}

const dictionnaries = new KAI_choiceList(dictionnariesList,dictionnariesListOptions);

// State machine initialisation ----------------------
window.onload = function() {
	KAI.spinner.off();
	KAI.newState('init');
	dictionnaries.generateHtml();
};

console.log("app.js loaded");
