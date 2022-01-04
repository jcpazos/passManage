import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Head from "next/head";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Left from "../components/Left";
import Center from "../components/Center";
import Right from "../components/Right";
import getAbsoluteURL from "../utils/getAbsoluteURL";
import Header from "../components/Header";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { vaultState } from "../atoms/vaultAtom";
import { decrypt } from "../utils/crypto";

const Home = () => {
  const AuthUser = useAuthUser();
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");
  const [lockColor, setLockColor] = useState("text-grey-500");
  const [vault, setVault] = useRecoilState(vaultState);

  const decryptLogin = (encodedCiphertext, iv, salt) => {
    let parsed = JSON.parse(encodedCiphertext);
    let ctArray = new Uint8Array(parsed);
    return decrypt(ctArray, sessionStorage.getItem("key"), iv, salt);
  };

  useEffect(() => {
    const iv = new Uint8Array(JSON.parse(localStorage.getItem("iv")));
    const salt = new Uint8Array(JSON.parse(localStorage.getItem("salt")));
    const db = getFirestore();
    const vault = doc(db, "vaults", AuthUser.email);
    let vaultEncrypted = [];
    let promises = [];

    getDoc(vault).then((snap) => {
      if (snap.exists()) {
        const vault = snap.data().logins;
        vaultEncrypted = vaultEncrypted.concat(vault);

        vaultEncrypted.map((ct) => {
          let decrypted = decryptLogin(ct, iv, salt);
          promises.push(decrypted);
        });

        Promise.all(promises)
          .then((vaultArray) => {
            let decodedVault = vaultArray.map((login) => {
              return JSON.parse(login);
            });
            setVault(decodedVault);
          })
          .catch((err) => {
            console.error("error", err);
          });
      }
    });
  }, []);

  const verifyPassword = (password) => {
    if (password === "passord") {
      sessionStorage.setItem("key", password);
    }

    return password === "passord";
  };

  const enterPassword = (e) => {
    e.preventDefault();
    if (verifyPassword(input)) {
      setShowResults(true);
    } else {
      setLockColor("text-red-500");
    }
  };

  return (
    <div>
      <Head>
        <title>Password Manager</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      {!showResults && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <img src="./images/keyhole.png"></img>
          <form className="flex">
            <input
              value={input}
              className="w-60 text-center border-2 border-gray-600"
              placeholder="Enter your Master Password"
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
                setLockColor("text-blue-500");
              }}
            />
            <button
              id="unlock-button"
              type="submit"
              onClick={enterPassword}
              className={lockColor}
            >
              <LockClosedIcon className="button border-2 border-gray-600" />
            </button>
          </form>
        </div>
      )}

      {showResults && (
        <div className="bg-gray-100 flex-col">
          <Header email={AuthUser.email} signOut={AuthUser.signOut} />
          <main className="flex">
            <Left />
            <Center />
            <Right />
          </main>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  // Optionally, get other props.
  // You can return anything you'd normally return from
  // `getServerSideProps`, including redirects.
  // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  const token = await AuthUser.getIdToken();

  // Note: you shouldn't typically fetch your own API routes from within
  // `getServerSideProps`. This is for example purposes only.
  // https://github.com/gladly-team/next-firebase-auth/issues/264
  const endpoint = getAbsoluteURL("/api/example", req);
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  }
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
