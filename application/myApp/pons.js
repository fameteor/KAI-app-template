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
// MUSTACHE version
// ----------------------------------------------------
const pons_formatResponse = function(response) {
  const template = `
  {{#.}}
    <p class="lang">Langue : {{lang}}</p>
    {{#hits}}
      {{#roms}}
        <p class="result">{{{headword_full}}}</p>
        {{#arabs}}
          {{#header}}
            {{{.}}}<br/>
          {{/header}}
          <table class="translations">
            {{#translations}}
              <tr><td>{{{source}}}</td><td>{{{target}}}</td></tr>
            {{/translations}}
          </table>
        {{/arabs}}
      {{/roms}}
    {{/hits}}
  {{/.}}
  `;
  const result = mustache.render(template,response);
  console.log(result);
  return result;
}
