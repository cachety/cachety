import HomeApp from "@/components/HomeApp";
import { langRedirectScript } from "@/lib/lang-redirect";

// Racine (x-default, anglaise) : un navigateur dans une autre langue est
// envoyé tout de suite vers /fr, /ja… (voir lib/lang-redirect.ts).
const REDIRECT = langRedirectScript();

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      <HomeApp />
    </>
  );
}
