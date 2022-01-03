import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editState } from "../atoms/editAtom";
import { loginState } from "../atoms/loginAtom";
import { vaultState } from "../atoms/vaultAtom";
import { getMessageEncoding, encrypt, decrypt } from "../utils/crypto";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useAuthUser } from "next-firebase-auth";

function EditLogin({ name, username, password }) {
  const AuthUser = useAuthUser();
  const [login, setLogin] = useRecoilState(loginState);
  const [edit, setEdit] = useRecoilState(editState);
  const [nameInput, setNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [vault, setVault] = useRecoilState(vaultState);

  const decryptVault = (ciphertext, iv, salt) => {
    decrypt(ciphertext, sessionStorage.getItem("key"), iv, salt)
      .then((plaintext) => {
        console.log(ciphertext);
        console.log(plaintext);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveLogin = () => {
    setLogin({
      name: nameInput,
      username: usernameInput,
      password: passwordInput,
    });
    setEdit(null);
    //encrypt vault info
    let iv = window.crypto.getRandomValues(new Uint8Array(16));
    let salt = window.crypto.getRandomValues(new Uint8Array(16));
    //TODO: save to DB
    let vaultEncrypted = [];
    let promises = [];
    vault.map((login) => {
      let blob = JSON.stringify(login);
      let encoded = getMessageEncoding(blob);
      let encrypted = encrypt(
        encoded,
        salt,
        sessionStorage.getItem("key", password),
        iv
      );
      promises.push(encrypted);
    });

    Promise.all(promises)
      .then((encrypted) => {
        vaultEncrypted = encrypted;
        console.log(vaultEncrypted);
        console.log(JSON.stringify(vaultEncrypted[0]));
        const db = getFirestore();
        vaultEncrypted.map((ct) =>
          setDoc(doc(db, "vaults", AuthUser.email), ct)
        );
        vaultEncrypted.map((ct) => decryptVault(ct, iv, salt));
      })
      .catch((err) => {
        console.error("error when encrypting", err);
      });
  };

  useEffect(() => {
    username?.length >= 0 && setUsernameInput(username);
    password?.length >= 0 && setPasswordInput(password);
    name?.length >= 0 && setNameInput(name);
  }, [name, username, password]);

  return (
    <div className="flex-col">
      <div className="w-102 bg-gray-300 pt-1 pl-5 h-10">
        <div
          className="button bg-white rounded border-2 h-8 w-16 border-black pl-3"
          onClick={saveLogin}
        >
          Save
        </div>
      </div>
      <div className="pl-20 pr-20 pt-3">
        <div className="flex">
          <div className="bg-white">
            <img
              src="./images/keyhole.png"
              className="pl-1 pr-1 pt-1 pb-1 w-16 h-16 rounded border-2 border-black"
            ></img>
          </div>
          <div className="flex-col pl-5">
            <input
              value={nameInput}
              className="pl-2 w-60 text-black bg-gray-100 hover:border-2 hover:border-blue-200 hover:bg-white focus:bg-white "
              type="text"
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <br></br>
        <div className="bg-white h-32 flex-grow flex-col">
          <div className="flex-col pl-5">
            <h3 className="pl-4">username</h3>
            <input
              value={usernameInput}
              className="pl-2 w-28 flex-grow  hover:border-2 hover:border-blue-200 hover:bg-white focus:bg-white"
              type="text"
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
            ></input>
          </div>
          <br></br>
          <div className="flex-col pl-5">
            <h3 className="pl-4">password</h3>
            <input
              value={passwordInput}
              className="pl-2 w-28 flex-grow hover:border-2 hover:border-blue-200 hover:bg-white focus:bg-white"
              type="password"
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLogin;
