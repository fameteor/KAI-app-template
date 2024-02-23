// Vars initialisation
App.vars.scroll = 0;

// ------------------------------
App.addState("init", {
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
        getTranslation(searchWord,dictionnaries.currentItem().value);
        // App.newState('translations');
      }
			else toastr.warning("Saisir un mot avant de chercher");
		},
		'keyup.SoftRight': function(event) {
      // App.newState('translations');
		},
		'keyup.Backspace': function(event) {
		},
    'keyup.Default': function(event) {

		}
	}
});

console.log("state_init.js loaded");

// ------------------------------
App.addState("translations", {
  softKeys : {fr : ['saisir','','']},
  display : {
    'div#input' : false,
    'div#translations': true,
    'div#choose_dictionnary': false,
  },
  afterStateChange : function() {
    // And reset the scroll
		App.vars.scroll = 0;
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
			// app.myMap.panBy([100,0]);
      //document.getElementById("translations").scrollTo(0, 100);

			// event.stopPropagation();
		},
		'keyup.ArrowUp': function(event) {
      if (App.vars.scroll != 0) {
        App.vars.scroll -=120;
        if (App.vars.scroll < 0 )App.vars.scroll = 0;
        document.getElementById("translations").scrollTo({
  		    top:App.vars.scroll,
  		    behavior: 'auto'
  	    });
      }
		},
		'keyup.ArrowDown': function(event) {
      const height = document.getElementById("translations").scrollHeight;
      if (App.vars.scroll < height - 245) {
        App.vars.scroll +=120;
        document.getElementById("translations").scrollTo({
  		    top: App.vars.scroll,
  		    behavior: 'auto'
  	    });
      }
		},
		'keyup.SoftLeft': function(event) {
      App.newState('init')
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

console.log("state_translations.js loaded");
