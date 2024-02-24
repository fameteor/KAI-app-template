// ----------------------------------------------------
// pons_getTranslations(word,dictionnary)
// Get the translations from corresponding word in that PONS dictionnary
// ----------------------------------------------------

function pons_getTranslations (word, dictionnary) {
  return new Promise(function (resolve, reject) {
    // If the browser access to Internet --------------
    if (navigator.onLine) {
      // We build the url -----------------------------
      const url = "https://api.pons.com/v1/dictionary?q="
  					+ encodeURIComponent(word)
  					+ "&l=" + encodeURIComponent(dictionnary);
  		// We create the XHR request for cross domain----
      const xhr = new XMLHttpRequest({ mozSystem: true });
      xhr.open("GET", url);
      xhr.setRequestHeader("X-Secret",pons_authenticationKey);
  		xhr.timeout = 10000; // 10 seconds timeout
      // When response OK -----------------------------
      xhr.onload = function () {
        if (xhr.status === 200) {
          // Parse to JSON
          console.log(xhr.response);
          try {
              let jsonResponse = JSON.parse(xhr.response);
              // Log and return the data
              console.log(jsonResponse);
              resolve(jsonResponse);
          } catch (e) {
              console.log("La réponse du serveur n'est pas au format JSON : " + e);
              reject({
                status: null,
                statusText: "La réponse du serveur n'est pas au format JSON"
              });
          }
        } else if (xhr.status === 204) {
            reject({
              status: xhr.status,
              statusText: "Mot non trouvé (" + xhr.status +  " " + xhr.statusText + ")"
            });
          }
          else {
            reject({
              status: xhr.status,
              statusText: "Requête impossible (" + xhr.status +  " " + xhr.statusText + ")"
            });
          }
      };
      // When timeout ---------------------------------
      xhr.ontimeout = function () {
        reject({
          status: null,
          statusText: "Requête impossible : aucune réponse du serveur"
        });
      };
      // When response ERROR --------------------------
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: "Requête impossible (" + xhr.status +  " " + xhr.statusText + ")"
        });
      };
      // We send the request --------------------------
      xhr.send();
      console.log("Request sent to : " + url + " with key : " + pons_authenticationKey);
    }
    else {
      reject({
        status: null,
        statusText: "Pas d'accès réseau, vérifier que les données mobiles ou le wifi sont autorisés"
      });
    }
  });
}

// ----------------------------------------------------
// pons_formatResponse(response)
// Format the PONS dictionnary response to relevant HTML
// ----------------------------------------------------
const pons_formatResponse = function(response) {
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
  return html;
}
