import { LANG_CODES } from "@/lib/site-meta";

/**
 * Pages anglaises sans langue dans l'adresse (x-default : « / », « /sign ») :
 * un navigateur dans une autre langue est envoyé tout de suite vers la page
 * de sa langue (/fr, /fr/sign…), avant tout rendu, pour ne jamais montrer
 * quelques secondes d'anglais ni un titre anglais. Préférence enregistrée
 * d'abord (choisir l'anglais au menu y reste), puis langue du navigateur. Les
 * robots, sans préférence, gardent la page anglaise. « ?… » et « #… » sont
 * conservés (pré-remplissage, partage). Script inline : autorisé par son
 * empreinte sha256 (scripts/gen-sw.mjs), comme les autres.
 *
 * `suffix` : chemin sous la langue (« /sign »), vide pour l'accueil.
 */
export function langRedirectScript(suffix = ""): string {
  const to = suffix ? `"/"+l+${JSON.stringify(suffix)}` : `"/"+l`;
  return `(function(){try{var L=${JSON.stringify(LANG_CODES)},s=null;try{s=localStorage.getItem("lang")}catch(e){}
var n=(navigator.language||"").toLowerCase(),l="en";if(s&&L.indexOf(s)>=0){l=s}else if(n.indexOf("in")===0){l="id"}else{for(var i=0;i<L.length;i++){if(n.indexOf(L[i])===0){l=L[i];break}}}
if(l!=="en")location.replace(${to}+location.search+location.hash)}catch(e){}})();`;
}
