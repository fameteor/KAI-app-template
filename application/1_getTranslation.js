// -----------------------------------------
// Decode the PONS response to display it
// -----------------------------------------

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
	App.newState('translations');
	// This is important to be able to exit using backspace key, but why ???
	document.getElementById("translations").focus();
}

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
			KAI_spinner.off();
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
		  KAI_spinner.off();
			toastr.warning("Requête impossible : aucune réponse du serveur");
			console.log("Requête impossible : aucune réponse du serveur");
		};
		// Send request
		httpRequest.send();
		KAI_spinner.on();
	}
	else toastr.warning("Pas d'accès réseau, vérifier que les données mobiles ou le wifi sont autorisés");
  //
}

console.log("1_getTranslation.js ok")
