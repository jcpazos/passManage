import React from "react";
import { useRecoilState } from "recoil";
import { editState } from "../atoms/editAtom";
import { loginState } from "../atoms/loginAtom";
import { vaultState } from "../atoms/vaultAtom";
import EditLogin from "../components/EditLogin";
import LoginInfo from "../components/LoginInfo";

function Right() {
  const [login, setLogin] = useRecoilState(loginState);
  const [vault, setVault] = useRecoilState(vaultState);
  const [edit, setEdit] = useRecoilState(editState);

  return (
    <div id="sidebar-right-container">
      <div className=" flex sm:max-w-[12rem] lg:max-w-[30rem]">
        {login === "new" || edit !== null ? (
          edit !== null ? (
            <EditLogin
              name={edit.name}
              username={edit.username}
              password={edit.password}
            />
          ) : (
            <EditLogin />
          )
        ) : login === null ? (
          <LoginInfo
            name={vault[0]?.name}
            username={vault[0]?.username}
            password={vault[0]?.password}
          />
        ) : (
          <LoginInfo
            name={login?.name}
            username={login?.username}
            password={login?.password}
          />
        )}
      </div>
    </div>
  );
}

export default Right;
