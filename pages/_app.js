import "../styles/globals.css";
import initAuth from "../initAuth"; // the module you created above
import { RecoilRoot } from "recoil";

initAuth();

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
