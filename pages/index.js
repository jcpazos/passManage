import Head from "next/head";
import { LockClosed, LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Main from "../components/Main";
import Left from "../components/Left";
import Center from "../components/Center";
import Right from "../components/Right";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");
  const [lockColor, setLockColor] = useState("text-grey-500");

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
        <main className="flex">
          <Left />
          <Center />
          <Right />
        </main>
      )}
    </div>
  );
}
