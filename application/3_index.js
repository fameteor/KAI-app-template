console.log("ok")

window.onload = function() {
	KAI_spinner.on("recherche en cours");
	KAI_spinner.off();
	App.newState('init');
	dictionnaries.generateHtml();
};



let dictionnariesList = [
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


console.log("index.js loaded");
