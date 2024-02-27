// -----------------------------------------------------------------
// KAI.choiceList
// -----------------------------------------------------------------

KAI.choiceList = function(list,options) {
	this.options = options;
	this.list = list;
	this.currentIndex = (this.options && this.options.initialSelectionIndex) ? this.options.initialSelectionIndex() : 0;
}

KAI.choiceList.prototype.verticalScrollToActiveElement = function() {
	if ($("tr[id^=" + this.options.selectedItemIdPrefix + "].active") && $("tr[id^=" + this.options.selectedItemIdPrefix + "].active").position()) document.getElementById("dictionnariesListSelector").scrollTo({top: $("tr[id^=" + this.options.selectedItemIdPrefix + "].active").position().top, behavior: 'smooth'});
	// Other possibiity :
	// document.getElementById("root").scrollTo({top: this.currentIndex * 70, behavior: 'smooth'});
}

KAI.choiceList.prototype.refreshSelection = function() {
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

KAI.choiceList.prototype.currentItem = function() {
	return this.list[this.currentIndex];
};

KAI.choiceList.prototype.next = function() {
	if (this.currentIndex < this.list.length - 1) 	this.currentIndex += 1;
	else 											this.currentIndex = 0;
	this.refreshSelection();
};

KAI.choiceList.prototype.previous = function() {
	if (this.currentIndex != 0) this.currentIndex -= 1;
	else 						this.currentIndex = this.list.length - 1;
	this.refreshSelection();
};

KAI.choiceList.prototype.generateHtml = function() {
	this.refreshHTML();
	this.refreshSelection();
};

// -----------------------------------------------------------------
// refreshHTML
// -----------------------------------------------------------------
KAI.choiceList.prototype.refreshHTML = function() {
	// Template ------------------------------------------------------
	const template = `
		<table>
			{{#.}}
				<tr id="{{id}}" class="list">
					<td class="list">
						{{#rotatorIcon}}
							{{#color}}
								<label><i class="{{rotatorIcon}}" style="color:{{color}}"></i></label>
							{{/color}}
							{{^color}}
								<label><i class="{{rotatorIcon}}"></i></label>
							{{/color}}
							<br/>
						{{/rotatorIcon}}
						{{#rotatorItemsNumbered}}
							<span class="info">{{rotatorNumber}}</span>
						{{/rotatorItemsNumbered}}
					</td>
					<td class="list">
						<center>
							<label>{{{label}}}</label>
							{{#rotatorInfos}}
								<div class="info">{{{rotatorInfos}}}</div>
							{{/rotatorInfos}}
						</center>
					</td>
					<td class="text-center list">
						{{#rotatorTypeIsBOOLEAN}}
							{{#rotatorValue}}
								<input type="checkbox" checked>
							{{/rotatorValue}}
							{{^rotatorValue}}
								<input type="checkbox">
							{{/rotatorValue}}
						{{/rotatorTypeIsBOOLEAN}}
						{{#rotatorTypeIsMENU}}
						{{/rotatorTypeIsMENU}}
						{{#rotatorTypeIsNONE}}
						{{/rotatorTypeIsNONE}}
					</td>
				</tr>
			{{/.}}
		</table>
	`;
	// data creation -------------------------------------------------
	that = this;
	const data = this.list.map(function(element,index) {
		let newElement = {};
		newElement.id = that.options.selectedItemIdPrefix + index;
		newElement.label = (element.label instanceof Function) ? element.label() : element.label;
		newElement.rotatorIcon = element.rotatorIcon;
		newElement.color = element.color;
		newElement.rotatorType = element.rotatorType;
		newElement.rotatorValue = element.rotatorValue;
		newElement.rotatorInfos = (element.rotatorInfos instanceof Function) ? element.rotatorInfos() : element.rotatorInfos;
		newElement.rotatorTypeIsBOOLEAN = (element.rotatorType === "BOOLEAN");
		newElement.rotatorTypeIsMENU = (element.rotatorType === "MENU");
		newElement.rotatorTypeIsNONE = (element.rotatorType === "NONE");
		if (element.rotatorItemsNumbered) {
			if (element.rotatorItemsNumbered === "UP") {
				newElement.rotatorItemsNumbered = element.rotatorItemsNumbered;
				newElement.rotatorNumber = index + 1;
			}
			if (element.rotatorItemsNumbered === "DOWN") {
				newElement.rotatorItemsNumbered = element.rotatorItemsNumbered;
				newElement.rotatorNumber = that.list.length - index;
			}
		}
		return newElement;
	});
	console.log(data);
	// Rendering -----------------------------------------------------
	$(this.options.targetDomSelector).html(mustache.render(template,data));
}

console.log("KAI.choiceList.js loaded");
