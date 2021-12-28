import Head from "next/head";
import { LockClosed, LockClosedIcon } from "@heroicons/react/solid";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Password Manager</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <img src="./images/keyhole.png"></img>
      <div className="flex">
        <input
          className="w-60 text-center border-2 border-gray-600"
          placeholder="Enter your Master Password"
          type="text"
        />
        <LockClosedIcon className="button border-2 border-gray-600" />
      </div>
    </div>
  );
}
