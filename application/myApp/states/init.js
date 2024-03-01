// -----------------------------------------------
// States INIT
// -----------------------------------------------
KAI.addState("init", {
  softKeys : {fr : ['tt select.','chercher','']},
  display : {
    'div#input' : true,
    'div#translations': false
  },
  afterStateChange : function() {
    dictionnaries.generateHtml();
    // After 200 ms we select the searchWord input field
    setTimeout(() => {
      document.getElementById("searchWord").select();
    }, 200);
  },
	events : {
		'keyup.ArrowUp': function(event) {
      dictionnaries.previous();
		},
		'keyup.ArrowDown': function(event) {
      dictionnaries.next();
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
            KAI.toastr.warning(err.statusText);
  					console.log(err.statusText);
          });
      }
			else KAI.toastr.warning("Saisir un mot avant de chercher");
		}
	}
});
