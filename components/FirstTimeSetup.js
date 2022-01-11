import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { firstTimeState } from "../atoms/firstTimeAtom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { encryptLoginItem, generateSecret } from "../utils/crypto";
import { useAuthUser } from "next-firebase-auth";

function FirstTimeSetup() {
  const AuthUser = useAuthUser();
  const [errors, setErrors] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFirstTime, setShowFirstTime] = useRecoilState(firstTimeState);

  const saveFirstAccount = async (password) => {
    const newLogin = {
      name: "passManage Account",
      username: AuthUser.email,
      password: password,
    };

    const db = getFirestore();

    let encryptedLoginItem = encryptLoginItem(newLogin);

    encryptedLoginItem.encryptedItem.then((ct) => {
      let stringified = JSON.stringify(Array.from(new Uint8Array(ct)));
      let encryptedSecret = localStorage.getItem("encryptedSecret");

      console.log("login", stringified);
      console.log("db", db);
      console.log("email", AuthUser.email);
      console.log("salt", encryptedLoginItem.salt);
      console.log("iv", encryptedLoginItem.iv);
      console.log("encryptedSecret", encryptedSecret);
      console.log("tuti");
      let logins = [
        {
          encryptedItem: stringified,
          salt: encryptedLoginItem.salt,
          iv: encryptedLoginItem.iv,
        },
      ];

      setDoc(doc(db, "vaults", AuthUser.email), {
        logins: logins,
        encryptedSecret: encryptedSecret,
      });
      //TODO: set vault state for first time use
    });
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
    } else {
      let secret = generateSecret(password);
      sessionStorage.setItem("secret", secret);
      sessionStorage.setItem("key", password);

      await saveFirstAccount(password);
      setErrors("");
      setShowFirstTime(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>It looks like you're new here!</h1>
      <h2>
        You will have to create a master password that will unlock your
        encrypted vault.
      </h2>
      <h2>
        MAKE SURE YOU DO NOT LOSE THIS PASSWORD. LOSING IT MAY RESULT IN LOSING
        ALL YOUR ENCRYPTED INFORMATION!!
      </h2>
      <br></br>
      <form className="flex-col">
        <label>Password:</label>
        <br></br>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-60 text-center border-2 border-gray-600"
          placeholder="Enter a new Master Password"
          type="password"
        />
        <div className="text-red-500">{errors}</div>
        <br></br>
        <br></br>
        <label>Confirm Password:</label>
        <br></br>
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="w-60 text-center border-2 border-gray-600"
          placeholder="Retype your Master Password"
          type="password"
        />
        <br></br>
        <br></br>
        <button
          onClick={savePassword}
          className="w-40 text-center bg-green-500 border-2 border-gray-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FirstTimeSetup;
