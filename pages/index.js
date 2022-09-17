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
import { decrypt, generateSecret, retrieveSecret } from "../utils/crypto";
import FirstTimeSetup from "../components/FirstTimeSetup";
import { firstTimeState } from "../atoms/firstTimeAtom";

const Home = () => {
  const AuthUser = useAuthUser();
  const [showResults, setShowResults] = useState(false);
  const [vaultEncrypted, setVaultEncrypted] = useState([]);
  const [showFirstTime, setShowFirstTime] = useRecoilState(firstTimeState);
  const [input, setInput] = useState("");
  const [lockColor, setLockColor] = useState("text-grey-500");
  const [vault, setVault] = useRecoilState(vaultState);

  const decryptLogin = (encodedCiphertext, iv, salt) => {
    let parsed = JSON.parse(encodedCiphertext);
    let ctArray = new Uint8Array(parsed);
    return decrypt(
      ctArray,
      sessionStorage.getItem("key"),
      new Uint8Array(JSON.parse(localStorage.getItem("clientSecret"))),
      iv,
      salt
    );
  };

  const decryptVault = (vaultEncrypted) => {
    let promises = [];
    console.log(vaultEncrypted);
    vaultEncrypted.map(({ encryptedItem, salt, iv }) => {
      console.log("ct", encryptedItem);
      console.log("salt", salt);
      console.log("iv", iv);
      iv = new Uint8Array(JSON.parse(iv));
      salt = new Uint8Array(JSON.parse(salt));
      let decrypted = decryptLogin(encryptedItem, iv, salt);
      promises.push(decrypted);
    });

    Promise.all(promises)
      .then((vaultArray) => {
        let decodedVault = vaultArray.map((login) => {
          return JSON.parse(login);
        });
        setVault(decodedVault);
        setShowResults(true);
      })
      .catch((err) => {
        console.error("error when decrypting", err);
      });
  };

  useEffect(() => {
    const db = getFirestore();
    const vault = doc(db, "vaults", AuthUser.email);

    getDoc(vault).then((snap) => {
      if (snap.exists() && !!snap.data().encryptedSecret) {
        if (!localStorage.getItem("encryptedSecret")) {
          localStorage.setItem("encryptedSecret", snap.data().encryptedSecret);
        }
        const vault = snap.data().logins;
        vaultEncrypted = vault;
        setVaultEncrypted(vaultEncrypted);
      } else {
        setShowFirstTime(true);
      }
    });
  }, []);

  const verifyPassword = async (password) => {
    //TODO: make retrieveSecret the check for whether the password is correct

    try {
      let secret = await retrieveSecret(password);
      console.log("client secret", secret);
      if (!!secret) {
        /*localStorage.setItem(
          "clientSecret",
          JSON.stringify(Array.from(new Uint8Array(secret)))
        );*/
        sessionStorage.setItem("key", password);
        return true;
      }
    } catch (err) {
      console.error("error when decrypting secret", err);
      return false;
    }
  };

  const enterPassword = async (e) => {
    e.preventDefault();
    //let verification = await verifyPassword(input);
    verifyPassword(input).then((result) => {
      if (result) {
        decryptVault(vaultEncrypted);
      } else {
        setLockColor("text-red-500");
      }
    });
  };

  return (
    <div>
      <Head>
        <title>Password Manager</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      {showFirstTime ? (
        <FirstTimeSetup />
      ) : (
        !showResults && (
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
        )
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
