// Variables initialisation --------------------------
KAI.vars.scroll = 0;

// Dictionnaries option list creation ----------------
const dictionnariesList = [
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> slovène <span class="fi fi-si"></span>',
		value:"frsl",
		choiceList_type:"NONE", // MENU, NONE or BOOLEAN
		// choiceList_icon:"fas fa-people-arrows",
		// choiceList_infos:"essai infos",
		// choiceList_value:true, // read only property : if choiceList_type === "BOOLEAN", this is the value of checkbox : true if checked, otherwise false
		// choiceList_itemNumbered:"DOWN"  // UP or DOWN
		// choiceList_itemNumber : read only property
		//
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> allemand <span class="fi fi-de"></span>',
		value:"defr",
		choiceList_type:"NONE"
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> anglais <span class="fi fi-gb"></span>',
		value:"enfr",
		choiceList_type:"NONE"
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> italien <span class="fi fi-it"></span>',
		value:"frit",
		choiceList_type:"NONE"
	},
	{
		choiceList_label:'<span class="fi fi-fr"></span> français <i class="fas fa-sync"></i> espagnol <span class="fi fi-es"></span>',
		value:"esfr",
		choiceList_type:"NONE"
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
