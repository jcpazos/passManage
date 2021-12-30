import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Head from "next/head";
import { LockClosed, LockClosedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Main from "../components/Main";
import Left from "../components/Left";
import Center from "../components/Center";
import Right from "../components/Right";
import getAbsoluteURL from "../utils/getAbsoluteURL";
import Header from "../components/Header";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { vaultState } from "../atoms/vaultAtom";

const Home = () => {
  const AuthUser = useAuthUser();
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");
  const [lockColor, setLockColor] = useState("text-grey-500");
  const [vault, setVault] = useRecoilState(vaultState);

  useEffect(() => {
    let vaultArray = [];
    const db = getFirestore();
    getDocs(collection(db, "vaults")).then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().owner === AuthUser.email) {
          vaultArray = vaultArray.concat(doc.data().logins);
          console.log(doc.id, " => ", doc.data());
        }
      });
      setVault(vaultArray);
    });
  }, []);

  const verifyPassword = (password) => {
    if (password === "password") {
    }

    return password === "password";
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
        <div className="flex-col">
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
