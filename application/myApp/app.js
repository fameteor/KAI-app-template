// Variables initialisation --------------------------
KAI.vars.scroll = 0;

// Dictionnaries option list creation ----------------
const dictionnariesList = [
	{
		label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> slovène <span class="fi fi-si"></span>',
		value:"frsl",
		rotatorType:"NONE", // MENU or BOOLEAN
		// rotatorIcon:"fas fa-people-arrows",
		// rotatorInfos:"essai infos",
		// color:"#F24578", // Icon color only
		// rotatorValue:true, // value of boolean
		// rotatorItemsNumbered:"DOWN"  // UP or DOWN
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

const dictionnaries = new KAI.choiceList(dictionnariesList,dictionnariesListOptions);

// State machine initialisation ----------------------
const appOptions = {
  KAI_appTitle: "PONS dictionnaries V2.0"
};

window.onload = function() {
	KAI.spinner.off();
  KAI.init(appOptions);
	KAI.newState('init');
};

console.log("app.js loaded");
