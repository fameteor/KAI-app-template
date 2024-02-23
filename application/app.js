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
        getTranslation(searchWord,dictionnaries.currentItem().value);
        // KAI.newState('translations');
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

// Decode the PONS response to display it ------------
const displayResponse = function(response) {
	let html = "";
	response.forEach(function(langsHits) {
		html += "<p class=\"lang\">Langue : " + langsHits.lang + "</p>";
		langsHits.hits.forEach(function(hit) {
			hit.roms.forEach(function(rom) {
				html += "<p class=\"result\">" + rom.headword_full + "</p>";
				rom.arabs.forEach(function(arab) {
					if (arab.header) {
						html += arab.header;
						html += "<br/>";
					}
					html += "<table class=\"translations\">";
					arab.translations.forEach(function(translation) {
						html += "<tr><td>" + translation.source + "</td><td>" + translation.target + "</td></tr>";
						console.log("translation ok");
					});
					html += "</table>";
				});
			});
		});
	});
	console.log(html);
	$('#translations').html(html);
	KAI.newState('translations');
	// This is important to be able to exit using backspace key, but why ???
	document.getElementById("translations").focus();
}

// HTTP request to PONS dictionnary ------------------
let getTranslation = function(word,dictionnary) {
	if (navigator.onLine) {
		// We clear the screen
		$('#translations').html("");
		// We make the request
		const url = "https://api.pons.com/v1/dictionary?q="
					+ encodeURIComponent(word)
					+ "&l=" + encodeURIComponent(dictionnary);
		console.log(url);
		console.log(authenticationKey);
		// HTTP request creation
		let httpRequest = new XMLHttpRequest({ mozSystem: true });
		httpRequest.onreadystatechange = function() {
			KAI.spinner.off();
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					console.log(response);
					displayResponse(response);
					//
				} else if (httpRequest.status === 204) {
					toastr.warning("Mot non trouvé (" + httpRequest.status +  " " + httpRequest.statusText + ")");
					console.log("Mot non trouvé (" + httpRequest.status +  " " + httpRequest.statusText + ")");
					//
					}
					else {
					toastr.warning("Requête impossible (" + httpRequest.status +  " " + httpRequest.statusText + ")");
					console.log("Requête impossible (" + httpRequest.status +  " " + httpRequest.statusText + ")");
				}
			}
		};
		httpRequest.open('GET', url, true);
		httpRequest.setRequestHeader("X-Secret",authenticationKey);
		// Timeout managementç
		httpRequest.timeout = 10000; // 10 seconds timeout
		httpRequest.ontimeout = (e) => {
		  KAI.spinner.off();
			toastr.warning("Requête impossible : aucune réponse du serveur");
			console.log("Requête impossible : aucune réponse du serveur");
		};
		// Send request
		httpRequest.send();
		KAI.spinner.on("recherche en cours...");
	}
	else toastr.warning("Pas d'accès réseau, vérifier que les données mobiles ou le wifi sont autorisés");
  //
}

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

const dictionnaries = new KaiOsChoiceList(dictionnariesList,dictionnariesListOptions);

// State machine initialisation ----------------------
window.onload = function() {
	KAI.spinner.off();
	KAI.newState('init');
	dictionnaries.generateHtml();
};

console.log("app.js loaded");
