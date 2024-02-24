// -----------------------------------------------
// States TRANSLATIONS
// -----------------------------------------------
KAI.addState("translations", {
  softKeys : {fr : ['saisir','','hist']},
  display : {
    'div#input' : false,
    'div#translations': true,
    'div#history': false
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
      KAI.newState('init');
		},
    'keyup.SoftRight': function(event) {
      KAI.newState('history');
		}
	}
});
