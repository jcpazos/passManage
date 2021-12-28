import Head from "next/head";
import { LockClosed, LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Main from "../components/Main";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");

  const verifyPassword = (password) => {
    if (password === "password") {
      setShowResults(true);
    }
  };

  const enterPassword = () => {
    if (verifyPassword(input)) {
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
          <div className="flex">
            <input
              value={input}
              className="w-60 text-center border-2 border-gray-600"
              placeholder="Enter your Master Password"
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <LockClosedIcon
              onClick={enterPassword}
              className="button border-2 border-gray-600"
            />
          </div>
        </div>
      )}

      {showResults && (
        <main className="flex">
          <Main />
        </main>
      )}
    </div>
  );
}
