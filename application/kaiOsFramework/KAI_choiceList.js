// -----------------------------------------------------------------
// KAI_choiceList
// -----------------------------------------------------------------

const KAI_choiceList = function(list,options) {
	this.options = options;
	this.list = list;
	this.currentIndex = (this.options && this.options.initialSelectionIndex) ? this.options.initialSelectionIndex() : 0;
}

KAI_choiceList.prototype.verticalScrollToActiveElement = function() {
	if ($("tr[id^=" + this.options.selectedItemIdPrefix + "].active") && $("tr[id^=" + this.options.selectedItemIdPrefix + "].active").position()) document.getElementById("dictionnariesListSelector").scrollTo({top: $("tr[id^=" + this.options.selectedItemIdPrefix + "].active").position().top, behavior: 'smooth'});
	// Other possibiity :
	// document.getElementById("root").scrollTo({top: this.currentIndex * 70, behavior: 'smooth'});
}

KAI_choiceList.prototype.refreshSelection = function() {
	// Refresh selection
	if (this.options.selectedItemIdPrefix) {
		const that = this;
		this.list.forEach(function(item,index) {
			if (index === that.currentIndex) 	$("#" +  that.options.selectedItemIdPrefix + index).addClass("active");
			else								$("#" +  that.options.selectedItemIdPrefix + index).removeClass("active");
		});
	}
	// Refresh accordingly hide/show
	if (this.options.showDomElementPrefix) {
		const that = this;
		this.list.forEach(function(item,index) {
			if (index === that.currentIndex) 	$(that.options.showDomElementPrefix + index).show();
			else								$(that.options.showDomElementPrefix + index).hide();
		});
	}
	this.verticalScrollToActiveElement();
};

KAI_choiceList.prototype.currentItem = function() {
	return this.list[this.currentIndex];
};

KAI_choiceList.prototype.next = function() {
	if (this.currentIndex < this.list.length - 1) 	this.currentIndex += 1;
	else 											this.currentIndex = 0;
	this.refreshSelection();
};

KAI_choiceList.prototype.previous = function() {
	if (this.currentIndex != 0) this.currentIndex -= 1;
	else 						this.currentIndex = this.list.length - 1;
	this.refreshSelection();
};

KAI_choiceList.prototype.generateHtml = function() {
	this.refreshHTML();
	this.refreshSelection();
};

KAI_choiceList.prototype.refreshHTML = function() {
	let html = '<table>';
	const that = this;
	this.list.forEach(function(option,index) {
		html += `<tr id="{{id}}" class="list">
					<td class="list">{{icon}}{{itemsNumbered}}</td>
					<td class="list">
						<center>
						<label>{{label}}</label>
						{{infos}}
						</center>
					</td>
					<td class="text-center list">
						{{type}}
					</td>
				 </tr>`;
		const id = that.options.selectedItemIdPrefix + index;
		const label = (option.label instanceof Function) ? option.label() : option.label;
		let itemsNumbered = "";
		if (that.options.itemsNumbered === "reverse") itemsNumbered = '<br/><span class="info">' + (that.list.length - index) + '</span>';
		let type = "";
		switch(option.rotatorType) {
			case "BOOLEAN":
				if (option.rotatorValue) {
					if (option.rotatorValue() === true) 	type = '<input type="checkbox" checked>';
					else						type = '<input type="checkbox">';
				}
				else 							type = '<input type="checkbox">';
				break;
			case "MENU":
				type = '<i class="fas fa-thumbs-up"></i>';
				break;
			case "NONE":
					type = '';
					break;
			default:
				type = '<i class="fas fa-chevron-right"></i>'
				break;

		}


		if (option.rotatorInfos) {
			const infos = '<div class="info">' + ((option.rotatorInfos instanceof Function) ? option.rotatorInfos() : option.rotatorInfos) + '</div>';
			html = html.replace('{{infos}}',infos);
		}
		else html = html.replace('{{infos}}',"");
		if (option.rotatorIcon) {
			let icon = '';
			if (option.color)	icon ='<label><i class="' + option.rotatorIcon + '" style="color:' + option.color + ';"></i></label>';
			else 				icon ='<label><i class="' + option.rotatorIcon + '"></i></label>';
			html = html.replace('{{icon}}',icon);
		}
		else html = html.replace('{{icon}}',"");
		html = html.replace('{{id}}',id);
		html = html.replace('{{label}}',label);
		html = html.replace('{{type}}',type);
		html = html.replace('{{itemsNumbered}}',itemsNumbered);
	});
	html += '</table>'
	$(this.options.targetDomSelector).html(html);
}

console.log("KAI_choiceList.js loaded");
