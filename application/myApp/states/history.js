// -----------------------------------------------
// States INIT
// -----------------------------------------------
KAI.addState("history", {
  softKeys : {fr : ['saisir','afficher','']},
  display : {
    'div#input' : false,
    'div#translations': false,
    'div#history': true
  },
  afterStateChange : function() {
    history.generateHtml();
  },
	events : {
    'keyup.ArrowUp': function(event) {
      history.previous();
		},
		'keyup.ArrowDown': function(event) {
      history.next();
		},
		'keyup.SoftLeft': function(event) {
      KAI.newState('init');
		},
		'keyup.Enter': function(event) {
      // Redisplay translations
      $('#translations').html(pons_formatResponse(history.currentItem().response));
      KAI.newState('translations');
		}
	}
});
