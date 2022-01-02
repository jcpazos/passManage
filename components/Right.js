import React from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms/loginAtom";
import EditLogin from "../components/EditLogin";

function Right() {
  const [login, setLogin] = useRecoilState(loginState);

  return (
    <div id="sidebar-right-container">
      <div className=" flex sm:max-w-[12rem] lg:max-w-[30rem]">
        {login === "new" ? (
          <EditLogin />
        ) : (
          <div>
            <h1>{login?.name}</h1>
            <h1>{login?.username}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Right;
