import HomeApp from "@/components/HomeApp";
import { LANG_CODES } from "@/lib/site-meta";

// Racine (x-default, anglaise) : un navigateur dans une autre langue est
// envoyé tout de suite vers la page de sa langue (/fr…), avant tout rendu,
// pour ne jamais montrer quelques secondes d'anglais ni un titre anglais.
// Préférence enregistrée d'abord (choisir l'anglais au menu y reste), puis
// langue du navigateur. Les robots, sans préférence, gardent la racine.
// « ?… » et « #… » sont conservés (pré-remplissage, partage). Script inline :
// autorisé par son empreinte sha256 (scripts/gen-sw.mjs), comme les autres.
const REDIRECT = `(function(){try{var L=${JSON.stringify(LANG_CODES)},s=null;try{s=localStorage.getItem("lang")}catch(e){}
var n=(navigator.language||"").toLowerCase(),l="en";if(s&&L.indexOf(s)>=0){l=s}else if(n.indexOf("in")===0){l="id"}else{for(var i=0;i<L.length;i++){if(n.indexOf(L[i])===0){l=L[i];break}}}
if(l!=="en")location.replace("/"+l+location.search+location.hash)}catch(e){}})();`;

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      <HomeApp />
    </>
  );
}
